
import type {Metadata} from 'next';
import { Space_Grotesk, Orbitron, VT323 } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import Footer from '@/components/footer';
import CursorFX from '@/components/cursor-fx';
import LenisProvider from '@/components/lenis-provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: 'GAME TO AIM',
  description: 'Website for the GAME TO AIM (GTA) club of NIT Rourkela.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable} ${vt323.variable} dark`}>
      <body className="font-body antialiased">
        <LenisProvider>
          <CursorFX />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </LenisProvider>
      </body>
    </html>
  );
}
