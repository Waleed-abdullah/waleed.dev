import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { type PropsWithChildren } from '@/core/types/common';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    // Dark until the visitor picks a theme with the toggle
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemeProvider>
  );
};
