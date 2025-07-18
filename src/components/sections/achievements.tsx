
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/achievements-data';

export default function AchievementsSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1rem", "calc(-100% + 100vw - 1rem)"]);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={targetRef} id="achievements" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Static Content: Title, Description, and Progress Bar */}
        <div className="container mx-auto px-4 md:px-16 pt-16 md:pt-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
            Hall of Fame
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            At <span className="text-primary font-bold">GAME TO AIM</span>, our projects are our pride. The work we do ranges from games and applications to interactive experiences. The most recent achievements are listed below.
          </p>
          <div className="mt-8 h-1 w-full bg-border/30 rounded-full">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: progressBarWidth }}
            />
          </div>
        </div>

        {/* Horizontally Scrolling Carousel */}
        <motion.div style={{ x }} className="flex gap-6 mt-12">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative h-[300px] w-[450px] sm:h-[400px] sm:w-[600px] flex-shrink-0"
            >
              <div className="overflow-hidden rounded-lg border border-border/20 cyber-card-shimmer h-full w-full">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 600px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={achievement.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    XP GAINED: {achievement.xp}
                  </p>
                  <h3 className="text-xl sm:text-3xl font-bold text-foreground transition-colors group-hover:text-accent">
                    {achievement.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
