
'use client';

import { useEffect, useState, useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { Gamepad2, Component, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cybertype from '@/components/cybertype';
import Typewriter from '@/components/typewriter';
import HeroBackground from '@/components/hero-background';

export default function HeroSection() {
  const buttons = ['games', 'showcase', 'join'] as const;
  type SelectedButton = (typeof buttons)[number];
  const [selectedButton, setSelectedButton] = useState<SelectedButton>('games');
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to play animation only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.5 } // Animate when 50% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleNavigation = (targetId: string) => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, [selectedButton, lenis]);

  const buttonData = [
    { id: 'games', label: 'Explore Games', icon: <Gamepad2 />, target: '#games' },
    { id: 'showcase', label: 'Explore Showcase', icon: <Component />, target: '#showcase' },
    { id: 'join', label: 'Join Us', icon: <UserPlus />, target: '#contact' },
  ];

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100vh] w-full flex items-center justify-center text-center overflow-hidden">
      <HeroBackground isVisible={isVisible} />
      <div className="z-10 flex flex-col items-center p-4">
        <div
          className={cn('animate-entry animate-slide-in-top', { 'is-visible': isVisible })}
          style={{ animationDelay: '600ms' }}
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow-primary glitch-layers"
            data-text="GAME TO AIM"
          >
            GAME TO AIM
          </h1>
        </div>
        <div
          className={cn('max-w-3xl mt-8 animate-entry animate-fade-in', { 'is-visible': isVisible })}
          style={{ animationDelay: '800ms' }}
        >
          <Cybertype
            texts={[
              "NIT Rourkela's Official Game Development Club.",
              "We Don't Code. We Build Worlds.",
            ]}
          />
        </div>
        <div
          className="flex flex-col items-center gap-4 mt-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {buttonData.map((btn, index) => (
              <div 
                key={btn.id}
                className={cn('animate-entry', { 'is-visible': isVisible },
                  index === 0 ? 'animate-slide-in-left' : index === 1 ? 'animate-fade-in' : 'animate-slide-in-right'
                )}
                style={{ animationDelay: `${1000 + index * 150}ms` }}
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
                      {isVisible ? (
                        <Typewriter
                          text={btn.label}
                          speed={50}
                          delay={1200 + index * 150} // Delay typewriter until after container animates in
                        />
                      ) : <span>&nbsp;</span>}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div 
            className={cn('animate-entry animate-fade-in', { 'is-visible': isVisible })}
            style={{ animationDelay: '1500ms' }}
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
