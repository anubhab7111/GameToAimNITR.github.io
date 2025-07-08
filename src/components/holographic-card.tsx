'use client';

import { useState, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HolographicCardProps {
  icon: ReactNode;
  label: string;
  title: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  isAnimating: boolean;
}

export default function HolographicCard({ icon, label, title, onClick, isAnimating }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isAnimating) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateY = (x / (width / 2)) * 10; 
    const rotateX = -(y / (height / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isAnimating) return;
    setRotation({ x: 0, y: 0 });
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isAnimating) return;

    if(cardRef.current) {
        cardRef.current.classList.add('animate-data-plug-in');
    }
    // The onClick prop now handles the primary action
    onClick(e);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "holographic-card",
        { 'pointer-events-none': isAnimating }
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      role="button"
      tabIndex={isAnimating ? -1 : 0}
      onKeyDown={(e) => !isAnimating && (e.key === 'Enter' || e.key === ' ') && handleClick(e as any)}
    >
      <div className="holographic-card-glow"></div>
      <div className="holographic-card-content">
        <div className="text-accent h-12 w-12">
            {icon}
        </div>
        <h3 className="text-2xl font-bold font-display text-glow-primary">{title}</h3>
        <p className="font-code text-accent tracking-widest">{label}</p>
      </div>
    </div>
  );
}
