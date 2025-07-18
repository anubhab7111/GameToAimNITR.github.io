
'use client';

import { games } from '@/lib/games-data';
import type { Game } from '@/lib/games-data';
import GameCard from '@/components/game-card';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Github, Users } from 'lucide-react';

export default function GamesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
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
  };

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

      <Dialog open={!!selectedGame} onOpenChange={(isOpen) => !isOpen && setSelectedGame(null)}>
        {selectedGame && (
          <DialogContent className="max-w-4xl w-[90vw] bg-background/50 backdrop-blur-sm border-primary/30 box-glow-primary text-foreground">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-glow-primary">{selectedGame.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 text-base">
                {selectedGame.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4 max-h-[70vh] overflow-y-auto pr-4">
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden border border-primary/20">
                  <iframe
                    className="w-full h-full"
                    src={selectedGame.videoUrl}
                    title={`Video for ${selectedGame.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-muted-foreground">{selectedGame.longDescription}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-accent mb-4">Tech Stack</h4>
                  <div className="space-y-4">
                    {selectedGame.techStack.map((tech) => (
                      <div key={tech.name} className="flex items-start gap-4">
                        <div className="p-2 bg-card rounded-md border border-border mt-1">
                          <tech.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">{tech.name}</p>
                          <p className="text-sm text-muted-foreground">{tech.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-4">Project Details</h4>
                  <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-foreground w-24">Status:</span>
                       <span className={`inline-flex items-center gap-2 font-semibold ${
                          selectedGame.status === 'Released' ? 'text-green-400' :
                          selectedGame.status === 'Beta' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                           <span className={`w-2.5 h-2.5 rounded-full ${
                          selectedGame.status === 'Released' ? 'bg-green-500' :
                          selectedGame.status === 'Beta' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></span>
                        {selectedGame.status}
                       </span>
                    </div>
                     <div className="flex items-center gap-4">
                      <span className="font-bold text-foreground w-24">Active Devs:</span>
                      <span className="flex items-center gap-2">
                         <Users className="w-4 h-4" />
                         {selectedGame.activeDevs}
                      </span>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <a href={selectedGame.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
