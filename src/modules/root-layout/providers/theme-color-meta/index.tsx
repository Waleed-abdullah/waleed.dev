import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { THEME_COLORS } from '../../head';

// Keeps <meta name="theme-color"> (the phone browser toolbar color) on the
// current theme's background. The server renders the dark color, the default.
export const ThemeColorMeta = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        resolvedTheme === 'light' ? THEME_COLORS.light : THEME_COLORS.dark
      );
  }, [resolvedTheme]);

  return null;
};
