
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
        document.body.classList.remove('is-nav-scrolling');
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

      <div className="flex flex-col md:flex-row gap-2 items-center bg-black p-3 md:p-4 rounded-lg border border-cyan-400 shadow-2xl shadow-cyan-400/20 w-full max-w-4xl mx-auto">
        {/* Left Side - Larger Eye Scanner */}
        <div className="relative w-48 md:w-56 flex flex-col items-center gap-2">
          <div
            className={cn(
                'bio-id-scanner transition-all duration-300',
                {
                    'animate-pulse': scanning,
                    'hover:scale-105': !scanning
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
                stroke="#ff00ff"
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
                stroke="#00ffff"
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
                  stroke="#00ff00"
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
                        ? 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8))'
                        : !accessGranted
                        ? 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.5))'
                        : 'none',
                    }}
                  />
                </>
              )}
              {scanning && (
                <>
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#00ffff" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#ff00ff" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                </>
              )}
              <defs>
                <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff00ff" opacity="0.4" />
                  <stop offset="70%" stopColor="#00ffff" opacity="0.3" />
                  <stop offset="100%" stopColor="#000" opacity="0.7" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          {!scanning && !accessGranted && (
            <div className="text-cyan-400 text-xs font-mono whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
              CLICK TO SCAN
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center mx-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 mx-1 rounded-full ${ i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-500' } animate-pulse`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
          <div className="text-cyan-400 text-xs mx-2 font-mono">AUTH</div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i + 8}
              className={`w-2 h-2 mx-1 rounded-full ${ i % 2 === 0 ? 'bg-green-400' : 'bg-cyan-400' } animate-pulse`}
              style={{ animationDelay: `${(i + 8) * 0.15}s` }}
            />
          ))}
        </div>

        <div className="bg-gray-900 border border-green-400 rounded-sm p-3 md:p-4 w-full font-mono text-xs md:text-sm flex-grow">
          <div className="text-green-400 mb-2 text-center font-bold border-b border-green-400 pb-1 text-sm">
            BIO-ID TERMINAL v2.1
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyan-400">USER:</span>
              <span className="text-pink-500">GUEST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">STATUS:</span>
              <span className={`${ accessGranted ? 'text-green-400' : scanning ? 'text-yellow-400 animate-pulse' : 'text-red-400' }`}>
                {accessGranted ? '✅ ACCESS GRANTED' : scanning ? 'SCANNING...' : 'AWAITING SCAN'}
              </span>
            </div>

            {accessGranted && (
              <>
                <div className="border-t border-green-400 pt-2 mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-400">CLEARANCE:</span>
                    <span className="text-pink-500">LEVEL 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-400">LINK:</span>
                    <button
                      onClick={handleNavigate}
                      className="hover:text-green-200 px-2 cursor-pointer transition-colors text-xs md:text-sm border-none p-0 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-opacity-50 bg-green-400 text-gray-900 rounded-sm"
                    >
                      ACCESS TEAM DATABASE
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-green-400">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${ accessGranted ? 'bg-green-400' : scanning ? 'bg-yellow-400 animate-pulse' : 'bg-red-400' }`}
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

    