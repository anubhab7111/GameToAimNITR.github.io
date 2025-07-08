
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
import {
  Menu,
  Gamepad2,
  Info,
  Joystick,
  Component,
  Calendar,
  Trophy,
  Users,
  Send,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLenis } from '@studio-freight/react-lenis';
import type { ElementType } from 'react';

interface NavLink {
  href: string;
  label: string;
  Icon: ElementType;
}

const navLinks: NavLink[] = [
  { href: '/#about', label: 'About', Icon: Info },
  { href: '/#games', label: 'Games', Icon: Joystick },
  { href: '/#showcase', label: 'Showcase', Icon: Component },
  { href: '/#events', label: 'Events', Icon: Calendar },
  { href: '/#achievements', label: 'Achievements', Icon: Trophy },
  { href: '/members', label: 'Members', Icon: Users },
  { href: '/#contact', label: 'Contact', Icon: Send },
];

export default function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Effect for sliding underline
  useEffect(() => {
    if (navRef.current && activeLink) {
      const activeLinkElement = navRef.current.querySelector(`[data-href="${activeLink}"]`) as HTMLElement;
      if (activeLinkElement) {
        const { offsetLeft, offsetWidth } = activeLinkElement;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
      } else {
        setUnderlineStyle({ ...underlineStyle, opacity: 0 });
      }
    } else {
      setUnderlineStyle({ ...underlineStyle, opacity: 0 });
    }
  }, [activeLink, navRef]);

  // Effect for setting active link based on scroll/path
  useEffect(() => {
    if (pathname !== '/') {
      setActiveLink(pathname);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`/#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', 
      }
    );

    const sections = navLinks
      .filter((link) => link.href.startsWith('/#'))
      .map((link) => document.getElementById(link.href.substring(2)))
      .filter((section): section is HTMLElement => section !== null);

    sections.forEach((section) => observer.observe(section));

    // Set initial active link for homepage
    setActiveLink('/#hero');
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (heroSection) observer.unobserve(heroSection);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (isSheetOpen) setIsSheetOpen(false);

    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => document.body.classList.remove('is-nav-scrolling'), 800);

      const targetId = href.substring(1);
      lenis?.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
      });
    }
    
    setActiveLink(href);
    isNavigatingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { isNavigatingRef.current = false; }, 1500);
  };

  const NavLinkComponent = ({ href, label, Icon, isMobile = false }: NavLink & { isMobile?: boolean }) => {
    const isActive = activeLink === href;
    return (
      <Link
        href={href}
        data-href={href}
        onClick={(e) => handleNavLinkClick(e, href)}
        className={cn(
          isMobile ? 'flex items-center gap-3 text-lg font-semibold' : 'cyber-nav-link',
          isActive && !isMobile && 'text-primary-foreground'
        )}
      >
        <Icon className={cn("h-4 w-4 transition-colors group-hover:text-primary", isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
        <span className="nav-link-text">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 cyber-header">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-wider glitch-layers" data-text="GAME TO AIM">
              GAME TO AIM
            </span>
          </Link>
        </div>
        <nav ref={navRef} className="relative hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkComponent key={link.href} {...link} />
          ))}
          <div className="sliding-box" style={underlineStyle} />
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] cyber-header border-l-border/60">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                The main navigation links for the website.
              </SheetDescription>
              <div className="flex flex-col h-full">
                <nav className="flex-1 space-y-4 pt-6">
                  {navLinks.map((link) => (
                    <NavLinkComponent key={`${link.href}-mobile`} {...link} isMobile />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
