import { MapPin, Building2 } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MAP_LOCATIONS } from '@/lib/constants'

export function Map() {
  return (
    <section id="ubicaciones" className="bg-rapa-subtle section-border-top py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            Encontranos
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Dónde Encontrarnos
          </h2>
          <p className="font-body text-rapa-muted mt-4">
            Oficina central y talleres asociados en Argentina
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location list */}
          <ScrollReveal className="lg:col-span-1" direction="left">
            <div className="flex flex-col gap-4">
              {MAP_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="flex gap-4 p-4 bg-rapa-elevated rounded-lg border border-rapa-border"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-rapa-red/10 border border-rapa-border flex items-center justify-center">
                    {loc.type === 'office' ? (
                      <Building2 size={18} className="text-rapa-red" />
                    ) : (
                      <MapPin size={18} className="text-rapa-muted" />
                    )}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{loc.name}</p>
                    <p className="font-body text-rapa-muted text-xs mt-0.5">{loc.address}</p>
                  </div>
                </div>
              ))}

              <p className="font-body text-rapa-muted text-xs mt-2 leading-relaxed">
                ¿Sos un taller interesado en revender nuestros productos?{' '}
                <a href="#faq" className="text-rapa-red hover:underline">
                  Contactanos
                </a>{' '}
                para sumarte a nuestra red.
              </p>
            </div>
          </ScrollReveal>

          {/* Map embed */}
          <ScrollReveal className="lg:col-span-2" direction="right">
            <div className="rounded-lg overflow-hidden border border-rapa-border aspect-video lg:aspect-auto lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208637.43!2d-58.530804!3d-34.615651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd9cdac447b53%3A0x2b0a98e80ec2c823!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1714832000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de RAPA IMPORTS"
              />
            </div>
            <p className="font-body text-rapa-muted text-xs mt-3 text-center">
              Las coordenadas se actualizarán con la dirección oficial confirmada.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
