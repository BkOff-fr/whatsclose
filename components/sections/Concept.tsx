'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatProps {
  value: string
  label: string
  delay: number
}

function AnimatedStat({ value, label, delay }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-lg text-dark-300">{label}</div>
    </motion.div>
  )
}

export default function Concept() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !textRef.current || !visualRef.current) return

    const ctx = gsap.context(() => {
      // Title animation with split text effect
      const titleWords = titleRef.current!.querySelectorAll('.word')
      gsap.from(titleWords, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Parallax effect on visual
      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-gradient-to-b from-dark-900 to-dark-950"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6"
          >
            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
              Le Concept
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="word inline-block">Le </span>
            <span className="word inline-block bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">Système </span>
            <span className="word inline-block bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">d'exploitation </span>
            <br />
            <span className="word inline-block text-white">du </span>
            <span className="word inline-block text-white">commerce </span>
            <span className="word inline-block text-white">local</span>
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Text content */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl text-dark-200 leading-relaxed">
              WhatsClose révolutionne le commerce local en créant un écosystème
              où <span className="text-primary-400 font-semibold">créateurs</span> et{' '}
              <span className="text-secondary-400 font-semibold">consommateurs</span> se
              rencontrent naturellement.
            </p>

            <p className="text-lg md:text-xl text-dark-300 leading-relaxed">
              Nous ne sommes pas une simple marketplace. Nous sommes le système
              d'exploitation qui fait vivre le commerce local, en temps réel, avec
              intelligence et proximité.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              {['Temps réel', 'Géolocalisé', 'Intelligent', 'Local'].map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-400/30 rounded-full"
                >
                  <span className="text-primary-300 font-medium">{tag}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual element with 3D effect */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Central hub */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl shadow-2xl shadow-primary-500/50 flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-2xl">WhatsClose</span>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              {[
                { icon: '🏪', angle: 0, color: 'from-primary-400 to-primary-600' },
                { icon: '👥', angle: 120, color: 'from-secondary-400 to-secondary-600' },
                { icon: '📍', angle: 240, color: 'from-accent-400 to-accent-600' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: [item.angle, item.angle + 360],
                  }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl shadow-xl flex items-center justify-center text-3xl`}
                  >
                    {item.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          <AnimatedStat value="100%" label="Local" delay={0.2} />
          <AnimatedStat value="<5min" label="Temps de réponse" delay={0.4} />
          <AnimatedStat value="∞" label="Possibilités" delay={0.6} />
        </div>
      </div>
    </section>
  )
}
