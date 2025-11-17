'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

type ProgressVariant = 'linear' | 'circular'

interface ScrollProgressProps {
  variant?: ProgressVariant
  showPercentage?: boolean
}

export default function ScrollProgress({
  variant = 'linear',
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const [currentSection, setCurrentSection] = useState(0)

  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform scroll progress to rotation for circular variant
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Color transitions based on scroll position
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgb(168, 85, 247)', // purple-400
      'rgb(236, 72, 153)', // pink-400
      'rgb(59, 130, 246)', // blue-500
      'rgb(34, 197, 94)', // green-500
      'rgb(168, 85, 247)', // back to purple
    ]
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Determine current section (0-4) based on scroll progress
      const section = Math.floor(latest * 5)
      setCurrentSection(Math.min(section, 4))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  if (variant === 'circular') {
    return (
      <motion.div
        className="fixed top-6 right-6 z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="175.93"
              style={{
                strokeDashoffset: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [175.93, 0]
                ),
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage in center */}
          {showPercentage && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <motion.span className="text-xs font-bold text-white">
                {Math.round(scrollYProgress.get() * 100)}%
              </motion.span>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  // Linear variant
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          backgroundColor,
        }}
      />
    </motion.div>
  )
}
