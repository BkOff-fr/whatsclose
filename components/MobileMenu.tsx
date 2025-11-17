'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Home, Zap, Map, Users, Mail, ArrowRight } from 'lucide-react'
import Button from './Button'

interface NavItem {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  onItemClick: (href: string) => void
}

const iconMap: Record<string, any> = {
  Home: Home,
  Features: Zap,
  'How It Works': Map,
  About: Users,
  Contact: Mail,
}

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  closed: {
    opacity: 0,
    x: -50,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const backdropVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  onItemClick,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-gradient-to-br from-black via-purple-900/20 to-black z-50 md:hidden overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col min-h-full p-8 pt-24">
              {/* Navigation Items */}
              <nav className="flex-1 space-y-2" role="navigation">
                {items.map((item, index) => {
                  const Icon = iconMap[item.label] || ArrowRight
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-4 text-white/80 hover:text-white p-4 rounded-lg hover:bg-white/5 transition-colors group"
                      variants={itemVariants}
                      onClick={(e) => {
                        e.preventDefault()
                        onItemClick(item.href)
                      }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={24} className="text-purple-400 group-hover:text-pink-400 transition-colors" />
                      <span className="text-xl font-medium">{item.label}</span>
                    </motion.a>
                  )
                })}
              </nav>

              {/* CTA Section */}
              <motion.div
                className="space-y-4 pt-8 border-t border-white/10"
                variants={itemVariants}
              >
                <Button variant="primary" size="lg" fullWidth>
                  Get Started
                </Button>
                <Button variant="ghost" size="lg" fullWidth>
                  Learn More
                </Button>
              </motion.div>

              {/* Social Links or Additional Info */}
              <motion.div
                className="pt-8 text-center text-white/50 text-sm"
                variants={itemVariants}
              >
                <p>&copy; 2025 WhatsClose. All rights reserved.</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
