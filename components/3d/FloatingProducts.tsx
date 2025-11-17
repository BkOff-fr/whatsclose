'use client'

import { useRef, useMemo } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Product {
  id: number
  name: string
  emoji: string
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  rotationVelocity: THREE.Euler
  scale: number
  color: string
}

interface FloatingProductsProps {
  count?: number
}

export default function FloatingProducts({ count = 12 }: FloatingProductsProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const productsRef = useRef<Product[]>([])
  const mouseRef = useRef(new THREE.Vector3())
  const raycasterRef = useRef(new THREE.Raycaster())

  // Product types
  const productTypes = useMemo(() => [
    { emoji: '🍞', name: 'Bread', color: '#f59e0b' },
    { emoji: '☕', name: 'Coffee', color: '#92400e' },
    { emoji: '🥐', name: 'Croissant', color: '#fbbf24' },
    { emoji: '🥖', name: 'Baguette', color: '#d97706' },
    { emoji: '🧃', name: 'Juice', color: '#f97316' },
    { emoji: '🥤', name: 'Drink', color: '#dc2626' },
    { emoji: '🍰', name: 'Cake', color: '#ec4899' },
    { emoji: '🍪', name: 'Cookie', color: '#a16207' },
    { emoji: '🥪', name: 'Sandwich', color: '#65a30d' },
    { emoji: '🍎', name: 'Apple', color: '#dc2626' },
    { emoji: '🍌', name: 'Banana', color: '#fde047' },
    { emoji: '🥛', name: 'Milk', color: '#f3f4f6' },
  ], [])

  // Initialize products
  useMemo(() => {
    productsRef.current = Array.from({ length: count }, (_, i) => {
      const productType = productTypes[i % productTypes.length]
      return {
        id: i,
        name: productType.name,
        emoji: productType.emoji,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationVelocity: new THREE.Euler(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        scale: 0.8 + Math.random() * 0.4,
        color: productType.color
      }
    })
  }, [count, productTypes])

  // Physics and animation
  useFrame(({ clock, camera, pointer }) => {
    const time = clock.getElapsedTime()

    // Update mouse position in 3D space
    mouseRef.current.set(pointer.x * 8, pointer.y * 5, 0)
    mouseRef.current.unproject(camera)

    productsRef.current.forEach((product) => {
      // Floating motion with sine waves
      const floatY = Math.sin(time + product.id) * 0.3
      const floatX = Math.cos(time * 0.5 + product.id) * 0.2

      // Apply floating offset
      product.position.x += floatX * 0.01
      product.position.y += floatY * 0.01

      // Apply velocity
      product.position.add(product.velocity)

      // Boundary checks with soft bounce
      const bounds = { x: 8, y: 5, z: 4 }
      if (Math.abs(product.position.x) > bounds.x) {
        product.velocity.x *= -0.8
        product.position.x = Math.sign(product.position.x) * bounds.x
      }
      if (Math.abs(product.position.y) > bounds.y) {
        product.velocity.y *= -0.8
        product.position.y = Math.sign(product.position.y) * bounds.y
      }
      if (Math.abs(product.position.z) > bounds.z) {
        product.velocity.z *= -0.8
        product.position.z = Math.sign(product.position.z) * bounds.z
      }

      // Damping
      product.velocity.multiplyScalar(0.99)

      // Rotation
      product.rotation.x += product.rotationVelocity.x
      product.rotation.y += product.rotationVelocity.y
      product.rotation.z += product.rotationVelocity.z

      // Mouse interaction - repulsion
      const mouseDistance = product.position.distanceTo(mouseRef.current)
      if (mouseDistance < 3) {
        const repelForce = new THREE.Vector3()
          .subVectors(product.position, mouseRef.current)
          .normalize()
          .multiplyScalar(0.05 * (1 - mouseDistance / 3))
        product.velocity.add(repelForce)
      }
    })
  })

  const handleProductClick = (e: ThreeEvent<MouseEvent>, product: Product) => {
    e.stopPropagation()
    // Add impulse on click
    const direction = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    )
    product.velocity.add(direction)

    // Add rotation impulse
    product.rotationVelocity.x += (Math.random() - 0.5) * 0.1
    product.rotationVelocity.y += (Math.random() - 0.5) * 0.1
    product.rotationVelocity.z += (Math.random() - 0.5) * 0.1
  }

  return (
    <group ref={groupRef}>
      {productsRef.current.map((product) => (
        <group
          key={product.id}
          position={product.position}
          rotation={product.rotation}
          scale={product.scale}
        >
          {/* Product container with glow */}
          <mesh
            onClick={(e) => handleProductClick(e, product)}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial
              color={product.color}
              transparent
              opacity={0.1}
              emissive={product.color}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Product emoji as text */}
          <Text
            fontSize={1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {product.emoji}
          </Text>

          {/* Product name label */}
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {product.name}
          </Text>

          {/* Glow effect */}
          <pointLight
            position={[0, 0, 0]}
            color={product.color}
            intensity={0.5}
            distance={2}
          />
        </group>
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
    </group>
  )
}
