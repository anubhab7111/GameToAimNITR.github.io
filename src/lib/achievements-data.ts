export interface Achievement {
  title: string;
  description: string;
  image: string;
  aiHint: string;
  xp: number;
  progress: number;
  videoUrl: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Code Jam Champion',
    description: 'Secured first place in the annual intra-college Code Jam, solving all problems with record-breaking speed.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'programming trophy',
    xp: 500,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Unreal Engine Virtuoso',
    description: 'Mastered Unreal Engine 5 by completing an advanced 8-week workshop on realistic environment design.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'game engine',
    xp: 350,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Game-a-Thon Survivor',
    description: 'Successfully developed and presented a game prototype in the 48-hour Game-a-Thon challenge.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'game development',
    xp: 250,
    progress: 75,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Community Contributor',
    description: 'Mentored five junior members, helping them complete their first game development projects.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'team collaboration',
    xp: 400,
    progress: 50,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'VR Pioneer',
    description: 'Created the club\'s first fully-functional VR experience, showcased at the annual tech fest.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'vr headset',
    xp: 450,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Bug Squasher',
    description: 'Identified and fixed over 50 bugs in various club projects during a single semester.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'computer bug',
    xp: 300,
    progress: 90,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];
