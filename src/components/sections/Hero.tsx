'use client'

import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SITE } from '@/lib/constants'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grain-overlay overflow-hidden bg-rapa-black"
      aria-label="Sección principal"
    >
      {/* Technical grid background — automotive blueprint aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden
      />

      {/* Glow principal más intenso */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-rapa-red/10 blur-[120px] pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      {/* Glow inferior dramático */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-rapa-red/8 to-transparent pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">

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

        <motion.p
          className="font-body text-lg sm:text-xl text-rapa-muted max-w-2xl mx-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href={GENERAL_WA_URL()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-display font-bold uppercase tracking-wider text-base px-8 py-4 rounded-full shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_36px_rgba(37,211,102,0.5)] transition-shadow duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Consultar por WhatsApp
          </motion.a>
          <Button href="#productos" variant="secondary" size="lg" className="rounded-full">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-rapa-muted/50 uppercase">Scroll</span>
        <ChevronDown size={18} className="text-rapa-muted/60" />
      </motion.div>
    </section>
  )
}
