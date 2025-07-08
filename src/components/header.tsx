'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Gamepad2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLenis } from '@studio-freight/react-lenis';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#games', label: 'Games' },
  { href: '/#showcase', label: 'Showcase' },
  { href: '/#events', label: 'Events' },
  { href: '/#achievements', label: 'Achievements' },
  { href: '/members', label: 'Members' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lenis = useLenis();

  useEffect(() => {
    // Set active link for non-homepage routes like /members
    if (pathname !== '/') {
      setActiveLink(pathname);
      return;
    }
    
    // Logic for homepage scroll-based active link
    const observer = new IntersectionObserver(
      (entries) => {
        // If navigating via click, ignore observer updates to prevent flickering
        if (isNavigatingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`/#${entry.target.id}`);
          }
        });
      },
      {
        // A section is "active" if it's in the middle of the viewport
        rootMargin: '-50% 0px -50% 0px', 
      }
    );

    const sections = navLinks
      .filter((link) => link.href.startsWith('/#'))
      .map((link) => document.getElementById(link.href.substring(2)))
      .filter((section): section is HTMLElement => section !== null);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (isSheetOpen) setIsSheetOpen(false);

    // Handle on-page smooth scroll with transition
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();

      // Add a body class to trigger the CSS transition
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => {
        document.body.classList.remove('is-nav-scrolling');
      }, 800); // Match CSS animation duration

      const targetId = href.substring(1);
      lenis?.scrollTo(targetId, {
        offset: -80, // Account for sticky header height
        duration: 1.5,
      });
    }
    
    // Set active link immediately for instant feedback
    setActiveLink(href);

    // Block observer for a short period to prevent race conditions
    isNavigatingRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Unblock observer after scroll animation completes
    timeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1500);
  };


  const NavLinkComponent = ({ href, label, isMobile = false }: { href: string; label: string; isMobile?: boolean }) => {
    const isActive = activeLink === href;
    return (
      <Link
        href={href}
        onClick={(e) => handleNavLinkClick(e, href)}
        className={cn(
          'transition-colors hover:text-primary',
          isMobile 
            ? 'block text-lg font-semibold'
            : 'relative py-2 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100',
          isActive && (isMobile ? 'text-primary' : 'text-primary after:scale-x-100')
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-wider glitch-layers" data-text="GAME TO AIM">
              GAME TO AIM
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLinkComponent key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                The main navigation links for the website.
              </SheetDescription>
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-4 pt-6">
                  {navLinks.map((link) => (
                    <NavLinkComponent key={`${link.href}-mobile`} href={link.href} label={link.label} isMobile />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
