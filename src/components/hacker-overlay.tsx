
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Typewriter from '@/components/typewriter';

const sequence = [
  { id: 1, text: '> Booting renderer...\n> Drawing cityscape...', duration: 2000 },
  { id: 2, text: '> Compiling H1 header...', duration: 1500 },
  { id: 3, text: '> Loading sub-routines...', duration: 1500 },
  { id: 4, text: '> Mounting UI components...', duration: 2000 },
  { id: 5, text: '> Sequence complete. Welcome.', duration: 1000 },
];

interface HackerOverlayProps {
  onStateChange: (state: number) => void;
  onSequenceComplete: () => void;
}

export default function HackerOverlay({ onStateChange, onSequenceComplete }: HackerOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    onStateChange(currentStep);

    if (currentStep >= sequence.length) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        onSequenceComplete();
      }, 1000); // Match fade-out duration
      return () => clearTimeout(timer);
    }

    const currentItem = sequence[currentStep];
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, currentItem.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onStateChange, onSequenceComplete]);
  
  const displayedLines = sequence.slice(0, currentStep);

  return (
    <div className={cn('hacker-overlay', { 'is-fading-out': isFadingOut })}>
      <div className="p-8 text-lg text-accent">
        {displayedLines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.text}
          </div>
        ))}
        {currentStep < sequence.length && (
            <div className="whitespace-pre-wrap">
                <Typewriter text={sequence[currentStep].text} speed={25} />
            </div>
        )}
      </div>
    </div>
  );
}
