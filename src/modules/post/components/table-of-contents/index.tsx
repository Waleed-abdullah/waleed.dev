import { useAnimate } from 'motion/react';
import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { cn } from '@/core/lib/cn';
import { type PostHeading } from '@/core/utils/post';

interface TableOfContentsProps {
  headings: PostHeading[];
}

// A heading becomes the current section once its top passes this line
// (navbar height plus some room), measured from the top of the viewport.
const ACTIVE_LINE = 120;

const INDICATOR_TRANSITION = {
  type: 'spring',
  bounce: 0.15,
  duration: 0.45,
} as const;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Id of the section being read: the last heading above the active line. */
const getCurrentHeadingId = (headings: PostHeading[]) => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  // The last sections of a post may never reach the line because the page
  // cannot scroll further, so the bottom of the page selects the last one.
  if (scrolledToBottom) return headings.at(-1)?.id;

  let currentId = headings[0]?.id;

  for (const heading of headings) {
    const element = document.getElementById(heading.id);

    if (!element) continue;
    if (element.getBoundingClientRect().top > ACTIVE_LINE) break;

    currentId = heading.id;
  }

  return currentId;
};

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string | undefined>(headings[0]?.id);
  const listRef = useRef<HTMLUListElement | null>(null);
  const hasMeasuredRef = useRef(false);
  // Set while the page smooth-scrolls to a clicked heading, so the
  // in-between scroll positions do not move the highlight around.
  const clickedIdRef = useRef<string | null>(null);
  const [indicatorRef, animate] = useAnimate<HTMLSpanElement>();

  // Indent only headings deeper than the shallowest one in this post.
  const minDepth = Math.min(...headings.map((heading) => heading.depth));

  // Follow the reader's scroll position.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      if (clickedIdRef.current) return;

      setActiveId(getCurrentHeadingId(headings));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Any input from the reader ends a click-driven scroll.
    const releaseClickedHeading = () => {
      clickedIdRef.current = null;
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('wheel', releaseClickedHeading, { passive: true });
    window.addEventListener('touchstart', releaseClickedHeading, {
      passive: true,
    });
    window.addEventListener('keydown', releaseClickedHeading);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('wheel', releaseClickedHeading);
      window.removeEventListener('touchstart', releaseClickedHeading);
      window.removeEventListener('keydown', releaseClickedHeading);
    };
  }, [headings]);

  // Slide the indicator to the active entry and keep that entry visible
  // inside the list when the list scrolls.
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const link = list?.querySelector<HTMLElement>(
      `[data-heading-id="${CSS.escape(activeId ?? '')}"]`
    );

    if (!list || !indicator || !link) return;

    const isFirstMeasure = !hasMeasuredRef.current;
    const instant = isFirstMeasure || prefersReducedMotion();

    hasMeasuredRef.current = true;

    animate(
      indicator,
      { y: link.offsetTop, height: link.offsetHeight, opacity: 1 },
      instant ? { duration: 0 } : INDICATOR_TRANSITION
    );

    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const margin = link.offsetHeight;

    if (linkTop - margin < list.scrollTop) {
      list.scrollTo({
        top: linkTop - margin,
        behavior: instant ? 'auto' : 'smooth',
      });
    } else if (linkBottom + margin > list.scrollTop + list.clientHeight) {
      list.scrollTo({
        top: linkBottom + margin - list.clientHeight,
        behavior: instant ? 'auto' : 'smooth',
      });
    }
  }, [activeId, animate, indicatorRef]);

  // Scroll without going through the router, so jumping to a section does
  // not count as a navigation (no page transition).
  const scrollToHeading = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const element = document.getElementById(id);

    if (!element) return;

    event.preventDefault();
    clickedIdRef.current = id;
    setActiveId(id);
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      aria-labelledby="table-of-contents"
      className="sticky top-[calc(var(--navbar-height)+2.5rem)] flex max-h-[calc(100svh-var(--navbar-height)-var(--footer-offset)-9rem)] flex-col gap-3 text-sm"
    >
      <h2
        id="table-of-contents"
        className="text-muted-foreground font-mono text-xs font-medium tracking-[0.08em] uppercase"
      >
        On this page
      </h2>
      {/* Long posts scroll the list (following the active entry) instead of running past the footer. The scrollbar is hidden. */}
      <ul
        ref={listRef}
        className="border-border relative flex min-h-0 [scrollbar-width:none] flex-col overflow-y-auto overscroll-contain border-l [&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="bg-foreground pointer-events-none absolute top-0 left-0 w-0.5 opacity-0"
        />
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                data-heading-id={heading.id}
                onClick={(event) => scrollToHeading(event, heading.id)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'focus-visible:ring-ring flex min-h-9 items-center py-1.5 pr-2 leading-snug transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                  heading.depth > minDepth ? 'pl-7' : 'pl-4',
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
