
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Game } from '@/lib/games-data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { games } from '@/lib/games-data';
import Typewriter from '@/components/typewriter';

interface GameCardProps {
  game: Game;
  isVisible: boolean;
  index: number;
  onClick: (game: Game) => void;
}

export default function GameCard({ game, isVisible, index, onClick }: GameCardProps) {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Start typing after the card content has faded in.
      // Card scale (500ms) + content fade-in delay (500ms) + content fade-in duration (300ms)
      const timer = setTimeout(() => {
        setStartTyping(true);
      }, (index * 50) + 500 + 300);
      return () => clearTimeout(timer);
    } else {
      setStartTyping(false);
    }
  }, [isVisible, index]);

  const getTransformOrigin = (i: number) => {
    if (!isMounted) return 'origin-center';

    const cols = isMobile ? 2 : 4;
    const numRows = Math.ceil(games.length / cols);
    const row = Math.floor(i / cols);

    if (row < numRows / 2 - 0.5) {
      return 'origin-bottom';
    }
    if (row > numRows / 2 - 0.5) {
      return 'origin-top';
    }
    return 'origin-center';
  };
  
  return (
    <div
      onClick={() => onClick(game)}
      className={cn(
        "group relative aspect-[3/4] w-full transition-all duration-300 hover:scale-105 hover:-rotate-1",
        'transition-[transform,opacity] duration-500 ease-out',
        getTransformOrigin(index),
        !isVisible || !isMounted ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(game)}
      aria-label={`View details for ${game.title}`}
    >
      <div className="cyber-card-container h-full w-full">
        <div className={cn(
            "cyber-card-content transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: `${(index * 50) + 500}ms`}}
        >
          <div className="relative h-full w-full cyber-card-shimmer">
            <Image
              src={game.image}
              alt={game.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={game.aiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="font-bold text-lg text-foreground text-glow-accent transition-all duration-300 group-hover:text-primary group-hover:text-glow-primary">
                {startTyping ? (
                  <Typewriter text={game.title} />
                ) : (
                  <>&nbsp;</>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
