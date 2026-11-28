import { useEffect, useRef } from 'react';

import { fbm3 } from './noise';

// Site background: a dot grid whose dots slowly swell and shrink with
// drifting noise, like weather moving over a map. Drawn on a fixed canvas
// behind every page (styles in globals.css under .terrain-background). With
// reduced motion it draws one still frame.

const SPACING = 16;
const SCALE = 1 / 170;
// The drift is slow, so 20fps looks smooth and keeps the work low
const FRAME_MS = 1000 / 20;
// How fast the noise drifts (noise units per second)
const DRIFT_SPEED = 0.025;
// Smallest dot radius and how much the dots can grow, in px
const BASE_RADIUS = 0.35;
const MAX_GROWTH = 1.3;
// Time used for the still frame, and where the animation starts
const START_SECONDS = 12;
const TAU = Math.PI * 2;

const drawTerrain = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  seconds: number
) => {
  context.clearRect(0, 0, width, height);
  context.beginPath();

  const time = seconds * DRIFT_SPEED;
  // Columns centered on the viewport, so the pattern stays put as the width
  // changes
  const firstX = width / 2 - Math.ceil(width / 2 / SPACING) * SPACING;
  for (let y = SPACING / 2; y < height; y += SPACING) {
    for (let x = firstX; x < width + SPACING; x += SPACING) {
      const value = fbm3((x - width / 2) * SCALE + 30, y * SCALE + 30, time);
      const level = Math.min(1, Math.max(0, (value - 0.36) / 0.36));
      const radius = BASE_RADIUS + MAX_GROWTH * level ** 1.6;
      context.moveTo(x + radius, y);
      context.arc(x, y, radius, 0, TAU);
    }
  }

  context.fill();
};

export const TerrainBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now() - START_SECONDS * 1000;
    const seconds = () =>
      still ? START_SECONDS : (performance.now() - start) / 1000;

    let width = 0;
    let height = 0;
    let ratio = 0;

    // Dot color and strength come from CSS (`color` and --terrain-alpha)
    const readTheme = () => {
      const style = getComputedStyle(canvas);
      context.fillStyle = style.color;
      context.globalAlpha =
        Number.parseFloat(style.getPropertyValue('--terrain-alpha')) || 0.15;
    };

    // Resizing the canvas resets the context, so the theme is read again.
    // Returns false when the size did not change (phones fire resize events
    // as their toolbars move while scrolling).
    const resize = () => {
      const nextRatio = window.devicePixelRatio || 1;
      if (
        canvas.clientWidth === width &&
        canvas.clientHeight === height &&
        nextRatio === ratio
      ) {
        return false;
      }
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      ratio = nextRatio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      readTheme();
      return true;
    };

    const draw = () => drawTerrain(context, width, height, seconds());

    const onResize = () => {
      if (resize()) draw();
    };

    // next-themes switches the theme by changing the class on <html>
    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });

    resize();
    draw();
    canvas.dataset.ready = '';

    window.addEventListener('resize', onResize);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let frame = 0;
    if (!still) {
      let last = 0;
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (now - last < FRAME_MS) return;
        last = now;
        draw();
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="terrain-background" />;
};
