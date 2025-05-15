import { type PropsWithChildren } from "@/core/types/common";

import { ThemeProvider } from "./theme-provider";

export const RootLayoutProviders = ({ children }: PropsWithChildren) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
