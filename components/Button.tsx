'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50',
  secondary:
    'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20',
  ghost: 'text-white hover:bg-white/10',
  outline:
    'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative overflow-hidden rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2'

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {/* Animated background gradient for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
          </motion.span>
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
          </motion.span>
        )}
      </span>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
