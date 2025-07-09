
'use client';

import { useEffect, useState, useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { Gamepad2, Component, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cybertype from '@/components/cybertype';
import HeroBackground from '@/components/hero-background';
import { useAnimation } from '@/context/animation-context';

export default function HeroSection() {
  const buttons = ['games', 'showcase', 'join'] as const;
  type SelectedButton = (typeof buttons)[number];
  
  const { sequenceState, sequenceComplete } = useAnimation();
  const [selectedButton, setSelectedButton] = useState<SelectedButton>('games');
  
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (targetId: string) => {
    if (!sequenceComplete) return;
    document.body.classList.add('is-nav-scrolling');
    setTimeout(() => {
      document.body.classList.remove('is-nav-scrolling');
    }, 800);

    lenis?.scrollTo(targetId, {
      offset: -80,
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (!sequenceComplete) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with form inputs
      }
      
      const currentIndex = buttons.indexOf(selectedButton);

      if (['a', 'arrowleft'].includes(event.key.toLowerCase())) {
        event.preventDefault();
        const nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        setSelectedButton(buttons[nextIndex]);
      } else if (['d', 'arrowright'].includes(event.key.toLowerCase())) {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        setSelectedButton(buttons[nextIndex]);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const pathMap: Record<SelectedButton, string> = {
          games: '#games',
          showcase: '#showcase',
          join: '#contact',
        };
        handleNavigation(pathMap[selectedButton]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedButton, lenis, sequenceComplete]);

  const buttonData = [
    { id: 'games', label: 'Explore Games', icon: <Gamepad2 />, target: '#games' },
    { id: 'showcase', label: 'Explore Showcase', icon: <Component />, target: '#showcase' },
    { id: 'join', label: 'Join Us', icon: <UserPlus />, target: '#contact' },
  ];

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100vh] w-full flex items-center justify-center text-center overflow-hidden">
      <HeroBackground isVisible={sequenceState >= 2} />
      <div className="z-10 flex flex-col items-center p-4">
        <div
          className={cn('animate-entry animate-slide-in-top', { 'is-visible': sequenceState >= 3 })}
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow-primary glitch-layers"
            data-text="GAME TO AIM"
          >
            GAME TO AIM
          </h1>
        </div>
        <div
          className={cn('max-w-3xl mt-8 animate-entry animate-fade-in', { 'is-visible': sequenceState >= 4 })}
        >
          <Cybertype
            texts={[
              "NIT Rourkela's Official Game Development Club.",
              "We Don't Code. We Build Worlds.",
            ]}
          />
        </div>
        <div
          className={cn('flex flex-col items-center gap-4 mt-12 transition-opacity duration-500', sequenceState >= 5 ? 'opacity-100' : 'opacity-0')}
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {buttonData.map((btn, index) => (
              <div 
                key={btn.id}
                className={cn('animate-entry', { 'is-visible': sequenceState >= 5 },
                  index === 0 ? 'animate-slide-in-left' : index === 1 ? 'animate-fade-in' : 'animate-slide-in-right'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <button
                  className={cn(
                    'cyber-button group flex-shrink-0',
                    { 'is-selected': selectedButton === btn.id }
                  )}
                  onClick={() => handleNavigation(btn.target)}
                  onMouseEnter={() => setSelectedButton(btn.id as SelectedButton)}
                >
                  <div className="cyber-button-content">
                    {btn.icon}
                    <span className="cyber-button-text">
                      {btn.label}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div 
            className={cn('animate-entry animate-fade-in', { 'is-visible': sequenceState >= 5 })}
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-sm text-muted-foreground font-code mt-4">
              Use [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">A</kbd>/<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">D</kbd>] or [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">Arrows</kbd>] to select. Press [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">Enter</kbd>] to confirm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
