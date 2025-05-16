import { WaleedIcon } from "@/core/icons/waleed-icon";

import { NavbarTabs } from "./tabs";
import { ThemeSwitchButton } from "./theme-switch-button";

export const Navbar = () => {
  return (
    <nav className="sticky bg-transparent items-center justify-between top-0 backdrop-blur z-50 flex h-[var(--navbar-height)] py-2 px-2">
      <WaleedIcon className="size-6" />
      <NavbarTabs />
      <ThemeSwitchButton />
    </nav>
  );
};
