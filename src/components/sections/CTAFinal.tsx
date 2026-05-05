'use client'

import { MessageCircle } from 'lucide-react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

export function CTAFinal() {
  const magneticRef = useMagneticButton<HTMLAnchorElement>(0.35)

  return (
    <section
      className="relative grain-overlay bg-rapa-red py-20 sm:py-28 overflow-hidden section-border-top"
      aria-label="Llamada a la acción"
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,0,0,0.04)_40px,rgba(0,0,0,0.04)_80px)]"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-body text-white/70 text-sm uppercase tracking-[0.2em] mb-4">
          Empezá hoy
        </p>
        <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl uppercase text-white leading-none mb-6">
          ¿Listo para transformar tu auto?
        </h2>
        <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-10">
          Escribinos y te asesoramos sin compromiso. Stock disponible y encargos exclusivos.
        </p>

        <a
          ref={magneticRef}
          href={GENERAL_WA_URL()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-black text-white font-display font-bold text-lg uppercase tracking-wider px-10 py-5 rounded transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rapa-red"
        >
          <MessageCircle size={24} />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  )
}
