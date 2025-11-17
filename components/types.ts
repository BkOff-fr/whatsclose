/**
 * Type definitions for UI components
 */

import { LucideIcon } from 'lucide-react'
import { HTMLMotionProps } from 'framer-motion'

// Navigation Types
export interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
}

export interface NavigationProps {
  className?: string
}

// Mobile Menu Types
export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  onItemClick: (href: string) => void
}

// Scroll Progress Types
export type ProgressVariant = 'linear' | 'circular'

export interface ScrollProgressProps {
  variant?: ProgressVariant
  showPercentage?: boolean
}

// Cursor Types
export interface CursorProps {
  color?: string
  size?: number
  magneticStrength?: number
}

// Loading Screen Types
export interface LoadingScreenProps {
  onLoadingComplete?: () => void
  minDuration?: number
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}
