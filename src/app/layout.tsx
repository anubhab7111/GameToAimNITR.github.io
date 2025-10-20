
import type {Metadata} from 'next';
import { Space_Grotesk, Orbitron, VT323 } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@/components/root-providers';

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
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
