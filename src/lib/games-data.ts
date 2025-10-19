
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
  },
  {
    title: 'CampusQuestVR',
    description: 'A VR treasure hunt game set in our campus environment where players collect clues and solve riddles.'
  },
  {
    title: 'NeonRush',
    description: 'Advanced force-based physics with damage, dynamic LOD environments, and intense neon conditions via custom bloom and volumetric lighting.',
  },
];
