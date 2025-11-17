'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface PillarProps {
  icon: string
  title: string
  subtitle: string
  description: string
  features: string[]
  color: string
  gradient: string
  index: number
}

function EcosystemPillar({
  icon,
  title,
  subtitle,
  description,
  features,
  color,
  gradient,
  index,
}: PillarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: isExpanded ? 5 : 0,
          z: isExpanded ? 50 : 0,
          scale: isExpanded ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative h-full bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl overflow-hidden border-2 border-dark-700 hover:border-primary-500/50 transition-colors duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient overlay */}
        <motion.div
          animate={{ opacity: isExpanded ? 0.1 : 0.05 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            animate={{
              scale: isExpanded ? 1.2 : 1,
              rotate: isExpanded ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg text-4xl`}>
              {icon}
            </div>
          </motion.div>

          {/* Title */}
          <div className="mb-4">
            <motion.div
              animate={{ x: isExpanded ? 5 : 0 }}
              className={`inline-block px-3 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-full mb-3`}
            >
              <span className={`text-${color}-400 font-semibold text-xs uppercase tracking-wider`}>
                {subtitle}
              </span>
            </motion.div>
            <h3 className={`text-3xl md:text-4xl font-bold text-${color}-400 mb-4`}>
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-dark-200 text-lg leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          {/* Features */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-4 border-t border-dark-700">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={
                    isExpanded ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                  }
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${color}-400 mt-2`} />
                  <span className="text-dark-300 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expand indicator */}
          <motion.div
            animate={{ y: isExpanded ? 5 : 0 }}
            className="mt-6 flex items-center gap-2 text-dark-400 text-sm"
          >
            <span>Hover pour plus</span>
            <motion.span
              animate={{ x: isExpanded ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* 3D depth effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

        {/* Shine effect */}
        <motion.div
          animate={{
            x: isExpanded ? ['-100%', '100%'] : '-100%',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{ width: '50%' }}
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        animate={{
          scale: isExpanded ? 1.05 : 1,
          opacity: isExpanded ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-2xl -z-10`}
      />
    </motion.div>
  )
}

export default function Ecosystem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const pillars: Omit<PillarProps, 'index'>[] = [
    {
      icon: '🏪',
      title: 'WhatsClose Store',
      subtitle: 'Pilier 1',
      description:
        'La vitrine digitale locale. Un espace où les créateurs présentent leurs offres en temps réel, visible par les consommateurs à proximité.',
      features: [
        'Profils riches et dynamiques',
        'Gestion de catalogue temps réel',
        'Stories et actualités',
        'Notifications push géolocalisées',
      ],
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: '🎯',
      title: 'WhatsClose Discovery',
      subtitle: 'Pilier 2',
      description:
        'L\'algorithme intelligent qui connecte l\'offre et la demande locale. Découvrez ce qui se passe autour de vous, maintenant.',
      features: [
        'Recommandations personnalisées',
        'Recherche géolocalisée avancée',
        'Filtres intelligents',
        'Découverte sérendipité',
      ],
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: '💬',
      title: 'WhatsClose Connect',
      subtitle: 'Pilier 3',
      description:
        'La couche sociale qui crée du lien. Messages, réservations, fidélité... L\'écosystème relationnel du commerce local.',
      features: [
        'Messagerie intégrée',
        'Système de réservation',
        'Programme de fidélité',
        'Avis et recommandations',
      ],
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full mb-6"
          >
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
              L'Écosystème
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Les </span>
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              3 Piliers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-dark-300 leading-relaxed"
          >
            Une architecture tripartite pour un écosystème complet et cohérent
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {pillars.map((pillar, index) => (
            <EcosystemPillar key={index} {...pillar} index={index} />
          ))}
        </div>

        {/* Connection flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-dark-800/30 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
              Comment tout s'articule
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {[
                { label: 'Store', color: 'primary' },
                { label: 'Discovery', color: 'secondary' },
                { label: 'Connect', color: 'accent' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.3,
                    }}
                    className={`px-6 py-3 bg-${item.color}-500/20 border-2 border-${item.color}-500/40 rounded-full`}
                  >
                    <span className={`text-${item.color}-400 font-semibold`}>
                      {item.label}
                    </span>
                  </motion.div>

                  {index < 2 && (
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: index * 0.3,
                      }}
                      className="hidden md:block text-2xl text-dark-500"
                    >
                      →
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-dark-300 mt-8 leading-relaxed">
              Chaque pilier fonctionne de manière autonome tout en s'intégrant
              parfaitement aux autres pour créer une expérience fluide et cohérente.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
