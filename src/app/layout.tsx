import "./globals.css";

import type { Metadata } from "next";

import type { PropsWithChildren } from "@/core/types/common";
import { RootLayout } from "@/modules/root-layout";

export const metadata: Metadata = {
  title: "Waleed",
  description: "A full stack dev",
};

export default function Layout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
