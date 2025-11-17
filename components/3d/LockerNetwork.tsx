'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LockerNode {
  position: THREE.Vector3
  connections: number[]
  scale: number
  phase: number
}

interface LockerNetworkProps {
  nodeCount?: number
  spread?: number
  connectionDistance?: number
}

export default function LockerNetwork({
  nodeCount = 50,
  spread = 10,
  connectionDistance = 3
}: LockerNetworkProps) {
  const nodesRef = useRef<THREE.InstancedMesh>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const glowRef = useRef<THREE.Points>(null!)
  const hoveredRef = useRef<number>(-1)

  // Generate network nodes with connections
  const networkData = useMemo(() => {
    const nodes: LockerNode[] = []

    // Create nodes in a 3D space
    for (let i = 0; i < nodeCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      )

      nodes.push({
        position,
        connections: [],
        scale: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      })
    }

    // Calculate connections based on distance
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < connectionDistance) {
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
        }
      }
    }

    return nodes
  }, [nodeCount, spread, connectionDistance])

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    const color1 = new THREE.Color('#6366f1')
    const color2 = new THREE.Color('#8b5cf6')

    networkData.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        if (i < connectionIndex) { // Avoid duplicate lines
          positions.push(
            node.position.x, node.position.y, node.position.z,
            networkData[connectionIndex].position.x,
            networkData[connectionIndex].position.y,
            networkData[connectionIndex].position.z
          )

          // Gradient colors
          colors.push(color1.r, color1.g, color1.b)
          colors.push(color2.r, color2.g, color2.b)
        }
      })
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    return geometry
  }, [networkData])

  // Initialize instanced mesh positions
  useEffect(() => {
    if (!nodesRef.current) return

    const matrix = new THREE.Matrix4()
    const color = new THREE.Color()

    networkData.forEach((node, i) => {
      matrix.setPosition(node.position)
      nodesRef.current.setMatrixAt(i, matrix)

      // Color based on connection count
      const connectionRatio = node.connections.length / 10
      color.setHSL(0.6 + connectionRatio * 0.15, 0.8, 0.5)
      nodesRef.current.setColorAt(i, color)
    })

    nodesRef.current.instanceMatrix.needsUpdate = true
    if (nodesRef.current.instanceColor) {
      nodesRef.current.instanceColor.needsUpdate = true
    }
  }, [networkData])

  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Animate nodes with pulsing effect
    if (nodesRef.current) {
      const matrix = new THREE.Matrix4()
      const scale = new THREE.Vector3()

      networkData.forEach((node, i) => {
        const pulseScale = 1 + Math.sin(time * 2 + node.phase) * 0.2
        scale.set(
          node.scale * pulseScale,
          node.scale * pulseScale,
          node.scale * pulseScale
        )

        // Add slight rotation
        const rotation = new THREE.Euler(
          time * 0.2 + node.phase,
          time * 0.3 + node.phase,
          time * 0.1 + node.phase
        )

        matrix.compose(node.position, new THREE.Quaternion().setFromEuler(rotation), scale)
        nodesRef.current.setMatrixAt(i, matrix)
      })

      nodesRef.current.instanceMatrix.needsUpdate = true
    }

    // Animate line opacity with wave effect
    if (linesRef.current && linesRef.current.material) {
      const material = linesRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(time * 0.5) * 0.2
    }

    // Rotate entire network slowly
    if (nodesRef.current) {
      nodesRef.current.rotation.y = time * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Locker nodes - instanced cubes */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodeCount]}
      >
        <boxGeometry args={[0.3, 0.3, 0.3]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.3, 0.3, 0.3)]} />
        </boxGeometry>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Glow particles at each node */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={networkData.length}
            array={new Float32Array(networkData.flatMap(n => [n.position.x, n.position.y, n.position.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color="#8b5cf6"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Ambient glow effect */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#6366f1" distance={20} />
    </group>
  )
}
