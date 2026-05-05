'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useIsScrolled } from '@/hooks/useScrollY'
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

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative group font-body text-sm font-medium text-rapa-muted hover:text-white transition-colors duration-200 uppercase tracking-widest py-1"
    >
      {label}
      {/* Animated red underline sliding left → right on hover */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-rapa-red group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  )
}

export function Navbar() {
  const isScrolled = useIsScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-colors duration-300',
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-rapa-border shadow-[0_1px_0_0_rgba(204,0,0,0.15)]'
            : 'bg-transparent'
        )}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="banner"
      >
        {/* Accent line at very top — always visible */}
        <div className="h-[2px] w-full bg-rapa-red" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo — shrinks on scroll */}
          <a href="#" aria-label="RAPA IMPORTS — inicio" className="flex items-center shrink-0">
            <motion.div
              animate={{ height: isScrolled ? 72 : 108 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex items-center"
            >
              <Image
                src="/logo-rapaimports-sin-fondo.png"
                alt="RAPA IMPORTS"
                width={300}
                height={108}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.a
              href={GENERAL_WA_URL()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden sm:inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider rounded transition-all duration-300 px-4 py-2.5',
                isScrolled
                  ? 'bg-[#25D366] text-white hover:bg-[#20BC5A]'
                  : 'border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white'
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={15} />
              WhatsApp
            </motion.a>

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
