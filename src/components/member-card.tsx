
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Github, Linkedin, ChevronDown } from 'lucide-react';
import type { Member } from '@/lib/members/types';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface MemberCardProps {
  member: Member;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getVariantStyles = () => {
        const colorCycle = index % 3;
        // Define styles as CSS variables to be used in JSX style attribute
        switch (colorCycle) {
            case 0: return { '--glow-color': 'hsl(var(--accent))' } as React.CSSProperties;
            case 1: return { '--glow-color': 'hsl(var(--primary))' } as React.CSSProperties;
            case 2: return { '--glow-color': '#00ff00' } as React.CSSProperties; // Sharp Green
            default: return { '--glow-color': 'hsl(var(--accent))' } as React.CSSProperties;
        }
    };
    const colorStyle = getVariantStyles();

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group/card w-full"
            style={colorStyle}
        >
            <div className="cyber-card-container animate-cyber-glow-flicker">
                <div className="cyber-card-content cyber-card-shimmer p-4 flex flex-col gap-4">
                    {/* Image and Name Header */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                             <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--glow-color)] animate-spin-slow" style={{ animationDuration: '10s' }} />
                             <div className="absolute inset-1 rounded-full border border-[var(--glow-color)]/50" />
                             <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="96px"
                                className="object-cover rounded-full p-2"
                                data-ai-hint={member.aiHint}
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-foreground transition-colors group-hover/card:text-[var(--glow-color)]">{member.name}</h3>
                            <p className="font-semibold text-[var(--glow-color)] text-glow-primary">{member.role}</p>
                        </div>
                    </div>

                    {/* Special Ability */}
                    <div className="text-center bg-card/50 p-3 rounded-md border border-border">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">Special Ability</p>
                        <p className="font-semibold text-lg text-foreground mt-1">{`"${member.specialAbility}"`}</p>
                    </div>

                    <CollapsibleContent className="space-y-4">
                        {/* Bio */}
                        <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                            {member.bio}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex justify-center items-center gap-6 pt-2 border-t border-border">
                            {member.githubUrl && (
                                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[var(--glow-color)] transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                            {member.linkedinUrl && (
                                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[var(--glow-color)] transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </CollapsibleContent>

                    {/* Trigger Button */}
                    <CollapsibleTrigger asChild>
                         <button className="w-full mt-2 text-sm font-semibold text-muted-foreground hover:text-[var(--glow-color)] flex items-center justify-center gap-2 p-2 rounded-md transition-colors hover:bg-white/5">
                            <span>{isOpen ? 'Show Less' : 'Show More'}</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", { 'rotate-180': isOpen })} />
                        </button>
                    </CollapsibleTrigger>
                </div>
            </div>
        </Collapsible>
    );
}

// Add slow spin animation to globals if not present, or to a style tag here.
// For now, let's assume a global animation exists or add it here.
const keyframes = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
`;
// This is a bit of a hack for a component; ideally this is in globals.css
// A better approach would be to add a class in globals.css for this.
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
}
