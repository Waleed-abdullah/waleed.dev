import { WaleedIcon } from '@/core/icons/waleed-icon';

import { NavbarTabs } from './tabs';
import { ThemeSwitchButton } from './theme-switch-button';

export const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-[var(--navbar-height)] items-center justify-between bg-transparent px-2 py-2 backdrop-blur">
      <WaleedIcon className="size-6" />
      <NavbarTabs />
      <ThemeSwitchButton />
    </nav>
  );
};
