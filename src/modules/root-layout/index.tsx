import { Inter } from 'next/font/google';

import { type PropsWithChildren } from '@/core/types/common';

import { RootLayoutProviders } from './providers';
import { Scripts } from './Scripts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} flex h-svh w-svw antialiased`}
      >
        <RootLayoutProviders>{children}</RootLayoutProviders>
        <Scripts />
      </body>
    </html>
  );
};
