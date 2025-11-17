'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  spread?: number
  scrollFactor?: number
}

export default function ParticleField({
  count = 5000,
  spread = 50,
  scrollFactor = 0.1
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null!)
  const scrollY = useRef(0)
  const targetScrollY = useRef(0)

  // Particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Positions - create depth layers
      positions[i3] = (Math.random() - 0.5) * spread
      positions[i3 + 1] = (Math.random() - 0.5) * spread
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5

      // Velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005

      // Colors - gradient from blue to purple
      const colorMix = Math.random()
      const color1 = new THREE.Color('#6366f1') // Indigo
      const color2 = new THREE.Color('#8b5cf6') // Purple
      const color3 = new THREE.Color('#ec4899') // Pink

      let finalColor: THREE.Color
      if (colorMix < 0.5) {
        finalColor = color1.clone().lerp(color2, colorMix * 2)
      } else {
        finalColor = color2.clone().lerp(color3, (colorMix - 0.5) * 2)
      }

      colors[i3] = finalColor.r
      colors[i3 + 1] = finalColor.g
      colors[i3 + 2] = finalColor.b

      // Sizes - varied for depth perception
      sizes[i] = Math.random() * 2 + 0.5

      // Phase offset for wave animations
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, velocities, colors, sizes, phases }
  }, [count, spread])

  // Custom shader material for enhanced visuals
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollOffset: { value: 0 },
        pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        attribute float phase;

        uniform float time;
        uniform float scrollOffset;
        uniform float pixelRatio;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = customColor;

          // Wave effect based on position and time
          vec3 pos = position;
          pos.y += sin(pos.x * 0.1 + time + phase) * 2.0;
          pos.x += cos(pos.y * 0.1 + time + phase) * 1.5;

          // Scroll effect
          pos.y += scrollOffset * 0.5;
          pos.x += scrollOffset * 0.2;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Size attenuation with depth
          float depth = -mvPosition.z;
          gl_PointSize = size * pixelRatio * (300.0 / depth);

          // Fade based on depth and scroll
          vAlpha = smoothstep(50.0, 10.0, depth);
          vAlpha *= 1.0 - abs(scrollOffset) * 0.01;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Circular particle shape
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          if (dist > 0.5) discard;

          // Soft glow
          float alpha = (1.0 - dist * 2.0) * vAlpha;
          alpha = pow(alpha, 2.0);

          // Add bright center
          float brightness = 1.0 - smoothstep(0.0, 0.3, dist);
          vec3 finalColor = vColor + vec3(brightness * 0.3);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [])

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        targetScrollY.current = window.scrollY * scrollFactor
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollFactor])

  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Smooth scroll interpolation
    scrollY.current += (targetScrollY.current - scrollY.current) * 0.05

    if (particlesRef.current && particlesRef.current.geometry) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const colors = particlesRef.current.geometry.attributes.customColor.array as Float32Array

      // Update particle positions with organic movement
      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Gentle drift
        positions[i3] += particleData.velocities[i3]
        positions[i3 + 1] += particleData.velocities[i3 + 1]
        positions[i3 + 2] += particleData.velocities[i3 + 2]

        // Boundary wrapping
        if (Math.abs(positions[i3]) > spread / 2) {
          positions[i3] = -positions[i3] * 0.9
        }
        if (Math.abs(positions[i3 + 1]) > spread / 2) {
          positions[i3 + 1] = -positions[i3 + 1] * 0.9
        }
        if (Math.abs(positions[i3 + 2]) > spread / 4) {
          positions[i3 + 2] = -positions[i3 + 2] * 0.9
        }

        // Color transition based on scroll
        const colorShift = Math.sin(time * 0.5 + particleData.phases[i] + scrollY.current * 0.01) * 0.5 + 0.5
        const baseColor = new THREE.Color(
          particleData.colors[i3],
          particleData.colors[i3 + 1],
          particleData.colors[i3 + 2]
        )
        const shiftedColor = baseColor.clone().lerp(new THREE.Color('#fbbf24'), colorShift * 0.3)

        colors[i3] = shiftedColor.r
        colors[i3 + 1] = shiftedColor.g
        colors[i3 + 2] = shiftedColor.b
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.customColor.needsUpdate = true

      // Update shader uniforms
      if (particleMaterial.uniforms) {
        particleMaterial.uniforms.time.value = time
        particleMaterial.uniforms.scrollOffset.value = scrollY.current
      }
    }

    // Gentle rotation of entire field
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02
      particlesRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
    }
  })

  return (
    <points ref={particlesRef} material={particleMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-customColor"
          count={count}
          array={particleData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particleData.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-phase"
          count={count}
          array={particleData.phases}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
}
