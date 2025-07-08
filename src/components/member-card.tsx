
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Github, Linkedin, UserSquare2, Info } from 'lucide-react';
import type { Member } from '@/lib/members-data';
import { cn } from '@/lib/utils';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn('flip-card-container group', { 'flipped': isFlipped })}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsFlipped(!isFlipped)}
      aria-label={`View details for ${member.name}`}
    >
      <div className="flip-card-flipper">
        {/* Front of the card */}
        <Card className="flip-card-front border-primary/30 transition-all duration-300 group-hover:border-primary">
          <CardHeader className="items-center text-center p-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-accent mb-3">
              <Image src={member.image} alt={member.name} fill={true} sizes="112px" className="object-cover" data-ai-hint={member.aiHint} />
            </div>
            <h3 className="text-xl font-bold text-accent">{member.name}</h3>
            <p className="font-semibold text-card-foreground">{member.role}</p>
          </CardHeader>
          <CardContent className="w-full px-4 space-y-2 flex-grow">
            {member.skills.slice(0, 3).map((skill) => (
              <div key={skill.name} className="w-full text-left">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}/100</span>
                </div>
                <Progress value={skill.level} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
              </div>
            ))}
          </CardContent>
          <div className="p-4 flex justify-end">
            <div className="text-accent animate-pulse">
              <Info className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* Back of the card */}
        <Card className="flip-card-back bg-card border-2 border-accent/50">
            <CardHeader className="text-center">
              <h3 className="text-lg font-bold text-accent mb-2">Special Ability</h3>
              <p className="text-primary-foreground font-semibold">
                {`"${member.specialAbility}"`}
              </p>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto text-center px-4">
              <h4 className="text-lg font-bold text-accent mb-2">Bio</h4>
              <p className="text-xs text-muted-foreground">{member.bio}</p>
            </CardContent>
            <div className="flex justify-center items-center gap-4 p-4 relative">
              {member.githubUrl && (
                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Github className="w-6 h-6" />
                </a>
              )}
              {member.linkedinUrl && (
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              <div className="absolute bottom-4 right-4 text-primary animate-pulse">
                  <UserSquare2 className="w-5 h-5" />
              </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
