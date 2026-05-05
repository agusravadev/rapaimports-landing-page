'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Ubicaciones', href: '#ubicaciones' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-72 bg-rapa-elevated z-50 flex flex-col p-8 border-l border-rapa-border"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button
              onClick={onClose}
              className="self-end p-2 text-rapa-muted hover:text-white transition-colors mb-8"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col gap-6" aria-label="Menú móvil">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-display font-bold text-2xl uppercase tracking-wider text-white hover:text-rapa-red transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
              <Button href={GENERAL_WA_URL()} variant="whatsapp" size="lg" className="w-full">
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
