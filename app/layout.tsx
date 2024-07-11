import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Root } from '@/app/root/root'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telegram MiniApp Template",
  description: "Created with tma, next.js and tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Root>
        <body className={inter.className}>
          {children}
        </body>
      </Root>
    </html>
  );
}
