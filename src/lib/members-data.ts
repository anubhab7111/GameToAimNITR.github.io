export interface Skill {
  name: string;
  level: number;
}

export type Year = 2022 | 2023 | 2024;

export interface Member {
  id: number;
  name: string;
  role: string;
  year: Year;
  image: string;
  aiHint: string;
  skills: Skill[];
  specialAbility: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export const members: Member[] = [
  // 2024
  {
    id: 2,
    name: 'Jax',
    role: 'President',
    year: 2024,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'confident leader',
    skills: [
      { name: 'Leadership', level: 98 },
      { name: 'Public Speaking', level: 90 },
      { name: 'Strategy', level: 92 },
    ],
    specialAbility: 'Rally the Troops',
    bio: 'The charismatic leader who sets the vision for the club. Can unite disparate teams with a single speech and always knows the next move.',
    githubUrl: '#',
    linkedinUrl: '#',
  },
  {
    id: 3,
    name: 'Vesper',
    role: 'Vice President',
    year: 2024,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'organized manager',
    skills: [
      { name: 'Organization', level: 99 },
      { name: 'Logistics', level: 95 },
      { name: 'Problem Solving', level: 93 },
    ],
    specialAbility: 'Master of Operations',
    bio: 'The logistical genius who keeps the club running like a well-oiled machine. If there\'s a problem, Vesper has already foreseen it and has a five-step plan to solve it.',
    githubUrl: '#',
    linkedinUrl: '#',
  },
  {
    id: 4,
    name: 'Glitch',
    role: 'Lead Programmer',
    year: 2024,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'hacker glasses',
    skills: [
      { name: 'C++', level: 95 },
      { name: 'Unity/C#', level: 90 },
      { name: 'Algorithms', level: 88 },
    ],
    specialAbility: 'Instant Debug',
    bio: 'Can write flawless code in their sleep and debug with their eyes closed. Rumored to communicate directly with computers via psychic link.',
    githubUrl: '#',
  },
    // 2023
  {
    id: 5,
    name: 'Vertex',
    role: 'Lead 3D Artist',
    year: 2023,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'artist beret',
    skills: [
      { name: 'Blender', level: 97 },
      { name: 'Texturing', level: 92 },
      { name: 'Animation', level: 85 },
    ],
    specialAbility: 'Brings Models to Life',
    bio: 'A digital sculptor who can turn a simple cube into a breathtaking character or environment. Lives and breathes polygons.',
    linkedinUrl: '#',
  },
  {
    id: 6,
    name: 'Cipher',
    role: 'Lead Game Designer',
    year: 2023,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'thoughtful designer',
    skills: [
      { name: 'Game Mechanics', level: 98 },
      { name: 'Level Design', level: 93 },
      { name: 'UX/UI', level: 89 },
    ],
    specialAbility: 'System Architect',
    bio: 'The mastermind behind the fun. Designs the intricate systems and compelling gameplay loops that make our games addictive and unforgettable.',
    githubUrl: '#',
  },
  {
    id: 7,
    name: 'Scribe',
    role: 'Lead Writer',
    year: 2023,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'writer book',
    skills: [
      { name: 'Storytelling', level: 99 },
      { name: 'World-Building', level: 96 },
      { name: 'Dialogue', level: 92 },
    ],
    specialAbility: 'Spins Epic Yarns',
    bio: 'Weaves narratives that capture the heart and imagination. Crafts the lore, characters, and quests that give our worlds soul.',
    linkedinUrl: '#',
  },
    // 2022
  {
    id: 1,
    name: 'Dr. Axiom',
    role: 'Faculty Advisor',
    year: 2022,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'wise professor',
    skills: [
      { name: 'Guidance', level: 100 },
      { name: 'Game Theory', level: 95 },
      { name: 'Funding', level: 80 },
    ],
    specialAbility: 'Unlocks Project Potential',
    bio: 'The wise sage of the club, guiding us through the treacherous lands of academia and project management. Has a legendary ability to find funding in the most unlikely places.',
    linkedinUrl: '#',
  },
  {
    id: 8,
    name: 'Byte',
    role: 'Backend Developer',
    year: 2022,
    image: 'https://placehold.co/400x400.png',
    aiHint: 'server room',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Databases', level: 85 },
      { name: 'API Design', level: 88 },
    ],
    specialAbility: 'Data Weaver',
    bio: 'The silent guardian of the server room. Ensures our game data flows smoothly and securely across the network.',
    githubUrl: '#',
  },
  {
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
  },
];

export const years: Year[] = [2024, 2023, 2022];
