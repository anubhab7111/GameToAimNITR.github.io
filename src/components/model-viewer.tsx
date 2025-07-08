'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Model3D } from '@/lib/models-data';

function Model({ model }: { model: Model3D }) {
  const getGeometry = () => {
    switch (model.geometry) {
      case 'box':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'sphere':
        return <sphereGeometry args={[1.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 16, 100]} />;
      default:
        return <boxGeometry />;
    }
  };

  return (
    <mesh>
      {getGeometry()}
      <meshStandardMaterial
        color={model.color}
        metalness={0.6}
        roughness={0.2}
        emissive={model.color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function ModelViewer({ model }: { model: Model3D }) {
  return (
    <div className="w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Model model={model} />
        </Suspense>
        <OrbitControls makeDefault autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
}
