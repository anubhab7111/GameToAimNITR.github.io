export interface Model3D {
  id: string;
  name: string;
  description: string;
  geometry: 'box' | 'sphere' | 'torus';
  color: string;
}

export const models: Model3D[] = [
  {
    id: 'cyber-cube',
    name: 'Cyber-Cube',
    description: 'A fundamental data block, pulsating with raw information.',
    geometry: 'box',
    color: '#00ffff', // cyan
  },
  {
    id: 'data-sphere',
    name: 'Data-Sphere',
    description: 'A compressed node of archived knowledge, smooth and seamless.',
    geometry: 'sphere',
    color: '#f0f', // magenta
  },
  {
    id: 'protocol-torus',
    name: 'Protocol-Torus',
    description: 'A looping communication protocol, representing continuous data flow.',
    geometry: 'torus',
    color: '#00ff00', // lime green
  },
];
