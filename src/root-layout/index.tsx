import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} antialiased h-svh flex`}
      >
        {children}
      </body>
    </html>
  );
};
