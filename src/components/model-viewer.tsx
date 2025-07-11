
'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { ModelInfo } from '@/lib/modelInfo';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

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
  return <primitive object={scene} scale={1} />;
}

export default function ModelViewer({ model }: { model: ModelInfo }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [zoom, setZoom] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setZoom(1);
    controlsRef.current?.reset();
  }, [model]);

  useFrame(() => {
    if (controlsRef.current) {
      if (!isInteracting) {
        const currentZoom = controlsRef.current.getDistance();
        // Normalize zoom to a 0-100 scale for the slider
        const maxDistance = 20;
        const minDistance = 2;
        const newZoom = 100 * (1 - (currentZoom - minDistance) / (maxDistance - minDistance));
        setZoom(Math.max(0, Math.min(100, newZoom)));
      }
    }
  });

  const handlePan = (dx: number, dy: number) => {
    controlsRef.current?.pan(dx, dy);
    controlsRef.current?.update();
  };

  const handleZoomChange = (newZoomValue: number[]) => {
    const newZoom = newZoomValue[0];
    if (controlsRef.current) {
        const maxDistance = 20;
        const minDistance = 2;
        const newDistance = minDistance + (1 - newZoom / 100) * (maxDistance - minDistance);
        controlsRef.current.dollyTo(newDistance, true);
        setZoom(newZoom);
    }
  };


  return (
    <div className="relative w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary overflow-hidden">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 8], fov: 45 }}>
        <ambientLight intensity={3.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        {model?.fallback?.color && (
          <pointLight
            position={[-10, -10, -10]}
            intensity={1.5}
            color={model.fallback.color}
          />
        )}
        <Suspense fallback={<FallbackModel model={model} />}>
          {model.url ? (
            <LoadedModel url={model.url} />
          ) : (
            <FallbackModel model={model} />
          )}
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={2}
          maxDistance={20}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePan(0, 5)}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
            <div></div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePan(5, 0)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePan(0, -5)}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePan(-5, 0)}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 px-2">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[zoom]}
              onValueChange={handleZoomChange}
              onValueCommit={() => setIsInteracting(false)}
              onPointerDown={() => setIsInteracting(true)}
              max={100}
              step={1}
            />
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
