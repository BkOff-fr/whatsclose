'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Le Système d\'exploitation du commerce local'
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Typewriter effect
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    // Animate CTA buttons
    if (heroRef.current) {
      gsap.from('.cta-button', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 2.5,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Integration Point */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-950 to-dark-900">
        <div className="absolute inset-0 opacity-30">
          {/* 3D Scene can be integrated here */}
        </div>
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        {/* Main headline with typewriter effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              WhatsClose
            </span>
          </h1>
          <div className="h-24 md:h-32 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white min-h-[3rem]">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-xl md:text-2xl text-dark-300 mb-12 max-w-3xl mx-auto"
        >
          Connectez créateurs et consommateurs locaux dans un écosystème vivant
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="cta-button group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/50 hover:scale-105">
            <span className="relative z-10">Découvrir l'écosystème</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="cta-button px-8 py-4 border-2 border-primary-400 rounded-full text-primary-400 font-semibold text-lg hover:bg-primary-400/10 transition-all duration-300 hover:scale-105">
            Voir la démo
          </button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <span className="text-dark-300 text-sm font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-primary-400 rounded-full p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-primary-400 rounded-full mx-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, -15, 0],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  )
}
