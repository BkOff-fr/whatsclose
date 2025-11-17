'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorProps {
  color?: string
  size?: number
  magneticStrength?: number
}

export default function Cursor({
  color = 'rgba(168, 85, 247, 0.5)',
  size = 40,
  magneticStrength = 0.3,
}: CursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth spring animation for cursor position
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const magneticTargetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      let targetX = e.clientX
      let targetY = e.clientY

      // Magnetic effect on interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-cursor-magnetic')

      if (isInteractive) {
        const element = (target.closest('button, a') as HTMLElement) || target
        magneticTargetRef.current = element

        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate magnetic pull
        const deltaX = (centerX - e.clientX) * magneticStrength
        const deltaY = (centerY - e.clientY) * magneticStrength

        targetX += deltaX
        targetY += deltaY
      } else {
        magneticTargetRef.current = null
      }

      cursorX.set(targetX)
      cursorY.set(targetY)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-cursor-magnetic')

      if (isInteractive) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseOut = () => {
      setIsVisible(false)
    }

    const handleMouseEnterWindow = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mouseenter', handleMouseEnterWindow)

    // Add listeners for interactive elements
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mouseenter', handleMouseEnterWindow)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [cursorX, cursorY, magneticStrength])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            backgroundColor: isHovering
              ? 'rgba(168, 85, 247, 0.2)'
              : 'transparent',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          style={{
            width: 8,
            height: 8,
          }}
        />
      </motion.div>
    </>
  )
}
