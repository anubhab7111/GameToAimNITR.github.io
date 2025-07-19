
'use client';

import { games } from '@/lib/games-data';
import type { Game } from '@/lib/games-data';
import GameCard from '@/components/game-card';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Github, Users, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function GamesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleCardClick = (game: Game) => {
    setSelectedGame(game);
    setIsDialogOpen(true);
  };
  
  const handleDialogChange = (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) {
          // Add a delay to allow the dialog to animate out before resetting the game
          setTimeout(() => {
              setSelectedGame(null);
          }, 300);
      }
  }

  return (
    <>
      <section
        id="games"
        ref={sectionRef}
        className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 parallax-section overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Game Archives</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our complete library of digital worlds. Click on any project to see the details.
          </p>
        </div>

        <div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              game={game}
              isVisible={isVisible}
              index={index}
              onClick={handleCardClick}
              onMouseEnter={() => setHoveredIndex(index)}
              isHovered={hoveredIndex === index}
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
            />
          ))}
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        {selectedGame && (
          <DialogContent className="max-w-4xl w-[90vw] bg-background/50 backdrop-blur-sm border-primary/30 box-glow-primary text-foreground">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-glow-primary">{selectedGame.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 text-base">
                {selectedGame.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 max-h-[70vh] overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Image */}
              <div className={cn("relative w-full aspect-video lg:aspect-square rounded-lg overflow-hidden border border-primary/20 animate-entry animate-fade-in", { 'is-visible': isDialogOpen })} style={{ animationDelay: '100ms' }}>
                <Image
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                  data-ai-hint={selectedGame.aiHint}
                />
              </div>

              {/* Right Column: Details */}
              <div className="flex flex-col gap-6">
                <div className={cn("flex flex-col items-start gap-4 text-left animate-entry animate-slide-up-fade", { 'is-visible': isDialogOpen })} style={{ animationDelay: '200ms' }}>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-lg">Developed by</h4>
                  </div>
                  <div className="flex flex-wrap justify-start gap-2">
                    {selectedGame.developers.map((dev) => (
                      <Badge key={dev} variant="secondary" className="text-sm">{dev}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div className={cn("flex items-center gap-2 animate-entry animate-slide-up-fade", { 'is-visible': isDialogOpen })} style={{ animationDelay: '300ms' }}>
                    <Code className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-lg text-left">Tech Stack</h4>
                  </div>
                  {selectedGame.techStack.map((tech, index) => (
                    <div 
                      key={tech.name} 
                      className={cn("p-3 bg-card/50 rounded-lg border border-border flex items-start gap-4 animate-entry animate-slide-up-fade", { 'is-visible': isDialogOpen })}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="p-2 bg-background rounded-md border border-primary/20 mt-1">
                          <tech.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                          <h5 className="font-bold text-base text-primary-foreground">{tech.name}</h5>
                          <p className="text-sm text-muted-foreground">{tech.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cn("mt-auto animate-entry animate-fade-in", { 'is-visible': isDialogOpen })} style={{ animationDelay: '600ms' }}>
                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <a href={selectedGame.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
