
import placeholderImages from '@/lib/placeholder-images.json';

export interface Game {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  aiHint: string;
  techStack: string[];
  developers: string[];
}

export const games: Game[] = [
  {
    title: 'CampusSurvivalVR',
    description: 'Immersive VR survival on a photorealistic campus.',
    longDescription: 'An immersive VR survival game on a photorealistic 3D campus, featuring visceral physics combat, all built with Unity. Fight your way through familiar locations and uncover the secrets behind the outbreak.',
    image: placeholderImages.games.campusSurvivalVR,
    aiHint: 'zombie apocalypse campus',
    techStack: ['Unity', 'C#', 'Oculus SDK', 'Blender'],
    developers: ['Jax', 'Glitch', 'Vertex'],
  },
  {
    title: 'CampusQuestVR',
    description: 'A VR treasure hunt across campus.',
    longDescription: 'A VR treasure hunt game set in our campus environment where players collect clues and solve riddles to find a hidden treasure. Explores innovative uses of VR for puzzle-solving.',
    image: placeholderImages.games.campusQuestVR,
    aiHint: 'treasure map campus',
    techStack: ['Unity', 'C#', 'SteamVR', 'Figma'],
    developers: ['Vesper', 'Cipher'],
  },
  {
    title: 'NeonRush',
    description: 'Advanced physics-based racer with dynamic visuals.',
    longDescription: 'Advanced force-based physics with damage, dynamic LOD environments, and intense neon conditions via custom bloom and volumetric lighting. A high-speed, high-stakes racing experience.',
    image: placeholderImages.games.neonRush,
    aiHint: 'neon city car',
    techStack: ['Unreal Engine', 'C++', 'Niagara', 'Houdini'],
    developers: ['Glitch', 'Byte', 'Shard'],
  },
];
