'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SITE } from '@/lib/constants'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

export function Hero() {
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [lineTopRef.current, lineBottomRef.current],
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.5 }
      )
    })
    return () => { ctx.revert() }
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grain-overlay overflow-hidden bg-rapa-black"
      aria-label="Sección principal"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rapa-red/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Top red line */}
        <div ref={lineTopRef} className="h-px w-48 sm:w-72 bg-rapa-red mx-auto mb-8" aria-hidden />

        <motion.h1
          className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl uppercase leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          Personalizá tu auto
          <br />
          <span className="text-gradient-red">al siguiente nivel</span>
        </motion.h1>

        {/* Bottom red line */}
        <div ref={lineBottomRef} className="h-px w-48 sm:w-72 bg-rapa-red mx-auto mt-8 mb-6" aria-hidden />

        <motion.p
          className="font-body text-lg sm:text-xl text-rapa-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button href={GENERAL_WA_URL()} variant="whatsapp" size="lg">
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </Button>
          <Button href="#productos" variant="secondary" size="lg">
            Ver productos
            <ChevronDown size={20} />
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-16 pt-8 border-t border-rapa-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <div className="text-center">
            <AnimatedCounter
              value={SITE.clientCount}
              suffix="+"
              className="font-display font-extrabold text-4xl text-rapa-red"
            />
            <p className="font-body text-sm text-rapa-muted mt-1">Clientes satisfechos</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl text-rapa-red">Stock</p>
            <p className="font-body text-sm text-rapa-muted mt-1">Disponible inmediato</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl text-rapa-red">Encargos</p>
            <p className="font-body text-sm text-rapa-muted mt-1">Productos exclusivos</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ChevronDown size={24} className="text-rapa-muted" />
      </motion.div>
    </section>
  )
}
