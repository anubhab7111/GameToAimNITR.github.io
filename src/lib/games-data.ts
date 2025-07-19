
import type { ComponentType, SVGProps } from "react";
import { Code2 } from 'lucide-react';

import { UnrealEngineIcon } from '@/components/icons/unreal-engine-icon';
import { UnityIcon } from '@/components/icons/unity-icon';
import { BlenderIcon } from '@/components/icons/blender-icon';

export interface TechStack {
    name: string;
    reason: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Game {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    aiHint: string;
    videoUrl: string;
    githubUrl: string;
    techStack: TechStack[];
    status: 'Alpha' | 'Beta' | 'Released';
    activeDevs: number;
    developers: string[];
}

export const games: Game[] = [
  {
    title: 'Chrono Glitch',
    description: 'A fast-paced VR shooter set in a dystopian timeline.',
    longDescription: 'Dive into a fractured reality where time is your weapon. Chrono Glitch combines high-speed VR gunplay with time-manipulation mechanics, challenging players to outwit and outshoot enemies across collapsing dimensions.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'vr shooter',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Released',
    activeDevs: 5,
    developers: ['Jax', 'Vesper', 'Glitch', 'Vertex', 'Cipher'],
    techStack: [
      { name: 'Unreal Engine', reason: 'Chosen for its high-fidelity graphics and robust VR support, allowing us to build a truly immersive dystopian world.', icon: UnrealEngineIcon },
      { name: 'C++', reason: 'The core game logic is built in C++ for maximum performance and control over complex game mechanics.', icon: Code2 },
    ],
  },
  {
    title: 'Echoes of Nebula',
    description: 'An AI-driven narrative adventure across forgotten star systems.',
    longDescription: 'Explore the ruins of a precursor civilization in a sentient starship. Use AI-driven dialogue systems to uncover secrets and forge alliances in a vast, procedurally generated galaxy where every choice matters.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'space adventure',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Beta',
    activeDevs: 8,
    developers: ['Scribe', 'Cipher', 'Glitch', 'Byte'],
    techStack: [
      { name: 'Unity', reason: 'Unity\'s versatile C# scripting and strong 2D/3D capabilities were ideal for our narrative-heavy, systems-driven gameplay.', icon: UnityIcon },
      { name: 'Blender', reason: 'All 3D models for starships and environments were crafted in Blender, leveraging its powerful modeling and texturing tools.', icon: BlenderIcon },
    ],
  },
  {
    title: 'Cyber Drift',
    description: 'High-octane racing through neon-lit cityscapes.',
    longDescription: 'Customize your ride and dominate the rain-slicked streets of a futuristic metropolis. Cyber Drift features realistic physics, deep customization, and a synthwave soundtrack that will keep your adrenaline pumping.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cyberpunk race',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Alpha',
    activeDevs: 3,
    developers: ['Vesper', 'Glitch', 'Shard'],
    techStack: [
      { name: 'Unity', reason: 'Unity\'s physics engine and asset pipeline allowed for rapid prototyping and iteration on the core driving mechanics.', icon: UnityIcon },
      { name: 'C#', reason: 'C# was used for all gameplay scripting, from vehicle handling to the dynamic event system.', icon: Code2 },
    ],
  },
  {
    title: 'Project Chimera',
    description: 'A stealth-action game with genetic modification mechanics.',
    longDescription: 'Infiltrate corporate strongholds as a genetically enhanced agent. Combine animal DNA to gain new abilities and adapt to any situation in this tactical espionage thriller.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'stealth agent',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Alpha',
    activeDevs: 6,
    developers: ['Cipher', 'Glitch', 'Vertex', 'Scribe'],
    techStack: [
      { name: 'Unreal Engine', reason: 'Unreal Engine\'s powerful lighting and particle systems were perfect for creating the game\'s dark, atmospheric environments.', icon: UnrealEngineIcon },
      { name: 'C++', reason: 'Core systems were built in C++ for performance, with Blueprints used for rapid prototyping of abilities.', icon: Code2 },
    ],
  },
  {
    title: 'Aetherium Wars',
    description: 'A collectible card game with living, animated battlefields.',
    longDescription: 'Summon powerful creatures and cast reality-bending spells in Aetherium Wars. The battlefield itself is a strategic element, changing each turn to create dynamic tactical challenges.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'fantasy card',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Released',
    activeDevs: 4,
    developers: ['Jax', 'Cipher', 'Vertex', 'Byte'],
    techStack: [
      { name: 'Unity', reason: 'Unity\'s UI tools and 2D capabilities made it the ideal choice for a complex card game interface and animations.', icon: UnityIcon },
      { name: 'Blender', reason: 'All card art and battlefield assets were created in Blender.', icon: BlenderIcon },
    ],
  },
  {
    title: 'Quantum Leap',
    description: 'A mind-bending puzzle-platformer based on quantum physics.',
    longDescription: 'Manipulate probability and exist in multiple states at once to solve intricate puzzles. Quantum Leap challenges your perception of space and causality.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'abstract puzzle',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Beta',
    activeDevs: 2,
    developers: ['Glitch', 'Cipher'],
    techStack: [
      { name: 'Unity', reason: 'The physics engine and C# scripting in Unity provided the flexibility needed to implement our unique quantum mechanics.', icon: UnityIcon },
      { name: 'C#', reason: 'All puzzle logic and player abilities were scripted in C#.', icon: Code2 },
    ],
  },
  {
    title: 'Starbound Vagrant',
    description: 'A space exploration RPG with a focus on trading and discovery.',
    longDescription: 'Chart your own course through a vibrant galaxy. Become a feared pirate, a wealthy merchant, or a renowned explorer. The choice is yours in this open-world space sandbox.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'spaceship cockpit',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Released',
    activeDevs: 7,
    developers: ['Vesper', 'Scribe', 'Shard', 'Byte', 'Vertex'],
    techStack: [
      { name: 'Unreal Engine', reason: 'The scale of the galaxy required an engine capable of handling large, open worlds, and Unreal Engine delivered.', icon: UnrealEngineIcon },
      { name: 'Blender', reason: 'Used for designing a wide variety of modular spaceship parts and celestial bodies.', icon: BlenderIcon },
    ],
  },
  {
    title: 'Neon Noir',
    description: 'A detective story set in a rain-slicked cyberpunk city.',
    longDescription: 'Solve a series of interconnected cases in this atmospheric detective game. Use high-tech gadgets and sharp wits to uncover a conspiracy that reaches the highest levels of the city.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cyberpunk detective',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Alpha',
    activeDevs: 4,
    developers: ['Scribe', 'Cipher', 'Shard', 'Glitch'],
    techStack: [
      { name: 'Unity', reason: 'Unity\'s 2D lighting and post-processing effects were essential for achieving the game\'s distinct noir visual style.', icon: UnityIcon },
      { name: 'C#', reason: 'The branching dialogue system and case management logic were all handled in C#.', icon: Code2 },
    ],
  },
  {
    title: 'Forge & Fire',
    description: 'A co-op crafting survival game in a harsh fantasy world.',
    longDescription: 'Work with friends to build a fortress, forge legendary weapons, and survive against hordes of mythical creatures. Forge & Fire tests your teamwork and resourcefulness.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'fantasy forge',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Beta',
    activeDevs: 10,
    developers: ['Jax', 'Vesper', 'Glitch', 'Vertex', 'Shard', 'Byte'],
    techStack: [
      { name: 'Unreal Engine', reason: 'Chosen for its robust networking capabilities for co-op multiplayer and its ability to render dense, detailed environments.', icon: UnrealEngineIcon },
      { name: 'C++', reason: 'Core survival and crafting systems were implemented in C++ for optimal server performance.', icon: Code2 },
    ],
  },
  {
    title: 'Datafall',
    description: 'A puzzle game where you reroute corrupted data streams in a vast network.',
    longDescription: 'The net is collapsing. As a data-flow technician, you must dive into complex digital switchboards to reroute falling data packets, prevent system-wide crashes, and uncover the source of the corruption. Think fast, act faster.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'digital matrix',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Alpha',
    activeDevs: 3,
    developers: ['Glitch', 'Byte', 'Cipher'],
    techStack: [
      { name: 'Unity', reason: 'Chosen for its rapid prototyping capabilities and asset store resources, which allowed for quick development of puzzle mechanics.', icon: UnityIcon },
      { name: 'C#', reason: 'All puzzle logic, scoring, and level progression are handled with C# scripts.', icon: Code2 },
    ],
  },
  {
    title: 'Rogue Singularity',
    description: 'A roguelike where you upload your consciousness into robotic shells.',
    longDescription: 'Survive a hostile, ever-changing digital world by transferring your consciousness between different robotic chassis. Each shell has unique abilities and weaknesses. Adapt or be deleted.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'robot consciousness',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Beta',
    activeDevs: 4,
    developers: ['Glitch', 'Cipher', 'Vertex', 'Byte'],
    techStack: [
      { name: 'Unity', reason: 'Unity\'s component-based architecture was perfect for managing the modular robot parts and abilities.', icon: UnityIcon },
      { name: 'C#', reason: 'The procedural generation of levels and enemy AI were all scripted in C#.', icon: Code2 },
    ],
  },
  {
    title: 'Mythos Reborn',
    description: 'A multiplayer brawler where gods and monsters clash.',
    longDescription: 'Choose your legend and fight for supremacy in dynamic arenas inspired by world mythology. Master unique abilities and team-based strategies in this fast-paced action game.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'mythology battle',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: '#',
    status: 'Released',
    activeDevs: 9,
    developers: ['Jax', 'Vesper', 'Glitch', 'Cipher', 'Scribe', 'Vertex', 'Shard'],
    techStack: [
      { name: 'Unreal Engine', reason: 'The visual power of Unreal Engine was essential to bring the epic scale of mythological battles to life.', icon: UnrealEngineIcon },
      { name: 'C++', reason: 'For the fast-paced, network-intensive combat, C++ provided the necessary performance and low-level control.', icon: Code2 },
    ],
  },
];
