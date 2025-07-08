'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { models } from '@/lib/models-data';
import type { Model3D } from '@/lib/models-data';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Code, Circle, Donut } from 'lucide-react';

const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  loading: () => <Skeleton className="w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary" />,
  ssr: false,
});

export default function ShowcasePage() {
  const [selectedModel, setSelectedModel] = useState<Model3D>(models[0]);

  const getIcon = (geometry: Model3D['geometry']) => {
    switch (geometry) {
      case 'box':
        return <Code className="w-5 h-5" />;
      case 'sphere':
        return <Circle className="w-5 h-5" />;
      case 'torus':
        return <Donut className="w-5 h-5" />;
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-32 parallax-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">3D Asset Showcase</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Decompile and inspect the core constructs of our digital universe. Interact with the building blocks of our games.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <ModelViewer model={selectedModel} />
          </div>

          <div className="flex flex-col gap-4">
             <h3 className="text-2xl font-bold text-primary">Select Asset</h3>
            {models.map((model) => (
              <Button
                key={model.id}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-3 border-accent/30 hover:bg-accent/20",
                  selectedModel.id === model.id && 'bg-accent/10 border-accent box-glow-accent'
                )}
                onClick={() => setSelectedModel(model)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-card rounded-md mt-1">
                    {getIcon(model.geometry)}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-accent">{model.name}</p>
                    <p className="text-muted-foreground whitespace-normal text-sm">{model.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
