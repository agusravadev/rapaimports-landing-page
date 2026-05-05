'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useIsScrolled } from '@/hooks/useScrollY'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Proceso', href: '#como-funciona' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Ubicaciones', href: '#ubicaciones' },
]

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative group font-body text-xs font-semibold text-rapa-muted hover:text-white transition-colors duration-200 uppercase tracking-widest whitespace-nowrap py-1"
    >
      {label}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-rapa-red group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  )
}

function WhatsAppButton({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.a
      href={GENERAL_WA_URL()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'hidden sm:inline-flex items-center gap-2.5 font-display font-bold text-xs uppercase tracking-widest rounded-full px-5 py-2.5 transition-all duration-300',
        scrolled
          ? 'bg-[#25D366] text-white shadow-[0_0_18px_rgba(37,211,102,0.3)] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)]'
          : 'border border-[#25D366]/70 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_18px_rgba(37,211,102,0.3)]'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Live pulse dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
      </span>
      WhatsApp
    </motion.a>
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
            ? 'bg-black/92 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_0_rgba(204,0,0,0.12)]'
            : 'bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="banner"
      >
        {/* Thin red accent at very top */}
        <div className="h-[1.5px] w-full bg-rapa-red" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" aria-label="RAPA IMPORTS — inicio" className="shrink-0 -ml-1">
            <motion.div
              animate={{ height: isScrolled ? 44 : 56 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex items-center"
            >
              <Image
                src="/logo-rapaimports-sin-fondo.png"
                alt="RAPA IMPORTS"
                width={200}
                height={56}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* WhatsApp CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <WhatsAppButton scrolled={isScrolled} />
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-white hover:text-rapa-red transition-colors"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
