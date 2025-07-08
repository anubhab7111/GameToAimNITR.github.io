'use client'

import { useEffect, useState } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // This effect runs once when the template mounts (on navigation)
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Must match animation duration in globals.css

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={isAnimating ? 'page-transition-effect' : ''}>
      {children}
    </div>
  )
}
