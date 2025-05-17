import { type PropsWithChildren } from "@/core/types/common";

import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { FadeUpAnimation } from "./layout/fade-up-animation";

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-1 flex-col size-svh">
      <Navbar />
      <main className="flex flex-1 w-full pb-[var(--footer-height)]">
        <FadeUpAnimation>
          <div className="flex flex-col w-full max-w-5xl mx-auto py-10 px-6">
            {children}
          </div>
        </FadeUpAnimation>
      </main>
      <Footer />
    </div>
  );
};
