import { HeadContent, Scripts } from '@tanstack/react-router';

import { type PropsWithChildren } from '@/core/types/common';
import { GymFab } from '@/modules/gym-fab';

import { RootLayoutProviders } from './providers';
import { Scripts as RootScripts } from './Scripts';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    // next-themes sets the theme class and color-scheme on <html> before hydration
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <HeadContent />
        <RootScripts />
      </head>
      <body className="flex h-svh w-full font-sans antialiased">
        <RootLayoutProviders>
          {children}
          <GymFab />
        </RootLayoutProviders>
        <Scripts />
      </body>
    </html>
  );
};
