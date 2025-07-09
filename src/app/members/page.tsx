'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { Button } from '@/components/ui/button';
import MemberCard from '@/components/member-card';
import { members, years } from '@/lib/members-data';
import type { Year } from '@/lib/members-data';
import { cn } from '@/lib/utils';

export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<Year | 'All'>('All');
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to top on page load
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  const filteredMembers = useMemo(() => members.filter(member => 
    activeFilter === 'All' || member.year === activeFilter
  ), [activeFilter]);

  return (
    <section id="members" className="py-16 md:py-24 parallax-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Meet the Team</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            The architects of our worlds. A collective of creators, thinkers, and innovators pushing the boundaries of gaming.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <Button
            variant={activeFilter === 'All' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('All')}
            className={cn(
              "border-primary/50 hover:bg-primary/90",
              activeFilter === 'All' && "bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground border-tertiary"
            )}
          >
            All Members
          </Button>
          {years.map(year => (
            <Button
              key={year}
              variant={activeFilter === year ? 'default' : 'outline'}
              onClick={() => setActiveFilter(year)}
              className={cn(
                "border-primary/50 hover:bg-primary/90",
                activeFilter === year && "bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground border-tertiary"
              )}
            >
              {`Batch of ${year}`}
            </Button>
          ))}
        </div>

        <div className="member-grid">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
