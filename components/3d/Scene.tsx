'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Suspense, useState, useTransition } from 'react'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

// Dynamically import heavy 3D components for code splitting
const LockerNetwork = dynamic(() => import('./LockerNetwork'), { ssr: false })
const FloatingProducts = dynamic(() => import('./FloatingProducts'), { ssr: false })
const MapGlobe = dynamic(() => import('./MapGlobe'), { ssr: false })
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

export type SceneType = 'locker-network' | 'floating-products' | 'map-globe' | 'particle-field' | 'combined' | 'demo'

interface SceneProps {
  sceneType?: SceneType
  enableControls?: boolean
  autoRotate?: boolean
  background?: 'dark' | 'gradient' | 'transparent'
  enablePostProcessing?: boolean
  className?: string
}

interface SceneContentProps {
  sceneType: SceneType
  autoRotate: boolean
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

function SceneContent({ sceneType, autoRotate }: SceneContentProps) {
  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />

      {/* Lighting configuration */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#6366f1" distance={20} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Conditional scene rendering based on type */}
      {sceneType === 'locker-network' && (
        <LockerNetwork nodeCount={50} spread={10} connectionDistance={3} />
      )}

      {sceneType === 'floating-products' && (
        <FloatingProducts count={12} />
      )}

      {sceneType === 'map-globe' && (
        <MapGlobe radius={2.5} markerCount={30} />
      )}

      {sceneType === 'particle-field' && (
        <ParticleField count={5000} spread={50} scrollFactor={0.1} />
      )}

      {sceneType === 'combined' && (
        <>
          <ParticleField count={3000} spread={60} scrollFactor={0.05} />
          <group position={[0, 0, -5]}>
            <MapGlobe radius={2} markerCount={20} />
          </group>
        </>
      )}

      {sceneType === 'demo' && (
        <>
          {/* Background particles */}
          <ParticleField count={2000} spread={40} scrollFactor={0.08} />

          {/* Central globe */}
          <group position={[0, 0, 0]}>
            <MapGlobe radius={2.5} markerCount={25} />
          </group>

          {/* Floating products around */}
          <group position={[8, 0, -3]} scale={0.7}>
            <FloatingProducts count={6} />
          </group>

          {/* Network visualization */}
          <group position={[-8, 0, -3]} scale={0.6}>
            <LockerNetwork nodeCount={30} spread={8} connectionDistance={2.5} />
          </group>
        </>
      )}

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
    </>
  )
}

export default function Scene({
  sceneType = 'combined',
  enableControls = true,
  autoRotate = true,
  background = 'dark',
  enablePostProcessing = true,
  className = 'w-full h-full'
}: SceneProps) {
  const [isPending, startTransition] = useTransition()

  // Background color based on prop
  const getBgColor = () => {
    switch (background) {
      case 'dark':
        return '#0a0a0a'
      case 'gradient':
        return '#1a1a2e'
      case 'transparent':
        return 'transparent'
      default:
        return '#0a0a0a'
    }
  }

  return (
    <div className={className} style={{ background: getBgColor() }}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: background === 'transparent',
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]} // Adaptive device pixel ratio for performance
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent sceneType={sceneType} autoRotate={autoRotate} />

          {/* Orbit controls for interaction */}
          {enableControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              maxDistance={30}
              minDistance={5}
              maxPolarAngle={Math.PI * 0.9}
              minPolarAngle={Math.PI * 0.1}
              dampingFactor={0.05}
              enableDamping
            />
          )}

          {/* Performance optimizations */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>

      {/* Optional loading indicator */}
      {isPending && (
        <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
          Loading scene...
        </div>
      )}
    </div>
  )
}
