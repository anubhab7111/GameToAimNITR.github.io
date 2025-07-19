
'use client';

import { Mail, Phone, User, Handshake, UserPlus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Typewriter from '@/components/typewriter';
import CyberButton from '@/components/cyber-button';

const presidentInfo = {
  role: 'President',
  name: 'Jax',
  email: 'president@gta.nitt.edu',
  phone: '+91-9876543210',
};

const JOIN_US_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfaKcVCfLCq4Nt5klTXbhhFj6ox1dpbwPSeGUJQbCbhN7iOuQ/viewform?usp=sf_link';
const COLLABORATE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfaKcVCfLCq4Nt5klTXbhhFj6ox1dpbwPSeGUJQbCbhN7iOuQ/viewform?usp=sf_link';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedButton, setSelectedButton] = useState<'join' | 'collaborate'>('join');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
  
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setSelectedButton('join');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setSelectedButton('collaborate');
      } else if (e.key === 'Enter') {
        const url = selectedButton === 'join' ? JOIN_US_FORM_URL : COLLABORATE_FORM_URL;
        window.open(url, '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, selectedButton]);

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 flex items-center justify-center min-h-screen parallax-section">
      <div className={cn("terminal-container", { "is-active": isVisible })}>
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <p className="text-sm text-muted-foreground font-code">/dev/tty.contact</p>
        </div>
        <div className="terminal-body space-y-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">
              <Typewriter text="Get In Touch" speed={50} delay={isVisible ? 500 : 99999} />
            </h2>
            <p className={cn("mt-4 text-lg text-muted-foreground animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.2s' }}>
              Ready to create the future? Connect with us.
            </p>
          </div>
          
          <div className={cn("max-w-4xl mx-auto p-4 md:p-6 border border-primary/20 bg-card/50 backdrop-blur-sm rounded-lg animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-12 gap-y-4 text-center">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-bold text-lg">{presidentInfo.name}</span>
                  <span className="text-sm text-muted-foreground"> ({presidentInfo.role})</span>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${presidentInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">{presidentInfo.email}</a>
              </div>
               <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${presidentInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{presidentInfo.phone}</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className={cn("animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.8s' }}>
                    <CyberButton
                        icon={<UserPlus size={24} />}
                        label="Join Us"
                        href={JOIN_US_FORM_URL}
                        isSelected={selectedButton === 'join'}
                        onMouseEnter={() => setSelectedButton('join')}
                    />
                </div>
                <div className={cn("animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '2.0s' }}>
                     <CyberButton
                        icon={<Handshake size={24} />}
                        label="Collaborate"
                        href={COLLABORATE_FORM_URL}
                        isSelected={selectedButton === 'collaborate'}
                        onMouseEnter={() => setSelectedButton('collaborate')}
                    />
                </div>
            </div>
             <div className={cn("animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '2.2s' }}>
                <p className="text-sm text-muted-foreground font-code">
                Use [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">A</kbd>/<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">D</kbd>] or [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">Arrows</kbd>] to select. Press [<kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md">Enter</kbd>] to confirm.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
