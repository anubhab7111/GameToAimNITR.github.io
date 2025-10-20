'use client';

import { AnimationProvider } from '@/context/animation-context';
import LenisProvider from '@/components/lenis-provider';
import CursorFX from '@/components/cursor-fx';
import BackgroundFX from '@/components/background-fx';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <LenisProvider>
        <CursorFX />
        <BackgroundFX />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </LenisProvider>
    </AnimationProvider>
  );
}
