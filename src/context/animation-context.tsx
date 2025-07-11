
'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AnimationContextType {
  sequenceState: number;
  setSequenceState: Dispatch<SetStateAction<number>>;
  sequenceComplete: boolean;
  setSequenceComplete: Dispatch<SetStateAction<boolean>>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [sequenceState, setSequenceState] = useState(0);
  // Set sequenceComplete to true to bypass the animation for debugging.
  const [sequenceComplete, setSequenceComplete] = useState(true);

  return (
    <AnimationContext.Provider value={{ sequenceState, setSequenceState, sequenceComplete, setSequenceComplete }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
