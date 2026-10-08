import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Gemfort International | Premium Natural Gemstones',
  description: 'Natural sapphires, rubies, alexandrite, and spinel sourced from Sri Lanka, Africa, and Burma. Hand-cut in Sri Lanka for over 35 years.',
};

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Suspense fallback={<div style={{ height: '100vh', backgroundColor: '#fbfaf6' }}></div>}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Suspense>
      </body>
    </html>
  );
}
