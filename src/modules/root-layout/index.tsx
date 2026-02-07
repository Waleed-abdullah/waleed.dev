import { IBM_Plex_Sans } from 'next/font/google';

import { type PropsWithChildren } from '@/core/types/common';

import { RootLayoutProviders } from './providers';
import { Scripts } from './Scripts';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexSans.className} flex h-svh w-svw antialiased`}
      >
        <RootLayoutProviders>{children}</RootLayoutProviders>
        <Scripts />
      </body>
    </html>
  );
};
