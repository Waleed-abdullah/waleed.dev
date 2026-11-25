/** Best lifts in kilograms; `label` is the short name shown above the number */
export const LIFTS = [
  { name: 'Bench press', label: 'Bench', kg: 130 },
  { name: 'Squat', label: 'Squat', kg: 140 },
  { name: 'Deadlift', label: 'Deadlift', kg: 180 },
] as const;

/** Squat, bench and deadlift added up, the number lifters usually quote */
export const LIFTS_TOTAL_KG = LIFTS.reduce((total, lift) => total + lift.kg, 0);
