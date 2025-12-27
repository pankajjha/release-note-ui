import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ambak Weekly - Release Notes',
  description: 'Weekly product updates and feature releases from Ambak',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-[#2C2C2C] leading-relaxed antialiased">
        {children}
      </body>
    </html>
  );
}

