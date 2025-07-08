
export default function HeroBackground() {
  const buildings1 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M10 400 V 150 H 60 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M50 400 V 200 H 90 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M80 400 V 100 L 100 80 L 120 100 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M200 400 V 250 H 210 V 220 H 240 V 250 H 250 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M280 400 V 50 H 380 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M370 400 V 120 H 420 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M450 400 V 180 L 470 170 L 490 180 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M520 400 V 80 H 550 V 50 H 590 V 80 H 620 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M650 400 V 250 H 700 V 400'/%3E%3Cpath stroke='hsl(180 100% 50% / 0.2)' stroke-width='1' fill='none' d='M720 400 V 120 H 800 V 400'/%3E%3C/svg%3E`;

  const buildings2 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop stop-color='hsl(180 100% 50% / 0)' offset='0%25'/%3E%3Cstop stop-color='hsl(180 100% 50% / 0.2)' offset='100%25'/%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='2.5' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/defs%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3Cg%3E%3Cpath fill='hsl(288 83% 10% / 0.6)' d='M50 400 V 100 L 60 90 H 120 L 130 100 V 400 Z'/%3E%3Crect fill='hsl(180 100% 50% / 0.5)' filter='url(%23glow)' x='65' y='110' width='50' height='10'/%3E%3Crect fill='hsl(180 100% 50% / 0.3)' x='70' y='130' width='10' height='20'/%3E%3Crect fill='hsl(180 100% 50% / 0.3)' x='90' y='130' width='10' height='20'/%3E%3Crect fill='hsl(180 100% 50% / 0.3)' x='110' y='130' width='10' height='20'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='hsl(288 83% 15% / 0.7)' d='M150 400 V 50 H 250 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 10% / 0.6)' d='M160 400 V 20 H 240 V 400 Z'/%3E%3Crect fill='hsl(288 83% 54% / 0.5)' filter='url(%23glow)' x='170' y='40' width='60' height='5'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='hsl(288 83% 12% / 0.6)' d='M280 400 V 150 H 380 V 400 Z'/%3E%3Crect fill='hsl(180 100% 50% / 0.2)' x='290' y='160' width='80' height='230'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='hsl(288 83% 10% / 0.7)' d='M400 400 V 80 H 420 V 60 H 480 V 80 H 500 V 400 Z'/%3E%3Crect fill='hsl(180 100% 50% / 0.4)' x='430' y='90' width='40' height='300'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='hsl(288 83% 15% / 0.6)' d='M520 400 V 200 H 620 V 400 Z'/%3E%3Crect fill='hsl(288 83% 54% / 0.4)' filter='url(%23glow)' x='530' y='210' width='10' height='180'/%3E%3Crect fill='hsl(288 83% 54% / 0.4)' filter='url(%23glow)' x='550' y='210' width='10' height='180'/%3E%3Crect fill='hsl(288 83% 54% / 0.4)' filter='url(%23glow)' x='570' y='210' width='10' height='180'/%3E%3Crect fill='hsl(288 83% 54% / 0.4)' filter='url(%23glow)' x='590' y='210' width='10' height='180'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='hsl(288 83% 10% / 0.7)' d='M650 400 V 120 L 750 80 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 15% / 0.8)' d='M660 400 V 130 L 740 100 V 400 Z'/%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* Sky & Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2a] to-[#2a0a1a]"></div>
      <div className="absolute inset-0 stars-bg"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),transparent)]"></div>
      
      {/* City Layers */}
      <div
        className="absolute bottom-0 left-0 w-full h-3/4 animate-pan-slow"
        style={{ backgroundImage: `url("${buildings1}")`, backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat' }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-full animate-pan-medium opacity-70"
        style={{ backgroundImage: `url("${buildings2}")`, backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat' }}
      ></div>
      
       {/* Foreground Fog */}
       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>
    </div>
  );
}
