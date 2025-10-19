'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
import type { ReactNode } from 'react'

function LenisProvider({ children }: { children: ReactNode }) {
  const options = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: true,
  }

  return (
    <ReactLenis root options={options}>
      {children as any}
    </ReactLenis>
  )
}

export default LenisProvider
