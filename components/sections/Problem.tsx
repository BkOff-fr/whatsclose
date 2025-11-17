'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface PainPoint {
  icon: string
  title: string
  description: string
}

interface ColumnProps {
  title: string
  subtitle: string
  color: string
  gradient: string
  painPoints: PainPoint[]
  delay: number
}

function ProblemColumn({ title, subtitle, color, gradient, painPoints, delay }: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className="relative"
    >
      {/* Card */}
      <div className="relative h-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 hover:border-primary-500/30 transition-all duration-500">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
            className={`inline-block px-4 py-2 bg-gradient-to-r ${gradient} rounded-full mb-4`}
          >
            <span className={`text-${color}-300 font-bold text-sm uppercase tracking-wider`}>
              {subtitle}
            </span>
          </motion.div>
          <h3 className={`text-3xl md:text-4xl font-bold text-${color}-400 mb-4`}>
            {title}
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
        </div>

        {/* Pain points */}
        <div className="space-y-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.4 + index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className={`relative p-4 bg-dark-900/50 rounded-2xl border border-dark-700 transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'border-primary-500/50 bg-dark-900/80 shadow-lg shadow-primary-500/10 scale-[1.02]'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    animate={
                      hoveredIndex === index
                        ? { scale: 1.2, rotate: [0, -10, 10, 0] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl flex items-center justify-center text-2xl"
                  >
                    {point.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {point.title}
                    </h4>
                    <p className="text-dark-300 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="hoverIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradient} opacity-20 rounded-3xl blur-2xl`} />
    </motion.div>
  )
}

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const creatorsProblems: PainPoint[] = [
    {
      icon: '📢',
      title: 'Visibilité limitée',
      description: 'Difficile de se faire connaître face aux grandes plateformes et aux budgets marketing importants.',
    },
    {
      icon: '💸',
      title: 'Coûts élevés',
      description: 'Les commissions des plateformes et les frais publicitaires grèvent les marges déjà faibles.',
    },
    {
      icon: '⏰',
      title: 'Gestion complexe',
      description: 'Jongler entre plusieurs canaux de vente et outils de communication prend un temps précieux.',
    },
    {
      icon: '🎯',
      title: 'Ciblage difficile',
      description: 'Atteindre la bonne audience locale au bon moment reste un défi quotidien.',
    },
  ]

  const consumersProblems: PainPoint[] = [
    {
      icon: '🔍',
      title: 'Découverte limitée',
      description: 'Les algorithmes favorisent les grandes enseignes, cachant les pépites locales uniques.',
    },
    {
      icon: '⏱️',
      title: 'Informations obsolètes',
      description: 'Horaires, disponibilité, nouveautés... Les infos en ligne sont rarement à jour.',
    },
    {
      icon: '🗺️',
      title: 'Fragmentation',
      description: 'Il faut consulter multiples apps et sites pour découvrir ce qui se passe autour de soi.',
    },
    {
      icon: '🤝',
      title: 'Manque de connexion',
      description: 'Difficile de créer une relation authentique avec les commerces et créateurs locaux.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-dark-950"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6"
          >
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
              Le Problème
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">La Double </span>
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Contrainte
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-dark-300 leading-relaxed"
          >
            Le commerce local souffre d'un problème systémique qui affecte{' '}
            <span className="text-primary-400 font-semibold">créateurs</span> et{' '}
            <span className="text-secondary-400 font-semibold">consommateurs</span>.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <ProblemColumn
            title="Créateurs"
            subtitle="Artisans · Commerçants"
            color="primary"
            gradient="from-primary-500/20 to-primary-600/20"
            painPoints={creatorsProblems}
            delay={0.3}
          />

          <ProblemColumn
            title="Consommateurs"
            subtitle="Habitants · Visiteurs"
            color="secondary"
            gradient="from-secondary-500/20 to-secondary-600/20"
            painPoints={consumersProblems}
            delay={0.5}
          />
        </div>

        {/* Central connector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50">
            <span className="text-5xl">⚡</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-ping opacity-20" />
        </motion.div>
      </div>
    </section>
  )
}
