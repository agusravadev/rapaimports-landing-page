'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useIsScrolled } from '@/hooks/useScrollY'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Ubicaciones', href: '#ubicaciones' },
]

export function Navbar() {
  const isScrolled = useIsScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-rapa-border'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" aria-label="RAPA IMPORTS — inicio">
            <Image
              src="/logo.png"
              alt="RAPA IMPORTS"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-rapa-muted hover:text-white transition-colors uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={GENERAL_WA_URL()}
              variant="whatsapp"
              size="sm"
              className="hidden sm:inline-flex"
            >
              WhatsApp
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-white hover:text-rapa-red transition-colors"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
