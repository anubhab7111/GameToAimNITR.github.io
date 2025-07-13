
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Github, Linkedin, RotateCcw } from 'lucide-react';
import type { Member } from '@/lib/members-data';
import { cn } from '@/lib/utils';

interface MemberCardFrontProps {
  member: Member;
  index: number;
}

const MemberCardFront = ({ member, index }: MemberCardFrontProps) => {
    const getVariantStyles = () => {
        const colorCycle = index % 3;
        switch (colorCycle) {
            case 0: return { primary: 'hsl(var(--accent))' };
            case 1: return { primary: 'hsl(var(--primary))' };
            case 2: return { primary: 'hsl(var(--tertiary))' }; // Assuming a third color, or can cycle two
            default: return { primary: 'hsl(var(--accent))' };
        }
    };
    const colors = getVariantStyles();

    return (
        <div className="group/front relative w-full h-full overflow-hidden rounded-lg border-2 border-transparent transition-all"
             style={{ '--glow-color': colors.primary } as React.CSSProperties}
        >
            <div className="absolute inset-0 transition-all duration-500 group-hover/front:border-4"
                 style={{ borderColor: colors.primary }}
            />
            <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-500 ease-in-out group-hover/front:scale-110"
                data-ai-hint={member.aiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-foreground drop-shadow-lg">{member.name}</h3>
                <p className="text-md font-semibold" style={{ color: colors.primary }}>{member.role}</p>
            </div>
        </div>
    );
};


interface TechCardBackProps {
  member: Member;
  index: number;
  onFlip: () => void;
}

const TechCardBack = ({ member, index, onFlip }: TechCardBackProps) => {
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlip();
                  }}
                  className="absolute top-2 left-2 z-10 p-2 rounded-full bg-gray-600 text-gray-100 hover:text-white hover:bg-gray-500 transition-colors"
                  aria-label="Flip card to front"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

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

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleUnflip = () => setIsFlipped(false);

  return (
    <div
      className={cn('flip-card-container group', { 'flipped': isFlipped })}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${member.name}`}
    >
      <div className="flip-card-flipper">
        {/* Front of the card */}
        <div className="flip-card-front">
          <MemberCardFront member={member} index={index} />
        </div>

        {/* Back of the card */}
        <div className="flip-card-back">
            <TechCardBack member={member} index={index} onFlip={handleUnflip} />
        </div>
      </div>
    </div>
  );
}
