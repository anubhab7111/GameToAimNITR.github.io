'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import EventsSection from '@/components/sections/events';
import AchievementsSection from '@/components/sections/achievements';
import ContactSection from '@/components/sections/contact';
import GamesSection from '@/components/sections/games';
import ShowcaseSection from '@/components/sections/showcase';
import BackgroundFX from '@/components/background-fx';

export default function Home() {
  const lenis = useLenis();
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const isDiving = useRef(false);

  // Collect all main sections with an ID for navigation
  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll('main > section[id]'));
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      setCurrentSection(0);
    }
  }, [lenis]);

  // The core snap-scrolling function
  const scrollToSection = useCallback((index: number) => {
    const targetSection = sectionsRef.current[index];
    if (!lenis || isScrolling.current || !targetSection) {
      return;
    }

    isScrolling.current = true;
    setCurrentSection(index);

    lenis.scrollTo(targetSection, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      onComplete: () => {
        isScrolling.current = false;
        if (isDiving.current) {
          document.body.classList.remove('is-diving');
          isDiving.current = false;
        }
      },
    });
  }, [lenis]);

  const handleNeuralDive = useCallback(() => {
    if (isScrolling.current || isDiving.current) return;

    isDiving.current = true;
    document.body.classList.add('is-diving');

    // Wait for glitch animation to play out
    setTimeout(() => {
      const showcaseIndex = sectionsRef.current.findIndex(sec => sec.id === 'showcase');
      if (showcaseIndex !== -1) {
        scrollToSection(showcaseIndex);
      } else {
        // Fallback if showcase section not found
        document.body.classList.remove('is-diving');
        isDiving.current = false;
      }
    }, 2000); // Must match the animation duration
  }, [scrollToSection]);

  // Handle user-initiated scroll via mouse wheel and keyboard
  useEffect(() => {
    const handleScrollIntent = (direction: number) => {
      if (isScrolling.current || isDiving.current) {
        return;
      }
      
      const gamesSectionIndex = sectionsRef.current.findIndex(sec => sec.id === 'games');

      // Intercept scroll down from 'games' section
      if (currentSection === gamesSectionIndex && direction === 1) {
          handleNeuralDive();
          return;
      }

      const nextSectionIndex = currentSection + direction;
      if (nextSectionIndex >= 0 && nextSectionIndex < sectionsRef.current.length) {
        scrollToSection(nextSectionIndex);
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      handleScrollIntent(direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with form inputs
      }

      let direction = 0;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) direction = 1;
      if (['ArrowUp', 'PageUp'].includes(e.key)) direction = -1;

      if (direction !== 0) {
        e.preventDefault();
        handleScrollIntent(direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentSection, scrollToSection, handleNeuralDive]);
  
  // Sync state when scrolling via nav links to keep track of the current section
  useEffect(() => {
    if (!lenis) return;
    const handleScroll = () => {
        if (isScrolling.current) return;
        const scrollPosition = lenis.scroll + window.innerHeight / 2;
        
        let newSectionIndex = 0;
        for(let i = 0; i < sectionsRef.current.length; i++) {
            const section = sectionsRef.current[i];
            if (section.offsetTop <= scrollPosition) {
                newSectionIndex = i;
            }
        }

        if (newSectionIndex !== currentSection) {
            setCurrentSection(newSectionIndex);
        }
    };

    lenis.on('scroll', handleScroll);
    return () => {
        lenis.off('scroll', handleScroll);
    };
  }, [lenis, currentSection]);
  
  return (
    <>
      <BackgroundFX />
      <HeroSection />
      <AboutSection />
      <GamesSection />
      <ShowcaseSection />
      <EventsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
