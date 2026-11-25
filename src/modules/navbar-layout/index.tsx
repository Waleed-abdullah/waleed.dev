import { type PropsWithChildren } from '@/core/types/common';

import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-svh w-full flex-1 flex-col">
      {/* First stop for keyboard users: jumps past the navbar */}
      <a
        href="#main-content"
        className="bg-background text-foreground border-border focus-visible:ring-ring sr-only z-[60] rounded-md border px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus-visible:ring-2 focus-visible:outline-none"
      >
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 pt-[var(--navbar-height)] pb-[var(--footer-offset)] outline-none"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
