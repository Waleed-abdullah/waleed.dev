import { type PropsWithChildren } from "@/core/types/common";

import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col size-full">
      <Navbar />
      <main className="flex size-full">{children}</main>
      <Footer />
    </div>
  );
};
