'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import Image from 'next/image'
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
        { scaleX: 1, duration: 0.9, ease: 'power2.out', stagger: 0.15, delay: 0.6 }
      )
    })
    return () => { ctx.revert() }
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grain-overlay overflow-hidden bg-rapa-black"
      aria-label="Sección principal"
    >
      {/* Logo watermark — car illustration faintly visible in bg */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        aria-hidden
      >
        {/* Glow amplified behind logo */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-rapa-red/10 blur-[120px]" />
        <Image
          src="/logo.png"
          alt=""
          width={900}
          height={900}
          className="w-[85vw] max-w-[780px] h-auto opacity-[0.13] select-none"
          priority
        />
      </motion.div>

      {/* Bottom gradient — fades logo into content below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000000 30%, transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-16">

        {/* Brand label */}
        <motion.p
          className="font-body text-rapa-red text-xs sm:text-sm uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Accesorios Automotrices · Importación Premium · Argentina
        </motion.p>

        {/* Top red line */}
        <div ref={lineTopRef} className="h-px w-40 sm:w-64 bg-rapa-red mx-auto mb-6" aria-hidden />

        <motion.h1
          className="font-display font-extrabold text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          Personalizá tu auto
          <br />
          <span className="text-gradient-red">al siguiente nivel</span>
        </motion.h1>

        {/* Bottom red line */}
        <div ref={lineBottomRef} className="h-px w-40 sm:w-64 bg-rapa-red mx-auto mt-6 mb-7" aria-hidden />

        <motion.p
          className="font-body text-base sm:text-lg text-rapa-muted max-w-xl mx-auto leading-relaxed"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-16 pt-8 border-t border-rapa-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="text-center">
            <AnimatedCounter
              value={SITE.clientCount}
              suffix="+"
              className="font-display font-extrabold text-4xl sm:text-5xl text-rapa-red"
            />
            <p className="font-body text-xs sm:text-sm text-rapa-muted mt-1 uppercase tracking-wider">
              Clientes satisfechos
            </p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl sm:text-5xl text-rapa-red">Stock</p>
            <p className="font-body text-xs sm:text-sm text-rapa-muted mt-1 uppercase tracking-wider">
              Disponible inmediato
            </p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl sm:text-5xl text-rapa-red">Encargos</p>
            <p className="font-body text-xs sm:text-sm text-rapa-muted mt-1 uppercase tracking-wider">
              Productos exclusivos
            </p>
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
