
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const BioIDTerminal = () => {
  const [scanning, setScanning] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleScan = () => {
    if (scanning || accessGranted) return;

    setScanning(true);
    setTimeout(() => {
      setAccessGranted(true);
      setScanning(false);
      // After granting access, we can navigate or just show the button
    }, 2000);
  };
  
  const handleNavigate = () => {
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => {
        router.push('/members');
        setTimeout(() => document.body.classList.remove('is-nav-scrolling'), 100);
      }, 800);
  }

  const handleClick = () => {
    if(accessGranted) {
      handleNavigate();
    } else {
      handleScan();
    }
  };

  return (
    <>
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.9; }
        }
        .animate-soft-pulse {
          animation: soft-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-background/70 p-3 md:p-4 rounded-lg border border-primary/30 box-glow-primary w-full max-w-4xl mx-auto">
        {/* Left Side - Larger Eye Scanner */}
        <div className="relative w-48 md:w-56 flex-shrink-0 flex flex-col items-center gap-2">
          <div
            className={cn(
                'bio-id-scanner',
                {
                    'animate-pulse': scanning,
                    'hover:scale-105': !scanning && !accessGranted
                }
            )}
            onClick={handleClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="160"
              height="160"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="10 5"
                opacity="0.8"
                className={`${scanning ? 'animate-spin' : ''}`}
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8 4"
                opacity="0.7"
                className={`${scanning ? 'animate-spin' : ''}`}
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '3s',
                }}
              />
              {!scanning && (
                <g
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.2"
                  opacity={hovering ? '0.8' : '0.6'}
                  className="transition-all duration-300"
                >
                  <line x1="30" y1="100" x2="170" y2="100" strokeDasharray="5 3" />
                  <line x1="100" y1="30" x2="100" y2="170" strokeDasharray="5 3" />
                </g>
              )}
              {!scanning && (
                <>
                  <circle
                    cx="100"
                    cy="100"
                    r="45"
                    fill="url(#eyeGradient)"
                    opacity={hovering ? '0.9' : '0.8'}
                    className={`transition-all duration-300 ${
                      !accessGranted ? 'animate-soft-pulse' : ''
                    }`}
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="18"
                    fill="#000"
                    className="transition-all duration-300"
                    style={{
                      filter: hovering
                        ? 'drop-shadow(0 0 6px hsl(var(--accent) / 0.8))'
                        : !accessGranted
                        ? 'drop-shadow(0 0 4px hsl(var(--accent) / 0.5))'
                        : 'none',
                    }}
                  />
                </>
              )}
              {scanning && (
                <>
                  <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                </>
              )}
              <defs>
                <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          {!scanning && !accessGranted && (
            <div className="text-accent text-xs font-code whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
              CLICK TO SCAN
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center mx-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full ${ i % 2 === 0 ? 'bg-accent' : 'bg-primary' } animate-pulse`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
          <div className="text-accent text-xs mx-2 font-code">AUTH</div>
          {[...Array(4)].map((_, i) => (
            <div
              key={i + 4}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full ${ i % 2 === 0 ? 'bg-green-400' : 'bg-accent' } animate-pulse`}
              style={{ animationDelay: `${(i + 4) * 0.15}s` }}
            />
          ))}
        </div>

        <div className="bg-card/50 border border-green-400/30 rounded-sm p-3 md:p-4 w-full font-code text-xs md:text-sm flex-grow">
          <div className="text-green-400 mb-2 text-center font-bold border-b border-green-400/30 pb-1 text-sm">
            BIO-ID TERMINAL v2.1
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-accent mr-2">USER:</span>
              <span className="text-primary text-right font-bold">EDGERUNNERS</span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-accent mr-2">STATUS:</span>
              <span className={cn('text-right font-bold',
                accessGranted ? 'text-green-400' : scanning ? 'text-tertiary animate-pulse' : 'text-destructive'
              )}>
                {accessGranted ? 'ACCESS GRANTED' : scanning ? 'SCANNING...' : 'AWAITING SCAN'}
              </span>
            </div>

            {accessGranted && (
              <>
                <div className="border-t border-green-400/30 pt-2 mt-2">
                  <div className="flex justify-between items-center flex-wrap mb-1">
                    <span className="text-accent mr-2">CLEARANCE:</span>
                    <span className="text-primary text-right font-bold">ADMIN</span>
                  </div>
                  <div className="flex justify-between items-center flex-wrap">
                    <span className="text-accent mr-2">LINK:</span>
                    <button
                      onClick={handleNavigate}
                      className="hover:text-background px-2 py-0.5 cursor-pointer transition-colors text-xs md:text-sm border-none font-code focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-opacity-50 bg-green-400 text-background rounded-sm whitespace-nowrap font-bold"
                    >
                      ACCESS TEAM DATABASE
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-green-400/30">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={cn('w-2 h-2 rounded-full',
                    accessGranted ? 'bg-green-400' : scanning ? 'bg-tertiary animate-pulse' : 'bg-destructive'
                )}
              ></div>
              <span className="text-green-400">
                {accessGranted ? 'SYSTEM READY' : scanning ? 'PROCESSING...' : 'STANDBY MODE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioIDTerminal;
