import { type PropsWithChildren } from '@/core/types/common';

import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-svh w-full flex-1 flex-col">
      <Navbar />
      <main className="flex w-full flex-1 pt-[var(--navbar-height)] pb-[var(--footer-offset)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
