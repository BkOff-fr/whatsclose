'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

/**
 * Hook to track mouse position
 * Returns the current x and y coordinates of the mouse cursor
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}
