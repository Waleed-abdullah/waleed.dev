"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

import { type PropsWithChildren } from "@/core/types/common";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
};
