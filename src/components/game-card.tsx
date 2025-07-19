
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Game } from '@/lib/games-data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { games } from '@/lib/games-data';

interface GameCardProps {
  game: Game;
  isVisible: boolean;
  index: number;
  onClick: (game: Game) => void;
  onMouseEnter: () => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export default function GameCard({ game, isVisible, index, onClick, onMouseEnter, isHovered, isDimmed }: GameCardProps) {
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
      onClick={() => onClick(game)}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative aspect-[3/4] w-full group",
        'transition-all duration-300 ease-in-out',
        getTransformOrigin(index),
        !isVisible || !isMounted ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
        isHovered && 'scale-105 z-10',
        isDimmed && 'scale-90 opacity-50',
      )}
      style={{ transitionDelay: `${index * 30}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(game)}
      aria-label={`View details for ${game.title}`}
    >
      <div className="cyber-card-container h-full w-full">
        <div className={cn(
            "cyber-card-content flex flex-col transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: `${(index * 30) + 100}ms`}}
        >
          <div className="relative w-full aspect-[4/3] cyber-card-shimmer" style={{ clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)' }}>
            <Image
              src={game.image}
              alt={game.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500"
              data-ai-hint={game.aiHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-80 transition-opacity duration-300" />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center">
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
