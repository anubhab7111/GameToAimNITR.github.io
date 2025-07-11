
'use client';

import { useState } from 'react';
import AchievementCard from '@/components/achievement-card';
import { achievements } from '@/lib/achievements-data';
import type { Achievement } from '@/lib/achievements-data';
import BioIDTerminal from '@/components/bio-id-terminal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function AchievementsSection() {
  const [decryptingAchievement, setDecryptingAchievement] = useState<Achievement | null>(null);
  const [modalAchievement, setModalAchievement] = useState<Achievement | null>(null);
  const [decryptionMessages, setDecryptionMessages] = useState<string[]>([]);

  const handleCardClick = (achievement: Achievement) => {
    setDecryptionMessages([]);
    setModalAchievement(null);
    setDecryptingAchievement(achievement);

    const messages = [
        "Accessing achievement record...",
        "Verifying credentials...",
        `Loading Holo-Clip: ${achievement.title.substring(0, 10)}... ███░░░░░░░`,
        `Decrypting stream... ███████░░░`,
        "STREAM ESTABLISHED.",
    ];

    let totalDelay = 0;
    messages.forEach((msg) => {
        const delay = (Math.random() * 150) + 150;
        totalDelay += delay;
        setTimeout(() => {
            setDecryptionMessages(prev => [...prev, msg]);
        }, totalDelay);
    });

    setTimeout(() => {
        setDecryptingAchievement(null);
        setModalAchievement(achievement);
    }, totalDelay + 200);
  };

  return (
    <>
      <section id="achievements" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Hall of Fame</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Celebrating the milestones and legendary feats of our members. Every achievement marks a step forward in our journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} onCardClick={handleCardClick} />
            ))}
          </div>
          <div className="mt-20 text-center">
            <BioIDTerminal />
          </div>
        </div>
      </section>

      {/* Decryption Dialog */}
      <Dialog open={!!decryptingAchievement} onOpenChange={(isOpen) => !isOpen && setDecryptingAchievement(null)}>
        <DialogContent className="max-w-md w-[90vw] bg-background backdrop-blur-sm border-accent/30 box-glow-accent font-code text-green-400">
            <DialogHeader>
                <DialogTitle className="text-accent text-glow-accent">ACCESSING HOLO-CLIP</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-2 text-sm">
                {decryptionMessages.map((msg, index) => (
                    <p key={index}>&gt; {msg}</p>
                ))}
                {decryptingAchievement && decryptionMessages.length < 5 && (
                    <p className="flex items-center">&gt; <span className="ml-2 w-2 h-4 bg-accent terminal-caret"></span></p>
                )}
            </div>
        </DialogContent>
      </Dialog>
      
      {/* Video Modal Dialog */}
      <Dialog open={!!modalAchievement} onOpenChange={(isOpen) => !isOpen && setModalAchievement(null)}>
        {modalAchievement && (
          <DialogContent className="max-w-4xl w-[90vw] bg-background backdrop-blur-sm border-primary/30 box-glow-primary">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-glow-primary">{modalAchievement.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 text-base">
                Achievement unlocked! View the holographic record of this accomplishment.
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video rounded-lg overflow-hidden border border-primary/20 mt-4">
              <iframe
                className="w-full h-full"
                src={modalAchievement.videoUrl}
                title={`Video for ${modalAchievement.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
