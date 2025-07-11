export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  url?: string;
  fallback: {
    geometry: 'box' | 'sphere' | 'torus';
    color: string;
  }
}

export const models: ModelInfo[] = [
  {
    id: 'cyber-cube',
    name: 'Cyber-Cube MK.II',
    description: 'A fundamental data block, pulsating with raw information.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/box.glb',
    fallback: {
        geometry: 'box',
        color: '#00ffff', // cyan
    }
  },
  {
    id: 'data-sphere',
    name: 'Data-Sphere',
    description: 'A compressed node of archived knowledge, smooth and seamless.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/sphere.glb',
    fallback: {
        geometry: 'sphere',
        color: '#f0f', // magenta
    }
  },
  {
    id: 'protocol-torus',
    name: 'Protocol-Torus',
    description: 'A looping communication protocol, representing continuous data flow.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/torus.glb',
    fallback: {
        geometry: 'torus',
        color: '#00ff00', // lime green
    }
  },
  {
    id: 'engine-block',
    name: 'Fusion Engine',
    description: 'The power core for a standard city-cruiser vehicle.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/car-engine.glb',
    fallback: {
        geometry: 'box',
        color: '#ff9900',
    }
  },
  {
    id: 'hover-drone',
    name: 'Scout Drone',
    description: 'An agile surveillance drone used for reconnaissance missions.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/drone.glb',
    fallback: {
        geometry: 'sphere',
        color: '#cccccc',
    }
  },
  {
    id: 'comms-array',
    name: 'Comms Array',
    description: 'A long-range communication dish for interplanetary transmissions.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/satellite-dish.glb',
    fallback: {
        geometry: 'torus',
        color: '#ffcc00',
    }
  },
  {
    id: 'crystal-shard',
    name: 'Aetherium Crystal',
    description: 'A rare crystal that resonates with cosmic energy.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/crystal.glb',
    fallback: {
        geometry: 'box',
        color: '#BE29EC',
    }
  },
  {
    id: 'mech-helmet',
    name: 'Titan Helmet',
    description: 'The reinforced helmet of a Titan-class combat mech.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/helmet.glb',
    fallback: {
        geometry: 'sphere',
        color: '#a0a0a0',
    }
  },
  {
    id: 'plasma-rifle',
    name: 'Plasma Rifle',
    description: 'Standard issue energy weapon for corporate enforcers.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/gun.glb',
    fallback: {
        geometry: 'box',
        color: '#f44336',
    }
  },
  {
    id: 'orbital-station',
    name: 'Orbital Station',
    description: 'A habitat module for low-orbit space stations.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/space-station.glb',
    fallback: {
        geometry: 'torus',
        color: '#e0e0e0',
    }
  },
  {
    id: 'sword-of-ancients',
    name: 'Sword of Ancients',
    description: 'A blade forged in a forgotten era, humming with power.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/sword.glb',
    fallback: {
        geometry: 'box',
        color: '#4dd0e1',
    }
  },
  {
    id: 'cyber-heart',
    name: 'Cybernetic Heart',
    description: 'An advanced biomechanical replacement organ.',
    url: 'https://res.cloudinary.com/demo/image/upload/v1614036928/samples/3d-models/heart.glb',
    fallback: {
        geometry: 'sphere',
        color: '#ff4081',
    }
  }
];
