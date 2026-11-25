// Small deterministic 3D value noise. The background uses the third axis as
// time, so the pattern drifts without jumping.

const hash = (x: number, y: number, z: number) => {
  let h =
    Math.imul(x, 374761393) +
    Math.imul(y, 668265263) +
    Math.imul(z, 1440670441);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const valueNoise = (x: number, y: number, z: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const w = smooth(z - zi);
  const plane = (zz: number) =>
    lerp(
      lerp(hash(xi, yi, zz), hash(xi + 1, yi, zz), u),
      lerp(hash(xi, yi + 1, zz), hash(xi + 1, yi + 1, zz), u),
      v
    );
  return lerp(plane(zi), plane(zi + 1), w);
};

// Three octaves of value noise, roughly in 0..1
export const fbm3 = (x: number, y: number, z: number) =>
  valueNoise(x, y, z) * 0.57 +
  valueNoise(x * 2.1 + 5.3, y * 2.1 + 1.7, z * 1.3 + 3.1) * 0.29 +
  valueNoise(x * 4.3 + 9.1, y * 4.3 + 3.3, z * 1.7 + 7.7) * 0.14;
