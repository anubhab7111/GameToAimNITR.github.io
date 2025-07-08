'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccessShowcaseButton() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      router.push('/showcase');
    }, 700); // Corresponds to the animation duration
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className={cn(
        'font-bold text-lg tracking-wider border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:box-glow-accent transition-all duration-300',
        { 'animate-data-plug-in': isAnimating }
      )}
      onClick={handleClick}
      disabled={isAnimating}
    >
      <Box className="mr-3 h-5 w-5" />
      Explore Asset Showcase
    </Button>
  );
}
