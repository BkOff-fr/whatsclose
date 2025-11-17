# WhatsClose UI Components Documentation

This document provides an overview of all navigation and UI components created for the WhatsClose website.

## Components Overview

### 1. Navigation.tsx
**Immersive Navigation Bar**

A responsive, animated navigation bar with scroll-based transparency effects.

**Features:**
- Transparent background that becomes solid on scroll
- Smooth transitions using Framer Motion
- Animated gradient logo
- Desktop menu with hover effects and animated underlines
- Mobile hamburger menu button
- Integrated scroll progress indicator
- Smooth scroll to sections

**Usage:**
```tsx
import Navigation from '@/components/Navigation'

export default function Layout() {
  return (
    <>
      <Navigation />
      {/* Your content */}
    </>
  )
}
```

**Props:** None (navigation items are configured internally)

---

### 2. MobileMenu.tsx
**Full-Screen Mobile Menu**

An animated full-screen overlay menu for mobile devices.

**Features:**
- Animated backdrop with blur effect
- Staggered menu item animations
- Icon support for each menu item
- Smooth open/close transitions
- CTA buttons section
- Prevents body scroll when open
- Accessible with ARIA labels

**Usage:**
```tsx
import MobileMenu from '@/components/MobileMenu'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
]

<MobileMenu
  isOpen={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
  items={navItems}
  onItemClick={(href) => handleNavigation(href)}
/>
```

**Props:**
- `isOpen: boolean` - Controls menu visibility
- `onClose: () => void` - Callback when menu should close
- `items: NavItem[]` - Array of navigation items
- `onItemClick: (href: string) => void` - Callback when item is clicked

---

### 3. ScrollProgress.tsx
**Visual Scroll Progress Indicator**

Shows page scroll progress with smooth animations and color transitions.

**Features:**
- Two variants: linear (default) and circular
- Smooth spring animations
- Color transitions based on scroll position
- Optional percentage display
- Section-aware color changes

**Usage:**
```tsx
import ScrollProgress from '@/components/ScrollProgress'

// Linear variant (default)
<ScrollProgress />

// Circular variant with percentage
<ScrollProgress variant="circular" showPercentage />
```

**Props:**
- `variant?: 'linear' | 'circular'` - Display style (default: 'linear')
- `showPercentage?: boolean` - Show scroll percentage (default: false)

---

### 4. Cursor.tsx
**Custom Cursor Effect**

An animated custom cursor that follows the mouse with smooth lerp animation.

**Features:**
- Follows mouse position with spring animation
- Changes appearance on hover over interactive elements
- Magnetic effect that pulls toward buttons/links
- Click animation
- Automatically hidden on touch devices
- Mix-blend-mode for visual effect

**Usage:**
```tsx
import Cursor from '@/components/Cursor'

// Default cursor
<Cursor />

// Custom configuration
<Cursor
  color="rgba(168, 85, 247, 0.5)"
  size={40}
  magneticStrength={0.3}
/>
```

**Props:**
- `color?: string` - Cursor color (default: purple)
- `size?: number` - Cursor size in pixels (default: 40)
- `magneticStrength?: number` - Strength of magnetic effect (default: 0.3)

**Note:** Add `data-cursor-magnetic` attribute to any element for magnetic effect.

---

### 5. LoadingScreen.tsx
**Beautiful Loading Screen**

An animated loading screen with logo animation and progress bar.

**Features:**
- Animated concentric rings
- Gradient logo text
- Progress bar with smooth animation
- Loading percentage display
- Automatic fade out on complete
- Configurable minimum duration

**Usage:**
```tsx
import LoadingScreen from '@/components/LoadingScreen'

<LoadingScreen
  onLoadingComplete={() => console.log('Loading complete!')}
  minDuration={2000}
/>
```

**Props:**
- `onLoadingComplete?: () => void` - Callback when loading finishes
- `minDuration?: number` - Minimum loading time in ms (default: 2000)

