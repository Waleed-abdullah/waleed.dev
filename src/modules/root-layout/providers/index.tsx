import { MotionConfig } from 'motion/react';

import { type PropsWithChildren } from '@/core/types/common';

import { ThemeColorMeta } from './theme-color-meta';
import { ThemeProvider } from './theme-provider';

export const RootLayoutProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ThemeColorMeta />
      {/* Skip transform animations for visitors who prefer reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
};
