# Development Guide

This guide provides comprehensive information for developers working on the WhatsClose project.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Adding New Sections](#adding-new-sections)
- [Creating 3D Components](#creating-3d-components)
- [Animation Best Practices](#animation-best-practices)
- [Performance Optimization](#performance-optimization)
- [Code Style](#code-style)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## Development Setup

### Initial Setup

1. Ensure you have the correct Node.js version:
```bash
node --version  # Should be 18.x or later
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

### Development Tools

#### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Error Lens
- Auto Rename Tag
- Path Intellisense

#### VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Project Architecture

### File Organization

The project follows a feature-based organization:

```
src/
├── app/              # Next.js 14 App Router
├── components/       # React components
│   ├── 3d/          # Three.js components
│   └── sections/    # Page sections
├── lib/             # Utilities and hooks
└── styles/          # Global styles
```

### Path Aliases

Use the `@/` alias for cleaner imports:

```typescript
// Good
import { Button } from '@/components/Button'
import { useScrollProgress } from '@/lib/hooks'

// Bad
import { Button } from '../../../components/Button'
import { useScrollProgress } from '../../lib/hooks/useScrollProgress'
```

Available aliases:
- `@/*` - Root directory
- `@/components/*` - Components directory
- `@/lib/*` - Library directory
- `@/styles/*` - Styles directory
- `@/app/*` - App directory

## Adding New Sections

### Step 1: Create the Section Component

Create a new file in `components/sections/`:

```typescript
// components/sections/NewSection.tsx
'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '@/lib/animations'

export default function NewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          Your Section Title
        </motion.h2>

        <motion.p
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl text-dark-300 text-center max-w-3xl mx-auto"
        >
          Your content here
        </motion.p>
      </div>
    </section>
  )
}
```

### Step 2: Add to Page

Import and add to `app/page.tsx`:

```typescript
import NewSection from '@/components/sections/NewSection'

export default function Home() {
  return (
    <main>
      {/* ... other sections */}
      <NewSection />
      {/* ... */}
    </main>
  )
}
```

### Step 3: Add 3D Background (Optional)

If you want a 3D background for your section:

1. Choose or create a 3D scene type in `components/3d/`
2. Update `BackgroundScene.tsx` to include the new scene
3. Update the `SectionSceneController` in `BackgroundScene.tsx`

```typescript
// In BackgroundScene.tsx
const newSectionRef = useRef<HTMLDivElement>(null)
const newSectionInView = useInView(newSectionRef, { threshold: 0.3 })

useEffect(() => {
  // ... existing logic
  if (newSectionInView) {
    setActiveScene('your-scene-type')
  }
}, [/* add newSectionInView to dependencies */])
```

## Creating 3D Components

### Basic 3D Component Template

```typescript
// components/3d/MyComponent.tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshProps } from '@react-three/fiber'
import * as THREE from 'three'

interface MyComponentProps {
  count?: number
  spread?: number
}

export default function MyComponent({
  count = 100,
  spread = 10
}: MyComponentProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Memoize expensive calculations
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * spread
      positions[i + 1] = (Math.random() - 0.5) * spread
      positions[i + 2] = (Math.random() - 0.5) * spread
    }
    return positions
  }, [count, spread])

  // Animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#6366f1"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
```

### 3D Best Practices

1. **Use Dynamic Imports**: Always import 3D components dynamically to reduce bundle size

```typescript
const MyComponent = dynamic(() => import('./3d/MyComponent'), {
  ssr: false,
})
```

2. **Memoize Expensive Calculations**: Use `useMemo` for geometry and material calculations

3. **Optimize Geometry**:
   - Reuse geometries and materials
   - Use instanced meshes for repeated objects
   - Limit polygon count

4. **Use Buffer Geometry**: For better performance with large datasets

5. **Implement LOD**: For complex scenes, use Level of Detail

```typescript
import { Detailed } from '@react-three/drei'

<Detailed distances={[0, 10, 20]}>
  <mesh>/* high detail */</mesh>
  <mesh>/* medium detail */</mesh>
  <mesh>/* low detail */</mesh>
</Detailed>
```

### Performance Optimization for 3D

```typescript
// Use adaptive pixel ratio
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

<Canvas>
  <AdaptiveDpr pixelated />
  <AdaptiveEvents />
  {/* ... */}
</Canvas>

// Frustum culling - objects outside view are not rendered
<mesh frustumCulled />

// Reduce shadow map size
<directionalLight castShadow shadow-mapSize={[512, 512]} />
```

## Animation Best Practices

### Framer Motion

#### Use Variants

Define animation variants in `lib/animations.ts`:

```typescript
export const customVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}
```

Use them in components:

```typescript
<motion.div
  variants={customVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  Content
</motion.div>
```

#### Performance Tips

1. **Use `will-change` Sparingly**: Only for animations that need it
2. **Animate Transform and Opacity**: These are GPU-accelerated
3. **Use Layout Animations Carefully**: They can be expensive

```typescript
// Good - GPU accelerated
<motion.div
  animate={{ x: 100, opacity: 0.5 }}
/>

// Avoid if possible - triggers reflow
<motion.div
  animate={{ width: "100%" }}
/>
```

### GSAP

Use GSAP for complex timeline animations:

```typescript
import gsap from 'gsap'

useEffect(() => {
  const tl = gsap.timeline()

  tl.from('.element-1', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
  })
  .from('.element-2', {
    opacity: 0,
    x: -50,
    duration: 0.6,
  }, '-=0.4') // Overlap animations

  return () => tl.kill() // Cleanup
}, [])
```

### Scroll-Based Animations

Use Framer Motion's `useScroll` and `useTransform`:

```typescript
import { useScroll, useTransform } from 'framer-motion'

