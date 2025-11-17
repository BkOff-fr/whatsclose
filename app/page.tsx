'use client'

import { useEffect, useState } from 'react'
import { initSmoothScroll } from '@/lib/smooth-scroll'

// UI Components
import LoadingScreen from '@/components/LoadingScreen'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'

// Section Components
import Hero from '@/components/sections/Hero'
import Concept from '@/components/sections/Concept'
import Problem from '@/components/sections/Problem'
import Ecosystem from '@/components/sections/Ecosystem'
import Innovation from '@/components/sections/Innovation'
import Experience from '@/components/sections/Experience'
import Footer from '@/components/sections/Footer'

// 3D Background Scene Controller
import { SectionSceneController } from '@/components/BackgroundScene'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [lenisInitialized, setLenisInitialized] = useState(false)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Initialize smooth scrolling after loading is complete
    if (!isLoading && !lenisInitialized) {
      const lenis = initSmoothScroll()
      if (lenis) {
        setLenisInitialized(true)
      }
    }
  }, [isLoading, lenisInitialized])

  return (
    <>
      {/* Loading Screen - Shows on initial page load */}
      {isLoading && <LoadingScreen />}

      {/* Custom Cursor - z-index: 9999 */}
      <Cursor />

      {/* Navigation Bar - z-index: 50 */}
      <Navigation />

      {/* Main Content Container */}
      <main className="relative min-h-screen overflow-hidden">
        {/* 3D Background Scenes - z-index: -10 (fixed positioning) */}
        <SectionSceneController />

        {/* Content Sections - z-index: 0 (default) */}
        <div className="relative z-0">
          <Hero />
          <Concept />
          <Problem />
          <Ecosystem />
          <Innovation />
          <Experience />
          <Footer />
        </div>
      </main>
    </>
  )
}
