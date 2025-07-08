
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';

interface Event {
  date: string;
  title: string;
  description: string;
}

const events: Event[] = [
  {
    date: 'Oct 2024',
    title: 'Cyberpunk Game Jam',
    description: 'A 48-hour marathon to create a game based on a secret cyberpunk theme. Prizes and glory await!',
  },
  {
    date: 'Nov 2024',
    title: 'Workshop: Intro to Unreal Engine 5',
    description: 'Learn the fundamentals of UE5, from blueprint scripting to creating stunning visuals with Lumen.',
  },
  {
    date: 'Jan 2025',
    title: 'AI in Games Hackathon',
    description: 'Team up to develop innovative AI-driven game mechanics. Mentors and industry experts will be present.',
  },
  {
    date: 'Mar 2025',
    title: 'Annual Game Showcase',
    description: 'Our biggest event of the year! Members showcase their projects to students, faculty, and industry professionals.',
  },
];

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [decryptingEvent, setDecryptingEvent] = useState<Event | null>(null);
  const [decryptionMessages, setDecryptionMessages] = useState<string[]>([]);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = eventRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleEventClick = (event: Event) => {
    setDecryptionMessages([]);
    setSelectedEvent(null);
    setDecryptingEvent(event);

    const messages = [
        "Accessing event logs...",
        `Locating entry: ${event.title} ███░░░░░░░ 30%`,
        `Decrypting... ███████░░░ 70%`,
        "DATA RETRIEVED.",
    ];

    let totalDelay = 0;
    messages.forEach((msg) => {
        const delay = (Math.random() * 100) + 100;
        totalDelay += delay;
        setTimeout(() => {
            setDecryptionMessages(prev => [...prev, msg]);
        }, totalDelay);
    });

    setTimeout(() => {
        setDecryptingEvent(null);
        setSelectedEvent(event);
    }, totalDelay + 200);
  };


  return (
    <>
      <section id="events" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Club Timeline</h2>
            <p className="mt-4 text-lg text-muted-foreground">Join our game jams, workshops, and hackathons.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-border md:-translate-x-1/2"></div>
            {events.map((event, index) => (
              <div
                key={event.title}
                ref={(el) => (eventRefs.current[index] = el)}
                className="relative mb-12 pl-8 md:pl-0 animate-entry"
              >
                <div className={cn('flex items-center', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                  <div className="md:w-1/2 md:px-4">
                    <div
                      onClick={() => handleEventClick(event)}
                      className="p-6 rounded-lg border-2 border-primary/20 bg-card backdrop-blur-sm shadow-lg hover:border-primary transition-all duration-300 event-card-clickable"
                    >
                      <p className="text-primary font-semibold mb-1">{event.date}</p>
                      <h3 className="text-2xl font-bold mb-2 text-accent">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
                <div className="absolute left-0 top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background box-glow-primary"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decryption Dialog */}
      <Dialog open={!!decryptingEvent} onOpenChange={(isOpen) => !isOpen && setDecryptingEvent(null)}>
        <DialogContent className="max-w-md w-[90vw] bg-background backdrop-blur-sm border-accent/30 box-glow-accent font-code text-green-400">
            <DialogHeader>
                <DialogTitle className="text-accent text-glow-accent">ACCESSING DATA</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-2 text-sm">
                {decryptionMessages.map((msg, index) => (
                    <p key={index}>&gt; {msg}</p>
                ))}
                {decryptingEvent && decryptionMessages.length < 4 && (
                    <p className="flex items-center">&gt; <span className="ml-2 w-2 h-4 bg-accent terminal-caret"></span></p>
                )}
            </div>
        </DialogContent>
      </Dialog>
      
      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="bg-background backdrop-blur-sm border-accent/30 box-glow-accent">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-glow-primary flex items-center gap-4">
                <Calendar className="w-6 h-6 text-primary" />
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 text-base text-left">
                <strong>Date:</strong> {selectedEvent.date}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-left">
              <p>{selectedEvent.description}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
