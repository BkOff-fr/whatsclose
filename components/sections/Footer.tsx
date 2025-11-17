'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SocialLink {
  icon: string
  label: string
  href: string
  color: string
}

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const socialLinks: SocialLink[] = [
    {
      icon: '📘',
      label: 'Facebook',
      href: '#',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '📷',
      label: 'Instagram',
      href: '#',
      color: 'from-pink-500 to-purple-600',
    },
    {
      icon: '🐦',
      label: 'Twitter',
      href: '#',
      color: 'from-sky-500 to-sky-600',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      href: '#',
      color: 'from-blue-600 to-blue-700',
    },
  ]

  const footerSections: FooterSection[] = [
    {
      title: 'Produit',
      links: [
        { label: 'WhatsClose Store', href: '#store' },
        { label: 'WhatsClose Discovery', href: '#discovery' },
        { label: 'WhatsClose Connect', href: '#connect' },
        { label: 'Tarifs', href: '#pricing' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Guide créateurs', href: '#creators' },
        { label: 'Guide consommateurs', href: '#consumers' },
        { label: 'API', href: '#api' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Carrières', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Confidentialité', href: '#privacy' },
        { label: 'Conditions', href: '#terms' },
        { label: 'Cookies', href: '#cookies' },
        { label: 'Mentions légales', href: '#legal' },
      ],
    },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute -top-1/2 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute -bottom-1/2 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24 border-b border-dark-800"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6"
            >
              <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
                Restez connectés
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Newsletter
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-dark-300 mb-8"
            >
              Recevez les dernières nouveautés et offres exclusives
            </motion.p>

            {/* Newsletter form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  disabled={isSubscribed}
                  className="w-full px-6 py-4 bg-dark-800 border-2 border-dark-700 rounded-full text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 pr-36"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubscribed}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.span>
                  ) : isSubscribed ? (
                    '✓ Inscrit'
                  ) : (
                    'S\'inscrire'
                  )}
                </button>
              </div>

              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-accent-400 text-sm mt-3"
                >
                  Merci de votre inscription!
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="col-span-2"
            >
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  WhatsClose
                </span>
              </h3>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Le système d'exploitation du commerce local. Connectons créateurs et
                consommateurs dans un écosystème vivant.
              </p>

              {/* Social links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + sectionIndex * 0.1 }}
                className="col-span-1"
              >
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="py-8 border-t border-dark-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © 2025 WhatsClose. Tous droits réservés.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                Confidentialité
              </a>
              <a
                href="#terms"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                Conditions
              </a>
              <a
                href="#cookies"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
    </footer>
  )
}
