export const GYM_PRS = [
  { name: 'Bench Press', lbs: 285 },
  { name: 'Squat', lbs: 315 },
  { name: 'Deadlift', lbs: 405 },
] as const;

export const LBS_TO_KG = 0.453592;

export const FAB_STORAGE_KEY = 'gym-fab-position';

export const FAB_DEFAULT_POSITION = { x: 0, y: 0 };
