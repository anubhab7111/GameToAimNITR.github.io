
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { ModelInfo } from '@/lib/modelInfo';
import { Skeleton } from './ui/skeleton';

function FallbackModel({ model }: { model: ModelInfo }) {
  if (!model?.fallback) return null;

  const getGeometry = () => {
    switch (model.fallback.geometry) {
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
        color={model.fallback.color}
        metalness={0.6}
        roughness={0.2}
        emissive={model.fallback.color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function LoadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

export default function ModelViewer({ model }: { model: ModelInfo }) {
  return (
    <div className="w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary">
       <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 8], fov: 45 }}>
        <ambientLight intensity={3.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color={model?.fallback?.color || '#ffffff'} />
        <Suspense fallback={<FallbackModel model={model} />}>
          {model.url ? <LoadedModel url={model.url} /> : <FallbackModel model={model} />}
        </Suspense>
        <OrbitControls makeDefault autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
}
