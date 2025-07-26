import type { Member } from './types';

export const shard: Member = {
  id: 9,
  name: 'Shard',
  role: 'Environment Artist',
  year: 2022,
  image: 'https://placehold.co/400x400.png',
  aiHint: 'fantasy landscape',
  skills: [
    { name: 'ZBrush', level: 90 },
    { name: 'Substance Painter', level: 94 },
    { name: 'Lighting', level: 87 },
  ],
  specialAbility: 'World Crafter',
  bio: 'Builds the immersive worlds our players get lost in. From neon-drenched cities to enchanted forests, every detail is meticulously crafted.',
  linkedinUrl: '#',
};
