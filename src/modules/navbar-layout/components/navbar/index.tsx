import { Link } from '@tanstack/react-router';
import type { AnimationEvent, SyntheticEvent } from 'react';

import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { WaleedIcon } from '@/core/icons/waleed-icon';

import { NavbarTabs } from './tabs';
import { ThemeSwitchButton } from './theme-switch-button';

// Starts the logo pulse (see .waleed-icon-dot in globals.css). A pulse that
// is already playing is left to finish.
const startLogoPulse = (event: SyntheticEvent<HTMLElement>) => {
  event.currentTarget.dataset.pulse = '';
};

const endLogoPulse = (event: AnimationEvent<HTMLElement>) => {
  if (
    event.animationName === 'logo-pulse' &&
    event.target instanceof Element &&
    event.target.hasAttribute('data-last-dot')
  ) {
    delete event.currentTarget.dataset.pulse;
  }
};

export const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="border-border bg-background/80 fixed inset-x-0 top-0 z-50 flex h-[var(--navbar-height)] items-center justify-between border-b pr-[max(0.5rem,env(safe-area-inset-right))] pl-[max(0.5rem,env(safe-area-inset-left))] backdrop-blur-md [view-transition-name:navbar] sm:px-4"
    >
      <Link
        to={ABSOLUTE_ROUTES.ROOT}
        aria-label="Go to home"
        onPointerEnter={startLogoPulse}
        onFocus={startLogoPulse}
        onAnimationEnd={endLogoPulse}
        className="focus-visible:ring-ring flex size-11 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
      >
        <WaleedIcon className="size-6" />
      </Link>
      <NavbarTabs />
      <ThemeSwitchButton />
    </nav>
  );
};
