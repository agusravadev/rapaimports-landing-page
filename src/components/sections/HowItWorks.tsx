'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Package, Truck } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Consultá',
    description:
      'Escribinos por WhatsApp o redes sociales. Te asesoramos sin compromiso sobre el producto que buscás.',
    Icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Elegís',
    description:
      'Del stock disponible para entrega inmediata, o lo importamos especialmente para vos con acceso a referencias exclusivas.',
    Icon: Package,
  },
  {
    number: '03',
    title: 'Recibís',
    description:
      'En tu puerta o en el taller de tu elección. Rápido, seguro y con garantía en cada producto.',
    Icon: Truck,
  },
]

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
          },
        }
      )
    })
    return () => { ctx.revert() }
  }, [])

  return (
    <section id="como-funciona" className="bg-rapa-black section-border-top py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            El proceso
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Así de Simple
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Animated connecting line — desktop only */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-10 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-rapa-red"
            aria-hidden
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {STEPS.map(({ number, title, description, Icon }, i) => (
              <ScrollReveal
                key={number}
                delay={i * 0.15}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-rapa-elevated border border-rapa-border flex items-center justify-center">
                    <Icon size={28} className="text-rapa-red" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-mono text-xs text-rapa-red bg-rapa-black border border-rapa-border rounded px-1.5 py-0.5">
                    {number}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl uppercase text-white mb-3">
                  {title}
                </h3>
                <p className="font-body text-rapa-muted max-w-xs leading-relaxed">{description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
