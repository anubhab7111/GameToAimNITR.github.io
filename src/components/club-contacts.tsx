
'use client';

import { Mail, Phone, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const contacts = [
  {
    role: 'President',
    name: 'Jax',
    email: 'president@gta.nitt.edu',
    phone: '+91-9876543210',
  },
  {
    role: 'Vice President',
    name: 'Vesper',
    email: 'vp@gta.nitt.edu',
    phone: '+91-9876543211',
  },
  {
    role: 'Secretary',
    name: 'Cipher',
    email: 'secretary@gta.nitt.edu',
    phone: '+91-9876543212',
  },
  {
    role: 'Treasurer',
    name: 'Vertex',
    email: 'treasurer@gta.nitt.edu',
    phone: '+91-9876543213',
  },
];

export default function ClubContacts() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
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


  return (
    <section ref={sectionRef} id="club-contacts" className="py-16 md:py-24 bg-background/80 backdrop-blur-sm border-t border-border/40 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow-accent">Contact Directory</h2>
          <p className="mt-3 text-md text-muted-foreground max-w-2xl mx-auto">
            Direct interface to club leadership. Please use for official inquiries only.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <div
              key={contact.role}
              className={cn(
                'animate-entry animate-slide-up-fade',
                { 'is-visible': isVisible }
              )}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <div className="contact-card-container group h-full">
                <div className="contact-card-content flex flex-col">
                  <div className="p-6 text-center flex-grow">
                    <div className="mb-4">
                        <User className="h-10 w-10 text-primary mx-auto transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-primary transition-colors duration-300 group-hover:text-accent">{contact.role}</h3>
                    <p className="text-lg font-semibold text-foreground">{contact.name}</p>
                  </div>
                  <div className="border-t-2 border-dashed border-primary/20 px-6 py-4 space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                      <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-accent transition-colors break-all">{contact.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                      <a href={`tel:${contact.phone}`} className="text-muted-foreground hover:text-accent transition-colors">{contact.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
