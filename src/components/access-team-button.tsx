
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccessTeamButton() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      router.push('/members');
    }, 700); // Corresponds to the animation duration
  };

  return (
    <Button
      size="lg"
      className={cn(
        'font-bold text-lg tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:box-glow-primary transition-all duration-300',
        { 'animate-data-plug-in': isAnimating }
      )}
      onClick={handleClick}
      disabled={isAnimating}
    >
      <Database className="mr-3 h-5 w-5" />
      Access Team Database
    </Button>
  );
}
