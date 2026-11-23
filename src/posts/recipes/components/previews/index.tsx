import { type ComponentType } from 'react';

import { TABS } from '../tabs-showcase/constants';

/*
 * Small, theme-aware previews of each recipe for the recipe cards. They are
 * decorative copies of the real components (no interaction) that play a
 * short version of the effect when the card is hovered.
 */

/** The animated switch, checked; hovering the card shows the pressed thumb. */
const SwitchPreview = () => (
  <span className="bg-primary flex h-9 w-16 items-center rounded-full p-1">
    <span className="bg-background block size-7 translate-x-7 rounded-full shadow-lg transition-[translate,width] duration-300 group-hover:w-9 group-hover:translate-x-5" />
  </span>
);

/** The animated tabs; hovering the card moves the indicator to the next tab. */
const TabsPreview = () => (
  <span className="text-primary relative flex items-center text-[13px] font-medium sm:text-sm">
    {Object.values(TABS).map((tab) => (
      <span key={tab} className="w-[4.5rem] py-1.5 text-center sm:w-20">
        {tab}
      </span>
    ))}
    <span className="bg-secondary dark:bg-secondary-foreground absolute inset-y-0 left-0 z-10 w-[4.5rem] rounded-full mix-blend-difference transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[4.5rem] sm:w-20 sm:group-hover:translate-x-20" />
  </span>
);

export const RECIPE_PREVIEWS: Record<string, ComponentType | undefined> = {
  'animated-switch': SwitchPreview,
  'animated-tabs': TabsPreview,
};
