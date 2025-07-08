'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Reset state when props change
    setDisplayedText('');
    setIsTyping(true);
    
    const startTypingTimeout = setTimeout(() => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          timeoutRef.current = setTimeout(type, speed);
        } else {
          setIsTyping(false);
        }
      };
      type();
    }, delay);

    return () => {
      clearTimeout(startTypingTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay]);

  return (
    <span className={cn('relative', className)}>
      {displayedText}
      {isTyping && <span className="terminal-caret-inline"></span>}
    </span>
  );
}