const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

<motion.div style={{ opacity, scale }}>
  Content
</motion.div>
```

## Performance Optimization

### Bundle Optimization

1. **Dynamic Imports**: Split code at route and component level

```typescript
// Route-level
const DashboardPage = dynamic(() => import('./dashboard'))

// Component-level
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
})
```

2. **Optimize Images**: Use Next.js Image component

```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
  loading="lazy"
  quality={85}
/>
```

3. **Font Optimization**: Use next/font

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### Runtime Optimization

1. **Memoization**: Use React.memo, useMemo, useCallback

```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>
})

// Memoize calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

2. **Virtualization**: For long lists, use virtualization

```typescript
// Consider using react-window or react-virtual
import { useVirtualizer } from '@tanstack/react-virtual'
```

3. **Debounce and Throttle**: For frequent events

```typescript
import { debounce } from '@/lib/utils'

const handleScroll = debounce(() => {
  // Handle scroll
}, 100)
```

### Monitoring Performance

Use Next.js built-in tools:

```bash
# Build and analyze bundle
npm run build
# Add to package.json scripts:
# "analyze": "ANALYZE=true next build"
```

Monitor Core Web Vitals:

```typescript
// app/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics
}
```

## Code Style

### TypeScript

1. **Always use types**: Never use `any`

```typescript
// Bad
const data: any = fetchData()

// Good
interface UserData {
  id: string
  name: string
}
const data: UserData = fetchData()
```

2. **Use interfaces for objects, types for unions**

```typescript
// Interfaces for objects
interface ButtonProps {
  label: string
  onClick: () => void
}

// Types for unions and primitives
type Theme = 'light' | 'dark'
type Status = 'idle' | 'loading' | 'success' | 'error'
```

3. **Use generics for reusable types**

```typescript
interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

const response: ApiResponse<UserData> = await fetchUser()
```

### Component Structure

Follow this order:

```typescript
'use client' // or 'use server'

// 1. Imports
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CustomComponent } from '@/components/CustomComponent'

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  children: React.ReactNode
}

// 3. Component
export default function Component({ title, children }: ComponentProps) {
  // 3a. Hooks
  const [state, setState] = useState()

  // 3b. Effects
  useEffect(() => {
    // ...
  }, [])

  // 3c. Handlers
  const handleClick = () => {
    // ...
  }

  // 3d. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Utilities**: camelCase (`useCustomHook.ts`, `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_WIDTH`)
- **CSS Classes**: kebab-case or Tailwind utilities

## Testing

### Unit Tests

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

### Testing 3D Components

```typescript
import { render } from '@react-three/test-renderer'

it('renders 3D component', async () => {
  const renderer = await render(<MyComponent />)
  expect(renderer.scene.children.length).toBeGreaterThan(0)
})
```

## Troubleshooting

### Common Issues

#### 3D Scenes Not Rendering

**Problem**: Black screen or no 3D content

**Solutions**:
1. Check browser console for WebGL errors
2. Ensure canvas has dimensions:
   ```css
   .canvas-container {
     width: 100%;
     height: 100vh;
   }
   ```
3. Verify lights are present in the scene
4. Check camera position

#### Animations Not Working

**Problem**: Framer Motion animations don't trigger

**Solutions**:
1. Ensure component uses `'use client'` directive
2. Check `viewport` prop settings
3. Verify `initial` and `animate` states are different
4. Clear browser cache

#### Performance Issues

**Problem**: Low FPS or janky scrolling

**Solutions**:
1. Check for heavy calculations in render
2. Reduce particle count in 3D scenes
3. Enable `AdaptiveDpr` in Canvas
4. Use `React.memo` for expensive components
5. Check browser DevTools Performance tab

#### TypeScript Errors

**Problem**: Type errors in 3D components

**Solutions**:
1. Install type definitions: `@types/three`
2. Use proper Three.js types:
   ```typescript
   import * as THREE from 'three'
   const mesh = useRef<THREE.Mesh>(null)
   ```

#### Build Errors

**Problem**: Build fails but dev works

**Solutions**:
1. Run type check: `npm run type-check`
2. Check for client-only code in server components
3. Ensure all dynamic imports have `ssr: false` for 3D

### Getting Help

1. Check existing issues on GitHub
2. Review the documentation
3. Ask in team chat
4. Create a detailed issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos
   - Browser and OS info

## Deployment

### Pre-Deployment Checklist

- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Test production build locally: `npm run build && npm run start`
- [ ] Check bundle size: Look for warnings during build
- [ ] Test on multiple browsers
- [ ] Verify all images are optimized
- [ ] Check mobile responsiveness
- [ ] Test 3D scenes on different devices
- [ ] Verify environment variables are set

### Environment Variables

Create `.env.production` for production-specific variables:

```bash
NEXT_PUBLIC_API_URL=https://api.production.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX
```

### Vercel Deployment

1. Push to main branch
2. Vercel auto-deploys
3. Check build logs for any issues
4. Test preview deployment before promoting to production

### Other Platforms

See [README.md](./README.md) for deployment instructions for other platforms.

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs/)

## Contributing

See contribution guidelines in [README.md](./README.md).

For questions or suggestions about this development guide, please open an issue or contact the team.
