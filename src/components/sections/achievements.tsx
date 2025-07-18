
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/achievements-data';

export default function AchievementsSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],

  });

  useEffect(() => {
    if (carouselRef.current) {
      const parentWidth = carouselRef.current.parentElement?.offsetWidth || 0;
      const scrollWidth = carouselRef.current.scrollWidth;
      setCarouselWidth(scrollWidth - parentWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0.2, 0.9], [0, -carouselWidth]);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={targetRef} id="achievements" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div
          className="container mx-auto px-4 md:px-16 pt-16 md:pt-24 relative z-10"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
              Hall of Fame
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              At <span className="text-primary font-bold">GAME TO AIM</span>, our projects are our pride. The work we do ranges from games and applications to interactive experiences. The most recent achievements are listed below.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-16 relative z-10">
          <div className="mt-8 w-full h-4 relative">
              {/* Track */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border/30 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-8 h-8 -translate-y-1/2 rounded-full border-2 border-border/30"></div>
              <div className="absolute top-1/2 right-0 w-8 h-8 -translate-y-1/2 rounded-full border-2 border-border/30"></div>
              
              {/* Progress */}
              <motion.div 
                  className="absolute top-0 left-0 h-full"
                  style={{ width: progressBarWidth }}
              >
                  <div className="w-full h-full relative overflow-hidden">
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary box-glow-primary -translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-0 w-8 h-8 -translate-y-1/2 rounded-full border-2 border-primary box-glow-primary bg-background"></div>
                  </div>
              </motion.div>
          </div>
        </div>

        <motion.div ref={carouselRef} style={{ x }} className="flex gap-6 mt-12 pl-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative h-[300px] w-[80vw] sm:h-[300px] sm:w-[450px] flex-shrink-0"
            >
              <div className="overflow-hidden rounded-lg border border-border/20 cyber-card-shimmer h-full w-full">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  sizes="(max-width: 640px) 80vw, 450px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={achievement.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 pb-10 pl-6">
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
