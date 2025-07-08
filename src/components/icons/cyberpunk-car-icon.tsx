import type { SVGProps } from 'react';

export function CyberpunkCarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 150"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="car-body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.4)" />
        </linearGradient>
        <linearGradient id="window-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent) / 0.3)" />
          <stop offset="100%" stopColor="hsl(var(--background) / 0.8)" />
        </linearGradient>
        <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      
      {/* Ground Reflection */}
      <path
        d="M 50 140 L 350 140 L 340 148 L 60 148 Z"
        fill="hsl(var(--primary) / 0.1)"
        className="blur-[2px]"
      />
      {/* Underglow */}
      <ellipse
        cx="200"
        cy="140"
        rx="150"
        ry="10"
        fill="hsl(var(--primary))"
        className="blur-md animate-glow"
      />

      <g className="animate-car-bob">
        {/* Wheels */}
        <g>
            <circle cx="95" cy="115" r="22" fill="#111" />
            <circle cx="95" cy="115" r="14" fill="#222" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <circle cx="95" cy="115" r="6" fill="hsl(var(--accent))" className="animate-flicker" style={{animationDelay: '0.3s'}} />
        </g>
        <g>
            <circle cx="305" cy="115" r="22" fill="#111" />
            <circle cx="305" cy="115" r="14" fill="#222" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <circle cx="305" cy="115" r="6" fill="hsl(var(--accent))" className="animate-flicker" />
        </g>

        {/* Car Body */}
        <path
          d="M 40 115 
             L 70 115 
             L 80 90
             L 130 65 
             L 280 65 
             L 330 90
             L 340 115
             L 360 115 
             L 350 95
             L 340 95
             L 285 70
             L 125 70
             L 70 95
             L 50 95
             L 40 115 Z"
          fill="url(#car-body-gradient)"
          stroke="hsl(var(--accent) / 0.5)"
          strokeWidth="0.5"
        />

        {/* Window/Cockpit */}
        <path
          d="M 135 70 L 150 90 L 270 90 L 280 70 Z"
          fill="url(#window-gradient)"
          stroke="hsl(var(--accent))"
          strokeWidth="0.5"
        />

        {/* Headlight */}
        <path d="M 355 98 L 385 98 L 380 105 L 350 105 Z" fill="hsl(var(--accent))" />
        <path d="M 385 101.5 h 15" stroke="hsl(var(--accent))" strokeWidth="2" className="blur-sm animate-flicker" filter="url(#glow-filter)" />
        
        {/* Taillight */}
        <path d="M 25 98 L 45 98 L 48 105 L 28 105 Z" fill="hsl(var(--destructive))" />
        <path d="M 25 101.5 h -15" stroke="hsl(var(--destructive))" strokeWidth="2" className="blur-sm animate-flicker" filter="url(#glow-filter)" />
      
        {/* Spoiler */}
        <path d="M 20 90 L 40 90 L 50 75 L 30 75 Z" fill="url(#car-body-gradient)" stroke="hsl(var(--accent) / 0.5)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
