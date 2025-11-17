'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Sphere, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface LocationMarker {
  id: number
  name: string
  lat: number
  lng: number
  position: THREE.Vector3
  type: 'locker' | 'store' | 'market'
  active: boolean
}

interface MapGlobeProps {
  radius?: number
  markerCount?: number
}

export default function MapGlobe({ radius = 2.5, markerCount = 30 }: MapGlobeProps) {
  const globeRef = useRef<THREE.Mesh>(null!)
  const markersGroupRef = useRef<THREE.Group>(null!)
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)

  // Convert lat/lng to 3D position on sphere
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    )
  }

  // Generate random markers around the globe
  const markers = useMemo<LocationMarker[]>(() => {
    const markerTypes: LocationMarker['type'][] = ['locker', 'store', 'market']
    const cities = [
      'Paris Hub', 'Berlin Locker', 'London Station', 'Amsterdam Central',
      'Barcelona Market', 'Rome Plaza', 'Vienna Corner', 'Prague Square',
      'Budapest Main', 'Warsaw Center', 'Stockholm Port', 'Oslo Downtown',
      'Copenhagen Bay', 'Helsinki North', 'Dublin West', 'Brussels East',
      'Lyon South', 'Milan Station', 'Munich Plaza', 'Hamburg Harbor',
      'Zurich Center', 'Geneva Lake', 'Madrid Hub', 'Lisbon Coast',
      'Athens Port', 'Istanbul Bridge', 'Moscow Red', 'Kiev Independence',
      'Minsk Central', 'Riga Old Town'
    ]

    return Array.from({ length: markerCount }, (_, i) => {
      const lat = (Math.random() - 0.5) * 160 // -80 to 80
      const lng = (Math.random() - 0.5) * 360 // -180 to 180

      return {
        id: i,
        name: cities[i % cities.length],
        lat,
        lng,
        position: latLngToVector3(lat, lng, radius),
        type: markerTypes[Math.floor(Math.random() * markerTypes.length)],
        active: Math.random() > 0.5
      }
    })
  }, [markerCount, radius])

  // Create globe texture with grid lines
  const globeTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid lines
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1

    // Latitude lines
    for (let i = 0; i <= 12; i++) {
      ctx.beginPath()
      ctx.moveTo(0, (i / 12) * canvas.height)
      ctx.lineTo(canvas.width, (i / 12) * canvas.height)
      ctx.stroke()
    }

    // Longitude lines
    for (let i = 0; i <= 24; i++) {
      ctx.beginPath()
      ctx.moveTo((i / 24) * canvas.width, 0)
      ctx.lineTo((i / 24) * canvas.width, canvas.height)
      ctx.stroke()
    }

    // Add subtle noise/stars
    ctx.fillStyle = '#334155'
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.fillRect(x, y, 1, 1)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Rotate globe slowly
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.1
    }

    // Pulse active markers
    if (markersGroupRef.current) {
      markersGroupRef.current.children.forEach((child, i) => {
        if (markers[i].active || hoveredMarker === i || selectedMarker === i) {
          const scale = 1 + Math.sin(time * 3 + i) * 0.2
          child.scale.setScalar(scale)
        }
      })
    }
  })

  const getMarkerColor = (marker: LocationMarker): string => {
    if (selectedMarker === marker.id) return '#fbbf24'
    if (hoveredMarker === marker.id) return '#60a5fa'

    switch (marker.type) {
      case 'locker': return '#6366f1'
      case 'store': return '#8b5cf6'
      case 'market': return '#ec4899'
      default: return '#6366f1'
    }
  }

  const handleMarkerClick = (e: ThreeEvent<MouseEvent>, marker: LocationMarker) => {
    e.stopPropagation()
    setSelectedMarker(marker.id === selectedMarker ? null : marker.id)
  }

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={globeRef} args={[radius, 64, 64]}>
        <meshStandardMaterial
          map={globeTexture}
          transparent
          opacity={0.9}
          metalness={0.1}
          roughness={0.7}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[radius * 1.05, 64, 64]}>
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Location markers */}
      <group ref={markersGroupRef} rotation={[0, 0, 0]}>
        {markers.map((marker) => (
          <group key={marker.id} position={marker.position}>
            {/* Marker pin */}
            <mesh
              onClick={(e) => handleMarkerClick(e, marker)}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredMarker(marker.id)
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                setHoveredMarker(null)
                document.body.style.cursor = 'auto'
              }}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={getMarkerColor(marker)}
                emissive={getMarkerColor(marker)}
                emissiveIntensity={marker.active ? 0.8 : 0.3}
              />
            </mesh>

            {/* Marker glow */}
            {(marker.active || hoveredMarker === marker.id || selectedMarker === marker.id) && (
              <>
                <pointLight
                  position={[0, 0, 0]}
                  color={getMarkerColor(marker)}
                  intensity={1}
                  distance={1}
                />

                {/* Connection beam to globe surface */}
                <mesh position={[0, -0.05, 0]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
                  <meshBasicMaterial
                    color={getMarkerColor(marker)}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              </>
            )}

            {/* Pulse ring for selected marker */}
            {selectedMarker === marker.id && (
              <Sparkles
                count={20}
                scale={0.5}
                size={2}
                speed={0.6}
                color={getMarkerColor(marker)}
              />
            )}
          </group>
        ))}
      </group>

      {/* Rotating ring around globe */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[radius * 1.2, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#8b5cf6" />
    </group>
  )
}
