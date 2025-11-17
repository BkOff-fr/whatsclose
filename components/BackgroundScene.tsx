'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useInView } from '@/lib/hooks'
import { Canvas } from '@react-three/fiber'

// Direct imports instead of dynamic for R3F components
import ParticleField from './3d/ParticleField'
import LockerNetwork from './3d/LockerNetwork'
import MapGlobe from './3d/MapGlobe'
import FloatingProducts from './3d/FloatingProducts'

type SceneType = 'particles' | 'lockers' | 'globe' | 'products' | 'none'

interface BackgroundSceneProps {
  /** The current active scene */
  activeScene: SceneType
  /** Optional className for styling */
  className?: string
}

/**
 * BackgroundScene Component
 * Manages which 3D scene to display based on the current section
 * Provides smooth transitions between different 3D backgrounds
 */
export default function BackgroundScene({
  activeScene,
  className = '',
}: BackgroundSceneProps) {
  const [currentScene, setCurrentScene] = useState<SceneType>('none')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (activeScene !== currentScene) {
      setIsTransitioning(true)

      // Short delay for fade transition
      const timer = setTimeout(() => {
        setCurrentScene(activeScene)
        setIsTransitioning(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [activeScene, currentScene])

  return (
    <div
      className={`fixed inset-0 -z-10 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    >
      {/* Particles - Hero Section */}
      {currentScene === 'particles' && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      )}

      {/* Locker Network - Problem/Innovation Section */}
      {currentScene === 'lockers' && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
          <Suspense fallback={null}>
            <LockerNetwork />
          </Suspense>
        </Canvas>
      )}

      {/* Map Globe - Ecosystem Section */}
      {currentScene === 'globe' && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#6366f1" />
          <Suspense fallback={null}>
            <MapGlobe />
          </Suspense>
        </Canvas>
      )}

      {/* Floating Products - Experience Section */}
      {currentScene === 'products' && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Suspense fallback={null}>
            <FloatingProducts />
          </Suspense>
        </Canvas>
      )}

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/50 pointer-events-none" />
    </div>
  )
}

/**
 * SectionSceneController Component
 * Automatically detects which section is in view and updates the background scene
 */
export function SectionSceneController() {
  const heroRef = useRef<HTMLDivElement>(null)
  const conceptRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const ecosystemRef = useRef<HTMLDivElement>(null)
  const innovationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { threshold: 0.3 })
  const conceptInView = useInView(conceptRef, { threshold: 0.3 })
  const problemInView = useInView(problemRef, { threshold: 0.3 })
  const ecosystemInView = useInView(ecosystemRef, { threshold: 0.3 })
  const innovationInView = useInView(innovationRef, { threshold: 0.3 })
  const experienceInView = useInView(experienceRef, { threshold: 0.3 })

  const [activeScene, setActiveScene] = useState<SceneType>('particles')

  useEffect(() => {
    if (heroInView) {
      setActiveScene('particles')
    } else if (conceptInView) {
      setActiveScene('particles') // Keep particles for concept
    } else if (problemInView) {
      setActiveScene('lockers')
    } else if (ecosystemInView) {
      setActiveScene('globe')
    } else if (innovationInView) {
      setActiveScene('lockers')
    } else if (experienceInView) {
      setActiveScene('products')
    }
  }, [
    heroInView,
    conceptInView,
    problemInView,
    ecosystemInView,
    innovationInView,
    experienceInView,
  ])

  return (
    <>
      {/* Section markers for intersection observer */}
      <div ref={heroRef} data-section="hero" className="absolute top-0 h-screen w-full pointer-events-none" />
      <div ref={conceptRef} data-section="concept" className="absolute top-[100vh] h-screen w-full pointer-events-none" />
      <div ref={problemRef} data-section="problem" className="absolute top-[200vh] h-screen w-full pointer-events-none" />
      <div ref={ecosystemRef} data-section="ecosystem" className="absolute top-[300vh] h-screen w-full pointer-events-none" />
      <div ref={innovationRef} data-section="innovation" className="absolute top-[400vh] h-screen w-full pointer-events-none" />
      <div ref={experienceRef} data-section="experience" className="absolute top-[500vh] h-screen w-full pointer-events-none" />

      {/* Background scene renderer */}
      <BackgroundScene activeScene={activeScene} />
    </>
  )
}
