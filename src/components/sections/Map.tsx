import { Building2, Wrench, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MAP_LOCATIONS } from '@/lib/constants'

type LocationType = (typeof MAP_LOCATIONS)[number]['type']

const LOCATION_CONFIG: Record<
  LocationType,
  { icon: typeof Building2; iconClass: string; label: string }
> = {
  office: {
    icon: Building2,
    iconClass: 'text-rapa-red',
    label: 'Oficina',
  },
  workshop: {
    icon: Wrench,
    iconClass: 'text-amber-400',
    label: 'Taller asociado',
  },
}

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
            Oficina central en Junín y taller asociado en Bella Vista
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location list */}
          <ScrollReveal className="lg:col-span-1" direction="left">
            <div className="flex flex-col gap-4">
              {MAP_LOCATIONS.map((loc) => {
                const config = LOCATION_CONFIG[loc.type]
                const Icon = config.icon
                return (
                  <a
                    key={loc.id}
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 p-4 bg-rapa-elevated rounded-lg border border-rapa-border hover:border-rapa-red transition-colors duration-200"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-rapa-subtle border border-rapa-border flex items-center justify-center group-hover:border-rapa-red transition-colors duration-200">
                      <Icon size={18} className={config.iconClass} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-body text-xs font-semibold uppercase tracking-wide text-rapa-muted">
                        {config.label}
                      </span>
                      <p className="font-body font-semibold text-white text-sm mt-0.5">{loc.name}</p>
                      <p className="font-body text-rapa-muted text-xs mt-0.5">{loc.address}</p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-rapa-muted group-hover:text-rapa-red transition-colors duration-200 mt-1"
                    />
                  </a>
                )
              })}

              {/* Legend */}
              <div className="flex items-center gap-6 px-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Building2 size={13} className="text-rapa-red" />
                  <span className="font-body text-xs text-rapa-muted">Oficina</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wrench size={13} className="text-amber-400" />
                  <span className="font-body text-xs text-rapa-muted">Taller asociado</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Map embed — Junín, Buenos Aires (oficina principal) */}
          <ScrollReveal className="lg:col-span-2" direction="right">
            <div className="rounded-lg overflow-hidden border border-rapa-border aspect-video lg:aspect-auto lg:h-80">
              <iframe
                src="https://maps.google.com/maps?q=Avenida+San+Martín+442,+Junín,+Buenos+Aires,+Argentina&output=embed&hl=es&z=15"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de RAPA IMPORTS — Junín, Buenos Aires"
              />
            </div>
            <p className="font-body text-rapa-muted text-xs mt-3 text-center">
              Hacé clic en cada tarjeta para abrir la ubicación en Google Maps
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
