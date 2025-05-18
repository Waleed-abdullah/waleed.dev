import { type PropsWithChildren } from '@/core/types/common';

import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex size-svh flex-1 flex-col">
      <Navbar />
      <main className="mt-[var(--navbar-height)] flex w-full flex-1 pb-[var(--footer-height)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
