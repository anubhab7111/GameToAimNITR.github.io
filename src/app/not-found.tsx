import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4">
      <h1
        className="text-8xl md:text-9xl font-bold tracking-wider text-glow-primary glitch-layers"
        data-text="404"
      >
        404
      </h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-muted-foreground">
        Connection Lost
      </h2>
      <p className="mt-2 max-w-md text-foreground/80">
        The signal seems to have dropped. The page you were looking for has either been moved or doesn't exist in this sector.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Homebase</Link>
      </Button>
    </div>
  );
}
