'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Badge, badgeVariantFromLabel } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PRODUCTS, type Product } from '@/lib/constants'
import { buildProductWhatsAppUrl } from '@/lib/whatsapp'

const isPng = (src: string) => src.toLowerCase().endsWith('.png')

function ProductImage({ product }: { product: Product }) {
  if (product.image) {
    const transparent = isPng(product.image)
    return (
      <div className="relative w-full h-full">
        <Image
          src={product.image}
          alt={`${product.name} — RAPA IMPORTS`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.07] drop-shadow-[0_8px_24px_rgba(204,0,0,0.2)]"
        />

        {/* Transparent PNGs: subtle bottom gradient blending product into card body */}
        {transparent ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 35%)' }}
            aria-hidden
          />
        ) : (
          /* JPEGs with potential white bg: radial vignette darkens edges */
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #0A0A0A 88%)' }}
            aria-hidden
          />
        )}

        {/* Red glow on hover — more visible for transparent PNGs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(204,0,0,0.12) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-rapa-subtle to-rapa-black flex items-center justify-center">
      <span className="font-display font-extrabold text-6xl text-rapa-border uppercase select-none">
        {product.name[0]}
      </span>
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        className="group flex flex-col bg-rapa-elevated rounded-xl overflow-hidden border border-rapa-border h-full"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 28px rgba(204,0,0,0.18), 0 0 0 1px #CC0000',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] bg-rapa-black overflow-hidden">
          <ProductImage product={product} />

          {/* Badge — positioned over image top-right */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant={badgeVariantFromLabel(product.badge)}>{product.badge}</Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <h3 className="font-display font-extrabold text-xl uppercase text-white tracking-wide">
            {product.name}
          </h3>

          <p className="font-body text-sm text-rapa-muted leading-relaxed flex-1">
            {product.description}
          </p>

          <Button
            href={buildProductWhatsAppUrl(product.name)}
            variant="primary"
            size="sm"
            className="w-full mt-1"
          >
            <MessageCircle size={16} />
            Consultar
          </Button>
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

export function Products() {
  return (
    <section id="productos" className="bg-rapa-subtle section-border-top py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            Catálogo
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Nuestros Productos
          </h2>
          <p className="font-body text-rapa-muted mt-4 max-w-xl mx-auto">
            Selección premium de accesorios automotrices importados. Stock disponible y pedidos por
            encargo.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
