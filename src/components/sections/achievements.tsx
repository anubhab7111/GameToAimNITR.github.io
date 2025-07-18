
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { achievements } from '@/lib/achievements-data';
import type { Achievement } from '@/lib/achievements-data';
import BioIDTerminal from '@/components/bio-id-terminal';

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const scrollProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setProgress(scrollProgress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="achievements" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
            Hall of Fame
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            At <span className="text-primary font-bold">GAME TO AIM</span>, our projects are our pride. The work we do ranges from games and applications to interactive experiences. The most recent achievements are listed below.
          </p>
        </div>

        <div className="relative">
          <div className="w-full h-1 bg-border/50 rounded-full mb-4">
            <div
              className="h-1 rounded-full bg-accent"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
          </div>
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="snap-start flex-shrink-0 w-80 md:w-96 group"
              >
                <div className="overflow-hidden rounded-lg border border-border/20 cyber-card-shimmer">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    width={600}
                    height={400}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={achievement.aiHint}
                  />
                </div>
                <div className="pt-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    XP GAINED: {achievement.xp}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {achievement.title}
                  </h3>
                </div>
              </div>
            ))}
            <div className="snap-start flex-shrink-0 w-80 md:w-96 flex items-center justify-center">
               <a href="#" className="group">
                  <span className="text-xl font-bold uppercase tracking-widest text-accent transition-all group-hover:text-glow-accent border-b-2 border-accent/50 group-hover:border-accent pb-1">
                      View Full Archives
                  </span>
                  <span className="ml-2 text-2xl font-bold text-accent transition-all group-hover:text-glow-accent">&gt;</span>
               </a>
            </div>
          </div>
        </div>
        
        <div id="member-access" className="mt-32 text-center">
            <BioIDTerminal />
        </div>
      </div>
    </section>
  );
}
