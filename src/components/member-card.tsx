
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import type { Member } from '@/lib/members-data';
import { cn } from '@/lib/utils';

interface TechCardFrontProps {
  member: Member;
  index: number;
}

const TechCardFront = ({ member, index }: TechCardFrontProps) => {
  const getVariantStyles = () => {
    const colorCycle = index % 3;
    switch (colorCycle) {
      case 0:
        return { primary: '#00ffff', secondary: '#ffffff' }; // Cyan
      case 1:
        return { primary: '#BE29EC', secondary: '#e1bee7' }; // Purple
      case 2:
        return { primary: '#00ff00', secondary: '#c8e6c9' }; // Green
      default:
        return { primary: '#00ffff', secondary: '#ffffff' }; // Default to Cyan
    }
  };

  const colors = getVariantStyles();

  return (
    <div className="relative w-full h-full font-mono">
      {/* Main card with corner cuts */}
      <div
        className="relative w-full h-full bg-black border-2"
        style={{
          borderColor: colors.primary,
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          boxShadow: `0 0 10px ${colors.primary}40`,
        }}
      >
        {/* Left side frame */}
        <div className="absolute left-0 top-0 w-12 h-full">
          <div className="absolute top-8 left-2 w-8 h-16" style={{ backgroundColor: colors.primary }} />
          <div className="absolute top-12 left-4 w-4 h-8 bg-black" />
          <div className="absolute top-32 left-3 w-1 h-12 bg-white opacity-60" />
          <div className="absolute top-36 left-5 w-4 h-1 bg-white opacity-60" />
          <div className="absolute top-40 left-3 w-2 h-2 rounded-full bg-white opacity-60" />
          <div className="absolute bottom-16 left-2 w-8 h-12" style={{ backgroundColor: colors.primary }} />
          <div className="absolute bottom-20 left-4 w-4 h-6 bg-black" />
          <div className="absolute bottom-8 left-3 w-1 h-8 bg-white opacity-60" />
        </div>

        {/* Right side frame */}
        <div className="absolute right-0 top-0 w-12 h-full">
          <div className="absolute top-8 right-2 w-8 h-16" style={{ backgroundColor: colors.primary }} />
          <div className="absolute top-12 right-4 w-4 h-8 bg-black" />
          <div className="absolute top-32 right-3 w-1 h-12 bg-white opacity-60" />
          <div className="absolute top-36 right-5 w-4 h-1 bg-white opacity-60" />
          <div className="absolute top-40 right-3 w-2 h-2 rounded-full bg-white opacity-60" />
          <div className="absolute bottom-16 right-2 w-8 h-12" style={{ backgroundColor: colors.primary }} />
          <div className="absolute bottom-20 right-4 w-4 h-6 bg-black" />
          <div className="absolute bottom-8 right-3 w-1 h-8 bg-white opacity-60" />
        </div>

        {/* Central content area */}
        <div className="absolute left-12 right-12 top-8 bottom-8 flex flex-col">
          {/* Photo area */}
          <div className="flex-1 mb-4 relative bg-gray-700">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="w-full h-full object-cover"
              data-ai-hint={member.aiHint}
            />
          </div>

          {/* Name and designation area */}
          <div className="h-16 bg-gray-900 flex flex-col justify-center items-center border-t-2" style={{ borderColor: colors.primary }}>
            <div className="text-white text-sm font-bold tracking-wide uppercase">
              {member.name}
            </div>
            <div
              className="text-xs mt-1 tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              {member.role}
            </div>
          </div>
        </div>

        {/* Subtle glow animation */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={
            {
              '--glow-color-1': `${colors.primary}20`,
              '--glow-color-2': `${colors.primary}30`,
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              animation: 'tech-card-glow 3s infinite ease-in-out',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

interface TechCardBackProps {
  member: Member;
  index: number;
}

const TechCardBack = ({ member, index }: TechCardBackProps) => {
    const getVariantStyles = () => {
        const colorCycle = index % 3;
        switch (colorCycle) {
          case 0: return { primary: '#00ffff', secondary: '#ffffff' }; // Cyan
          case 1: return { primary: '#BE29EC', secondary: '#e1bee7' }; // Purple
          case 2: return { primary: '#00ff00', secondary: '#c8e6c9' }; // Green
          default: return { primary: '#00ffff', secondary: '#ffffff' };
        }
    };
    const colors = getVariantStyles();

    return (
        <div className="relative w-full h-full font-mono text-white">
            <div
                className="relative w-full h-full bg-black border-2 flex flex-col p-4"
                style={{
                    borderColor: colors.primary,
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                    boxShadow: `0 0 10px ${colors.primary}40`
                }}
            >
                <div className="text-center mb-4 border-b-2 pb-2" style={{ borderColor: colors.primary }}>
                    <h3 className="text-base font-bold tracking-widest uppercase" style={{ color: colors.primary }}>Special Ability</h3>
                    <p className="text-sm font-semibold mt-1">{`"${member.specialAbility}"`}</p>
                </div>
                
                <div className="flex-grow flex flex-col text-center mb-2 overflow-hidden">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: colors.primary }}>// DATA LOG</h4>
                    <p className="text-sm text-gray-300 leading-relaxed px-2 flex-grow">
                        {member.bio}
                    </p>
                </div>

                <div className="border-t-2 pt-3" style={{ borderColor: colors.primary }}>
                    <div className="flex justify-center items-center gap-6">
                        {member.githubUrl && (
                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" style={{'--hover-color': colors.primary} as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
                                <Github className="w-6 h-6" />
                            </a>
                        )}
                        {member.linkedinUrl && (
                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" style={{'--hover-color': colors.primary} as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
                                <Linkedin className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
             <style jsx>{`
                a:hover {
                    color: var(--hover-color);
                    filter: drop-shadow(0 0 4px var(--hover-color));
                }
            `}</style>
        </div>
    );
};


interface MemberCardProps {
  member: Member;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn('flip-card-container group', { 'flipped': isFlipped })}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${member.name}`}
    >
      <div className="flip-card-flipper">
        {/* Front of the card */}
        <div className="flip-card-front">
          <TechCardFront member={member} index={index} />
        </div>

        {/* Back of the card */}
        <div className="flip-card-back">
            <TechCardBack member={member} index={index} />
        </div>
      </div>
    </div>
  );
}
