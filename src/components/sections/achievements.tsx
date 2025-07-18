
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/achievements-data';
import BioIDTerminal from '@/components/bio-id-terminal';

export default function AchievementsSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-80%"]);

  return (
    <section ref={targetRef} id="achievements" className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-8">
                <div className="w-screen flex-shrink-0 flex flex-col justify-center px-4 md:px-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
                        Hall of Fame
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
                        At <span className="text-primary font-bold">GAME TO AIM</span>, our projects are our pride. The work we do ranges from games and applications to interactive experiences. The most recent achievements are listed below.
                    </p>
                </div>
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="group relative h-[400px] w-[600px] flex-shrink-0"
                    >
                        <div className="overflow-hidden rounded-lg border border-border/20 cyber-card-shimmer h-full w-full">
                            <Image
                                src={achievement.image}
                                alt={achievement.title}
                                fill
                                sizes="600px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={achievement.aiHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                                    XP GAINED: {achievement.xp}
                                </p>
                                <h3 className="text-3xl font-bold text-foreground transition-colors group-hover:text-accent">
                                    {achievement.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex-shrink-0 w-[40vw] flex items-center justify-center">
                    <a href="#" className="group">
                        <span className="text-2xl font-bold uppercase tracking-widest text-accent transition-all group-hover:text-glow-accent border-b-2 border-accent/50 group-hover:border-accent pb-1">
                            View Full Archives
                        </span>
                        <span className="ml-3 text-3xl font-bold text-accent transition-all group-hover:text-glow-accent">&gt;</span>
                    </a>
                </div>
            </motion.div>
        </div>
        <div id="member-access" className="absolute bottom-0 w-full pb-24">
            <div className="container mx-auto px-4">
                <BioIDTerminal />
            </div>
        </div>
    </section>
  );
}
