/**
 * Example: How to use the WhatsClose UI Components
 *
 * This file demonstrates the integration of all navigation and UI components
 * in a typical Next.js application.
 */

'use client'

import { useState } from 'react'
import {
  Navigation,
  LoadingScreen,
  Cursor,
  Button,
} from '@/components'

/**
 * Example 1: Root Layout Integration
 * Add these components to your app/layout.tsx
 */
export function ExampleLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Loading Screen - Shows on initial load */}
      <LoadingScreen
        onLoadingComplete={() => setIsLoading(false)}
        minDuration={2000}
      />

      {/* Custom Cursor - Desktop only */}
      <Cursor
        color="rgba(168, 85, 247, 0.5)"
        size={40}
        magneticStrength={0.3}
      />

      {/* Navigation - Sticky header with scroll effects */}
      <Navigation />

      {/* Main Content */}
      <main>{children}</main>
    </>
  )
}

/**
 * Example 2: Using Buttons
 */
export function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Primary Button */}
      <Button variant="primary" size="lg">
        Get Started
      </Button>

      {/* Secondary Button with Icon */}
      <Button
        variant="secondary"
        size="md"
        icon={ArrowRight}
        iconPosition="right"
      >
        Learn More
      </Button>

      {/* Ghost Button */}
      <Button variant="ghost" size="sm">
        Skip
      </Button>

      {/* Outline Button Full Width */}
      <Button variant="outline" size="md" fullWidth>
        Sign Up
      </Button>
    </div>
  )
}

/**
 * Example 3: Custom Cursor Integration
 * Add data-cursor-magnetic to any element for magnetic effect
 */
export function MagneticElements() {
  return (
    <div className="space-y-8">
      <button
        data-cursor-magnetic
        className="px-8 py-4 bg-purple-500 text-white rounded-full"
      >
        Magnetic Button
      </button>

      <a
        href="#section"
        data-cursor-magnetic
        className="text-purple-400 hover:text-pink-400"
      >
        Magnetic Link
      </a>
    </div>
  )
}

/**
 * Example 4: Scroll Progress Variants
 */
export function ProgressExamples() {
  return (
    <>
      {/* Linear progress (in Navigation) */}
      <Navigation />

      {/* Circular progress (standalone) */}
      <ScrollProgress variant="circular" showPercentage />
    </>
  )
}

/**
 * Example 5: Complete Page Example
 */
export function CompletePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to WhatsClose
          </h1>
          <p className="text-xl text-white/60">
            Discover amazing places near you
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          {/* Feature content */}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          {/* How it works content */}
        </div>
      </section>
    </div>
  )
}

/**
 * Pro Tips:
 *
 * 1. Navigation Component
 *    - Automatically handles scroll detection
 *    - Mobile menu opens/closes automatically
 *    - Smooth scroll to sections
 *
 * 2. Custom Cursor
 *    - Automatically hidden on touch devices
 *    - Add data-cursor-magnetic for magnetic effect
 *    - Works best with mix-blend-mode
 *
 * 3. Loading Screen
 *    - Use once in root layout
 *    - Automatically fades out
 *    - Can preload assets in onLoadingComplete
 *
 * 4. Buttons
 *    - Use consistent variants across app
 *    - Primary for main CTAs
 *    - Secondary for less important actions
 *    - Ghost for subtle interactions
 *
 * 5. Scroll Progress
 *    - Linear variant integrated in Navigation
 *    - Circular variant for standalone use
 *    - Colors transition based on scroll position
 */

// Import icons
import { ArrowRight } from 'lucide-react'
import ScrollProgress from './ScrollProgress'
