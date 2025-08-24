
'use client';

import { useState, useEffect } from 'react';
import type { Game } from '@/lib/games-data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { games } from '@/lib/games-data';

interface GameCardProps {
  game: Game;
  isVisible: boolean;
  index: number;
  onMouseEnter: () => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export default function GameCard({ game, isVisible, index, onMouseEnter, isHovered, isDimmed }: GameCardProps) {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTransformOrigin = (i: number) => {
    if (!isMounted) return 'origin-center';

    const cols = isMobile ? 2 : 5; // Adjusted to 5 to match games section
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
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative w-full group h-full",
        'transition-all duration-300 ease-in-out',
        getTransformOrigin(index),
        !isVisible || !isMounted ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
        isHovered && 'scale-105 z-10',
        isDimmed && 'scale-90 opacity-50',
      )}
      style={{ transitionDelay: `${index * 30}ms` }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${game.title}`}
    >
      <div className="cyber-card-container h-full w-full">
        <div className={cn(
            "cyber-card-content flex flex-col justify-center transition-opacity duration-300 p-4",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: `${(index * 30) + 100}ms`}}
        >
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-bold text-lg md:text-xl text-primary text-glow-primary transition-all duration-300 group-hover:text-accent">
                {game.title}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
                {game.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
