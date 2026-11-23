export const LIFTS = [
  { name: 'Bench press', lbs: 285 },
  { name: 'Squat', lbs: 315 },
  { name: 'Deadlift', lbs: 405 },
] as const;

export const LBS_TO_KG = 0.453592;

export const UNITS = ['lbs', 'kg'] as const;

export type Unit = (typeof UNITS)[number];