---

### 6. Button.tsx
**Reusable Button Component**

A versatile button component with multiple variants and animations.

**Features:**
- 4 variants: primary, secondary, ghost, outline
- 3 sizes: sm, md, lg
- Icon support (left or right position)
- Animated gradient backgrounds
- Ripple effect on click
- Shine effect on hover
- Full-width option
- TypeScript typed with Lucide icons

**Usage:**
```tsx
import Button from '@/components/Button'
import { ArrowRight, Download } from 'lucide-react'

// Basic usage
<Button variant="primary" size="md">
  Click Me
</Button>

// With icon
<Button
  variant="secondary"
  size="lg"
  icon={ArrowRight}
  iconPosition="right"
>
  Get Started
</Button>

// Full width
<Button variant="outline" size="md" fullWidth>
  Subscribe
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost' | 'outline'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `icon?: LucideIcon` - Icon component from lucide-react
- `iconPosition?: 'left' | 'right'` - Icon position (default: 'left')
- `fullWidth?: boolean` - Stretch to full width (default: false)
- `children: ReactNode` - Button content (required)
- All standard button HTML attributes

**Variants:**
- **primary:** Gradient background (purple → pink → blue)
- **secondary:** Semi-transparent with border
- **ghost:** Transparent with hover effect
- **outline:** Border only with hover fill

---

## Installation & Dependencies

All components require the following dependencies (already in package.json):

```json
{
  "framer-motion": "^11.5.4",
  "lucide-react": "latest",
  "tailwindcss": "^3.4.10"
}
```

## Importing Components

Use the barrel export for cleaner imports:

```tsx
import {
  Navigation,
  MobileMenu,
  ScrollProgress,
  Cursor,
  LoadingScreen,
  Button
} from '@/components'
```

Or import individually:

```tsx
import Navigation from '@/components/Navigation'
import Button from '@/components/Button'
```

## Accessibility Features

All components include:
- ✅ Proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Semantic HTML
- ✅ Role attributes where appropriate

## Styling

All components use Tailwind CSS for styling with:
- Responsive design (mobile-first)
- Dark theme optimized
- Gradient colors (purple, pink, blue)
- Smooth transitions and animations
- Glass morphism effects

## Browser Support

Components work in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

**Note:** Custom cursor is automatically hidden on touch devices.

## Performance

- All animations use Framer Motion's optimized animation engine
- Components use React hooks properly (no memory leaks)
- Smooth 60fps animations
- Efficient re-renders with proper memoization

## Example Layout Integration

```tsx
// app/layout.tsx
import { Navigation, Cursor, LoadingScreen } from '@/components'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LoadingScreen />
        <Navigation />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
```

## Customization

### Colors
Modify the gradient colors in each component:
- Primary: `from-purple-500 via-pink-500 to-blue-500`
- Adjust in component files or create a theme config

### Animations
All animations use Framer Motion and can be customized:
- Adjust spring configs: `{ stiffness, damping, mass }`
- Modify transition durations
- Change easing functions

### Responsive Breakpoints
Components use Tailwind's default breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## Tips & Best Practices

1. **Navigation:** Place at the root level of your layout
2. **Cursor:** Add once in the root layout
3. **LoadingScreen:** Show on initial page load only
4. **ScrollProgress:** Works best with long-scroll pages
5. **Button:** Use consistent variants across your app
6. **MobileMenu:** Automatically handles scroll locking

## Troubleshooting

**Q: Cursor not showing?**
- Check if it's a touch device (cursor auto-hides)
- Ensure z-index isn't conflicting

**Q: Scroll progress not updating?**
- Ensure page has scrollable content
- Check that Navigation component is rendered

**Q: Mobile menu not closing?**
- Verify `onClose` callback is properly connected
- Check for body overflow style conflicts

---

Created for WhatsClose by the UI/Navigation Specialist Agent
