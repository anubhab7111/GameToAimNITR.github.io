'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/achievements-data';

export default function AchievementsSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [progressBarContainerWidth, setProgressBarContainerWidth] = useState(0);

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
    if (progressBarRef.current) {
      setProgressBarContainerWidth(progressBarRef.current.offsetWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0.2, 0.9], [0, -carouselWidth]);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headX = useTransform(scrollYProgress, [0, 1], [0, progressBarContainerWidth]);


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

        {/* Enhanced Cyberpunk Progress Bar */}
        <div className="container mx-auto px-4 md:px-16 relative z-10">
          <div ref={progressBarRef} className="mt-8 w-full h-12 relative flex items-center">
            {/* Outer Container with Cyber Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/10 to-transparent rounded-sm">
              <div className="absolute inset-0 border border-border/30 rounded-sm" style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.1) 50%, transparent 100%)'
              }} />
            </div>
            
            {/* Track Background */}
            <div className="absolute left-4 right-4 top-1/2 h-2 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 -translate-y-1/2 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rounded-full" />
            </div>
            
            {/* Left Terminal */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary/30 to-primary/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
            </div>
            
            {/* Right Terminal */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-border/30 to-border/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-border/70 rounded-full" />
            </div>
              
            {/* Progress Fill */}
            <motion.div 
              className="absolute left-4 top-1/2 h-2 -translate-y-1/2"
              style={{ width: progressBarWidth }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-full">
                {/* Main progress line with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                </div>
                
                {/* Animated scanning effect */}
                <motion.div 
                  className="absolute top-0 right-0 w-6 h-full bg-gradient-to-r from-transparent to-white/40 rounded-full"
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Progress Head */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
              style={{ x: headX }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-primary to-transparent -ml-2" />
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
