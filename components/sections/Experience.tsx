'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface JourneyPanel {
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  gradient: string
  features: string[]
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const panels = gsap.utils.toArray('.journey-panel')

    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const totalScroll = scrollRef.current!.scrollWidth - window.innerWidth

      gsap.to(scrollRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Animate each panel
      panels.forEach((panel: any, index) => {
        gsap.from(panel.querySelector('.panel-content'), {
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getById('horizontal-scroll'),
            start: 'left center',
            end: 'center center',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.8,
          y: 100,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const journeyPanels: JourneyPanel[] = [
    {
      title: 'Découverte',
      subtitle: 'Étape 1',
      description:
        'Marie ouvre WhatsClose en se promenant en ville. L\'app détecte sa position et lui montre ce qui se passe autour d\'elle, maintenant.',
      icon: '🌟',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600',
      features: [
        'Géolocalisation automatique',
        'Carte interactive en temps réel',
        'Filtres par catégorie',
        'Mode découverte aléatoire',
      ],
    },
    {
      title: 'Notification',
      subtitle: 'Étape 2',
      description:
        'Une notification push : "Atelier poterie improvisé chez Claire, à 200m - Commence dans 30min, 3 places restantes".',
      icon: '🔔',
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600',
      features: [
        'Notifications contextuelles',
        'Ciblage intelligent',
        'Alertes temps réel',
        'Préférences personnalisées',
      ],
    },
    {
      title: 'Interaction',
      subtitle: 'Étape 3',
      description:
        'Marie consulte le profil de Claire, voit ses créations, lit les avis, et décide de réserver une place directement depuis l\'app.',
      icon: '💬',
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600',
      features: [
        'Profils enrichis',
        'Messagerie intégrée',
        'Réservation en 1 clic',
        'Paiement sécurisé',
      ],
    },
    {
      title: 'Expérience',
      subtitle: 'Étape 4',
      description:
        'Marie participe à l\'atelier, découvre une passion et rencontre d\'autres passionnés de sa communauté locale.',
      icon: '✨',
      color: 'primary',
      gradient: 'from-primary-500 to-secondary-500',
      features: [
        'Expérience immersive',
        'Création de lien social',
        'Découverte de talents',
        'Communauté locale',
      ],
    },
    {
      title: 'Fidélisation',
      subtitle: 'Étape 5',
      description:
        'Marie devient cliente régulière de Claire, partage son expérience, et découvre d\'autres créateurs grâce aux recommandations.',
      icon: '🤝',
      color: 'secondary',
      gradient: 'from-secondary-500 to-accent-500',
      features: [
        'Programme de fidélité',
        'Partage social',
        'Recommandations IA',
        'Communauté engagée',
      ],
    },
    {
      title: 'Écosystème',
      subtitle: 'Résultat',
      description:
        'Un cercle vertueux se crée : Marie découvre, consomme local, partage, et contribue à faire vivre l\'économie de proximité.',
      icon: '🌍',
      color: 'accent',
      gradient: 'from-accent-500 to-primary-500',
      features: [
        'Économie circulaire',
        'Impact local mesurable',
        'Croissance organique',
        'Viralité positive',
      ],
    },
  ]

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative bg-dark-950 overflow-hidden"
      style={{ height: `${journeyPanels.length * 100}vh` }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-24 pb-12 bg-gradient-to-b from-dark-950 via-dark-950/90 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ opacity }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-secondary-500/10 border border-secondary-500/20 rounded-full mb-6"
            >
              <span className="text-secondary-400 font-semibold text-sm uppercase tracking-wider">
                L'Expérience
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
                Le Voyage
              </span>
              <span className="text-white"> Utilisateur</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-dark-300"
            >
              Scroll horizontalement pour découvrir le parcours
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex gap-8 px-4 md:px-8" id="horizontal-scroll">
          {journeyPanels.map((panel, index) => (
            <div
              key={index}
              className="journey-panel flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[50vw] h-[70vh]"
            >
              <div className="panel-content h-full relative">
                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`h-full bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl border-2 border-dark-700 hover:border-${panel.color}-500/50 transition-colors duration-500 overflow-hidden relative group`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-6">
                      <div className={`inline-block px-3 py-1 bg-${panel.color}-500/10 border border-${panel.color}-500/20 rounded-full mb-4`}>
                        <span className={`text-${panel.color}-400 font-semibold text-xs uppercase tracking-wider`}>
                          {panel.subtitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotate: [0, -10, 10, -10, 0],
                          }}
                          transition={{ duration: 0.5 }}
                          className={`w-20 h-20 bg-gradient-to-br ${panel.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
                        >
                          {panel.icon}
                        </motion.div>

                        <h3 className={`text-4xl md:text-5xl font-bold text-${panel.color}-400`}>
                          {panel.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-dark-200 leading-relaxed mb-8 flex-grow">
                      {panel.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {panel.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-dark-300 text-sm"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-${panel.color}-400`} />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Step indicator */}
                    <div className="mt-6 pt-6 border-t border-dark-700">
                      <div className="flex items-center justify-between text-dark-400 text-sm">
                        <span>Étape {index + 1}/{journeyPanels.length}</span>
                        <span>Scroll pour continuer →</span>
                      </div>
                    </div>
                  </div>

                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>

                {/* Number indicator */}
                <div className="absolute -top-8 -right-8 w-32 h-32 opacity-5 pointer-events-none">
                  <div className="text-[8rem] font-bold leading-none text-white">
                    {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-screen" />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-full px-6 py-3">
          <div className="flex items-center gap-2">
            {journeyPanels.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-dark-600"
                style={{
                  backgroundColor: useTransform(
                    scrollYProgress,
                    [
                      index / journeyPanels.length,
                      (index + 0.5) / journeyPanels.length,
                    ],
                    ['rgb(71, 85, 105)', 'rgb(99, 102, 241)']
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
