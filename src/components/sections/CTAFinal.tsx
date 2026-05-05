'use client'

import { motion } from 'framer-motion'
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
      {/* Diagonal stripe texture — animated */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,0,0,0.04)_40px,rgba(0,0,0,0.04)_80px)]"
        animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-body text-white/70 text-sm uppercase tracking-[0.2em] mb-4">
          Empezá hoy
        </p>
        <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl uppercase text-white leading-none mb-6">
          ¿Listo para personalizar tu auto?
        </h2>
        <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-10">
          Escribinos y te asesoramos sin compromiso. Stock disponible y encargos exclusivos.
        </p>

        <a
          ref={magneticRef}
          href={GENERAL_WA_URL()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-black text-white font-display font-bold text-xl uppercase tracking-wider px-12 py-6 rounded transition-shadow duration-200 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rapa-red"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
          </span>
          <MessageCircle size={24} />
          Consultar por WhatsApp
        </a>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mt-6">
          Respuesta promedio en menos de 5 minutos
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-8 pt-8 border-t border-white/10">
          {['Envíos a todo el país', 'Garantía incluida', '+120 clientes satisfechos'].map((item) => (
            <span key={item} className="font-body text-xs text-white/60 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-rapa-red/70 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
