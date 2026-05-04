import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RAPA IMPORTS | Accesorios Automotrices de Importación Premium',
  description:
    'Importadora de accesorios automotrices premium en Argentina. Volantes, alerones, ópticas, difusores y más. Stock disponible y pedidos por encargo.',
  keywords: [
    'accesorios automotrices',
    'importación Argentina',
    'volantes deportivos',
    'alerones',
    'ópticas LED',
    'personalizar auto',
  ],
  openGraph: {
    title: 'RAPA IMPORTS | Accesorios Automotrices Premium',
    description: 'Personalizá tu auto con accesorios de importación de alta calidad.',
    type: 'website',
    locale: 'es_AR',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAPA IMPORTS | Accesorios Automotrices Premium',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-black text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
