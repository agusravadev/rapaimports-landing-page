import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TESTIMONIALS } from '@/lib/constants'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Calificación: ${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating ? 'text-rapa-red fill-rapa-red' : 'text-rapa-border fill-rapa-border'
          }
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
}) {
  return (
    <ScrollReveal delay={index * 0.12}>
      <article className="flex flex-col gap-4 bg-rapa-elevated rounded-lg p-6 border border-rapa-border h-full">
        <StarRating rating={testimonial.rating} />

        <blockquote className="font-body text-white/90 text-sm leading-relaxed flex-1">
          &ldquo;{testimonial.review}&rdquo;
        </blockquote>

        <div className="flex items-center gap-3 pt-4 border-t border-rapa-border">
          <div
            className="w-10 h-10 rounded-full bg-rapa-red flex items-center justify-center font-display font-bold text-white text-lg shrink-0"
            aria-hidden
          >
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-body font-semibold text-white text-sm">{testimonial.name}</p>
            <p className="font-body text-rapa-muted text-xs">Compró: {testimonial.product}</p>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-rapa-subtle section-border-top py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            Opiniones reales
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Lo que dicen nuestros clientes
          </h2>
        </ScrollReveal>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Mobile snap carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="snap-start shrink-0 w-[82vw]">
              <TestimonialCard testimonial={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
