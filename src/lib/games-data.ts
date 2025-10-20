
import placeholderImages from '@/lib/placeholder-images.json';

export interface Game {
  title: string;
  description: string;
  image: string;
  aiHint: string;
}

export const games: Game[] = [
  {
    title: 'CampusSurvivalVR',
    description: 'An immersive VR survival game on a photorealistic 3D campus, featuring visceral physics combat, all built with Unity.',
    image: placeholderImages.games.campusSurvivalVR,
    aiHint: 'zombie apocalypse campus'
  },
  {
    title: 'CampusQuestVR',
    description: 'A VR treasure hunt game set in our campus environment where players collect clues and solve riddles.',
    image: placeholderImages.games.campusQuestVR,
    aiHint: 'treasure map campus'
  },
  {
    title: 'NeonRush',
    description: 'Advanced force-based physics with damage, dynamic LOD environments, and intense neon conditions via custom bloom and volumetric lighting.',
    image: placeholderImages.games.neonRush,
    aiHint: 'neon city car'
  },
];
