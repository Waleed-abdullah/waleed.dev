import { MotionConfig } from 'motion/react';

import { type PropsWithChildren } from '@/core/types/common';

import { ThemeProvider } from './theme-provider';

export const RootLayoutProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      {/* Skip transform animations for visitors who prefer reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
};
