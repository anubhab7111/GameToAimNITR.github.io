
'use client';

import { Mail, Phone, User, Handshake, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

const presidentInfo = {
  role: 'President',
  name: 'Jax',
  email: 'president@gta.nitt.edu',
  phone: '+91-9876543210',
};

// Google Form Links - Replace with your actual links
const JOIN_US_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfaKcVCfLCq4Nt5klTXbhhFj6ox1dpbwPSeGUJQbCbhN7iOuQ/viewform?usp=sf_link';
const COLLABORATE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfaKcVCfLCq4Nt5klTXbhhFj6ox1dpbwPSeGUJQbCbhN7iOuQ/viewform?usp=sf_link';


const HolographicLinkCard = ({ href, icon, title, subtitle }: { href: string; icon: React.ReactNode; title: string; subtitle: string; }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateY = (x / (width / 2)) * 8; 
    const rotateX = -(y / (height / 2)) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="holographic-card group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <div className="holographic-card-glow transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"></div>
      <div className="holographic-card-content gap-2">
        <div className="text-accent h-12 w-12 mb-2 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-2xl font-bold font-display text-glow-primary">{title}</h3>
        <p className="font-code text-accent tracking-widest">{subtitle}</p>
      </div>
    </Link>
  );
};


export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 flex items-center justify-center min-h-screen parallax-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">Ready to create the future? Connect with us.</p>
        </div>
        
        <div className="max-w-4xl mx-auto p-4 md:p-6 mb-12 border border-primary/20 bg-card/50 backdrop-blur-sm rounded-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <HolographicLinkCard
            href={JOIN_US_FORM_URL}
            icon={<UserPlus size={48} />}
            title="Join Us"
            subtitle="Become a Member"
          />
          <HolographicLinkCard
            href={COLLABORATE_FORM_URL}
            icon={<Handshake size={48} />}
            title="Collaborate"
            subtitle="Partner With Us"
          />
        </div>
      </div>
    </section>
  )
}
