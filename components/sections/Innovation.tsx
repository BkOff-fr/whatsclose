'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import gsap from 'gsap'

interface FlowStep {
  icon: string
  title: string
  description: string
}

interface FlowProps {
  type: 'push' | 'pull'
  title: string
  subtitle: string
  color: string
  gradient: string
  steps: FlowStep[]
  isActive: boolean
}

function FlowTimeline({ type, title, subtitle, color, gradient, steps, isActive }: FlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: type === 'push' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: type === 'push' ? -50 : 50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`inline-block px-4 py-2 bg-gradient-to-r ${gradient} rounded-full mb-4`}
            >
              <span className="text-white font-bold text-sm uppercase tracking-wider">
                {subtitle}
              </span>
            </motion.div>
            <h3 className={`text-4xl md:text-5xl font-bold text-${color}-400`}>
              {title}
            </h3>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-dark-700">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className={`w-full bg-gradient-to-b ${gradient}`}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.2,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg z-10`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-dark-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Innovation() {
  const [activeFlow, setActiveFlow] = useState<'push' | 'pull'>('push')
  const sectionRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  useEffect(() => {
    if (!comparisonRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.comparison-card', {
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, comparisonRef)

    return () => ctx.revert()
  }, [])

  const pushSteps: FlowStep[] = [
    {
      icon: '📢',
      title: 'Le créateur publie',
      description:
        'Un artisan boulanger sort ses croissants chauds du four à 7h15 et le publie instantanément sur WhatsClose.',
    },
    {
      icon: '🎯',
      title: 'Ciblage intelligent',
      description:
        'L\'algorithme identifie les utilisateurs dans un rayon de 500m qui aiment les viennoiseries et sont actifs le matin.',
    },
    {
      icon: '🔔',
      title: 'Notification contextuelle',
      description:
        'Une notification push arrive: "Croissants chauds chez Paul, à 2 min à pied - Encore 15 disponibles".',
    },
    {
      icon: '⚡',
      title: 'Action immédiate',
      description:
        'Le consommateur réserve ou se déplace. Conversion en temps réel, stocks optimisés, zéro gaspillage.',
    },
  ]

  const pullSteps: FlowStep[] = [
    {
      icon: '🔍',
      title: 'Le consommateur cherche',
      description:
        'Un utilisateur ouvre WhatsClose Discovery et cherche "restaurant italien" près de chez lui.',
    },
    {
      icon: '🗺️',
      title: 'Découverte géolocalisée',
      description:
        'La carte affiche tous les restaurants italiens dans un rayon paramétrable, avec disponibilités en temps réel.',
    },
    {
      icon: '⭐',
      title: 'Filtrage intelligent',
      description:
        'Filtres par prix, avis, spécialités, horaires d\'ouverture, disponibilité immédiate ou réservation.',
    },
    {
      icon: '🤝',
      title: 'Connexion directe',
      description:
        'Contact direct avec le restaurant, réservation en un clic, accès au menu du jour et aux offres spéciales.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-gradient-to-b from-dark-950 to-dark-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6"
          >
            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
              L'Innovation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Push
            </span>
            <span className="text-white"> & </span>
            <span className="bg-gradient-to-r from-accent-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
              Pull
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-dark-300 leading-relaxed"
          >
            Deux flux complémentaires pour une expérience complète
          </motion.p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-dark-800 rounded-full p-2 border-2 border-dark-700">
            <button
              onClick={() => setActiveFlow('push')}
              className={`relative px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                activeFlow === 'push'
                  ? 'text-white'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
            >
              {activeFlow === 'push' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">📢</span>
                Push Flow
              </span>
            </button>

            <button
              onClick={() => setActiveFlow('pull')}
              className={`relative px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                activeFlow === 'pull'
                  ? 'text-white'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
            >
              {activeFlow === 'pull' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Pull Flow
              </span>
            </button>
          </div>
        </div>

        {/* Flow timeline */}
        <div className="mb-24">
          <FlowTimeline
            type="push"
            title="Push Flow"
            subtitle="De l'offre vers la demande"
            color="primary"
            gradient="from-primary-500 to-secondary-500"
            steps={pushSteps}
            isActive={activeFlow === 'push'}
          />

          <FlowTimeline
            type="pull"
            title="Pull Flow"
            subtitle="De la demande vers l'offre"
            color="accent"
            gradient="from-accent-500 to-primary-500"
            steps={pullSteps}
            isActive={activeFlow === 'pull'}
          />
        </div>

        {/* Comparison */}
        <div ref={comparisonRef} className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Pourquoi c'est révolutionnaire
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="comparison-card bg-red-500/5 border-2 border-red-500/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">❌</span>
                <h4 className="text-2xl font-bold text-red-400">Avant</h4>
              </div>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Information statique et périmée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Découverte limitée aux algorithmes globaux</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Pas de notion de proximité réelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Communication unidirectionnelle</span>
                </li>
              </ul>
            </div>

            <div className="comparison-card bg-accent-500/5 border-2 border-accent-500/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <h4 className="text-2xl font-bold text-accent-400">Avec WhatsClose</h4>
              </div>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start gap-3">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>Temps réel absolu et hyper-local</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>Double flux push/pull intelligent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>Géolocalisation au mètre près</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>Écosystème bidirectionnel et vivant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
