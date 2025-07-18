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
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const onResize = () => {
      if (carouselRef.current) {
        const parentWidth = carouselRef.current.parentElement?.offsetWidth || 0;
        const scrollWidth = carouselRef.current.scrollWidth;
        // Calculate the total scrollable width
        const newCarouselWidth = scrollWidth - parentWidth;
        setCarouselWidth(newCarouselWidth);
      }
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -carouselWidth]);

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [progressBarContainerWidth, setProgressBarContainerWidth] = useState(0);

  useEffect(() => {
    if (progressBarRef.current) {
      setProgressBarContainerWidth(progressBarRef.current.offsetWidth);
    }
  }, []);

  return (
    <section ref={targetRef} id="achievements" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-16 pt-16 md:pt-24 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
              Hall of Fame
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              At <span className="text-primary font-bold">GAME TO AIM</span>, our projects are our pride. The work we do ranges from games and applications to interactive experiences. The most recent achievements are listed below.
            </p>
          </div>
        </div>

        {/* Enhanced Cyberpunk Progress Bar */}
        <div className="container mx-auto px-4 md:px-16 relative z-10">
          <div ref={progressBarRef} className="mt-8 w-full h-12 relative flex items-center">
            {/* 1. Track Container */}
            <div className="absolute w-full h-8 top-1/2 -translate-y-1/2 bg-border/10 rounded-full border border-border/20" />
            
            {/* 2. Track Background */}
            <div className="absolute left-4 right-4 top-1/2 h-2 bg-black/30 -translate-y-1/2 rounded-full" />
            
            {/* 3. Terminals */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-secondary/40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-secondary" />
            </div>

            {/* 4. Progress Fill */}
            <motion.div
              className="absolute left-4 right-4 top-1/2 h-2 -translate-y-1/2 rounded-full"
              style={{
                width: useTransform(progressBarWidth, v => `calc(${v}% - 32px)`),
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)' }}
              />
            </motion.div>

            {/* 5. Progress Head */}
            <motion.div 
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center"
              style={{ x: useTransform(progressBarWidth, v => (progressBarContainerWidth - 24) * (v / 100)) }}
            >
              {/* Main head circle */}
              <div className="w-6 h-6 rounded-full border-2 border-primary/50 bg-gradient-radial from-accent/80 to-primary/80 flex items-center justify-center shadow-lg shadow-accent/30">
                {/* Inner white dot */}
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              {/* Emitter line */}
              <div className="w-3 h-0.5 bg-primary -translate-x-1" />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Achievement Cards */}
        <motion.div ref={carouselRef} style={{ x }} className="flex gap-8 mt-16 pl-16">
          {achievements.map((achievement, index) => (
             <div key={index} className="group relative h-[350px] w-[280px] md:h-[400px] md:w-[320px] flex-shrink-0">
               <div className="cyber-card-container h-full w-full">
                 <div className="cyber-card-content flex flex-col bg-opacity-70">
                  <div className="relative w-full h-48 cyber-card-shimmer" style={{ clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)' }}>
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={achievement.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-primary text-glow-primary transition-all duration-300 group-hover:text-accent mb-2">
                        {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow">
                        {achievement.description}
                    </p>
                  </div>
                 </div>
               </div>
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
