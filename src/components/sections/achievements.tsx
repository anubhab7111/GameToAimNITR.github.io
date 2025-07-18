
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
          <div className="mt-8 w-full h-8 relative flex items-center">
              {/* Track Background */}
              <div className="absolute left-0 top-1/2 w-full h-1 bg-border/20 -translate-y-1/2" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-border/20" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-border/20" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
              
              {/* Progress Fill */}
              <motion.div 
                  className="absolute left-0 top-0 h-full"
                  style={{ width: progressBarWidth }}
              >
                  <div className="w-full h-full relative overflow-hidden">
                      {/* Main progress line */}
                      <div className="absolute left-0 top-1/2 w-full h-1 bg-primary box-glow-primary -translate-y-1/2" />
                      
                      {/* Left terminal */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />

                      {/* Right-side glowing head */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                        <div className="w-4 h-4 bg-primary box-glow-primary" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                        <div className="w-3 h-8 bg-primary/80 -translate-x-2" style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)'}} />
                      </div>
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
