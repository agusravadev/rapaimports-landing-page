# RAPA IMPORTS Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready dark automotive landing page for RAPA IMPORTS that builds trust, showcases 5 product categories, and converts Argentine car enthusiasts and workshops into WhatsApp leads.

**Architecture:** Next.js 14 App Router with `output: 'export'` (fully static). Sections are React Server Components by default; only components requiring interactivity (Navbar scroll, animations, FAQ, magnetic CTA, mobile menu) are marked `'use client'`. WhatsApp CTAs are pre-built URL strings from a single constants file — no backend needed.

**Tech Stack:** Next.js 14 · TypeScript (strict) · Tailwind CSS v3 · Framer Motion · GSAP + ScrollTrigger · Radix UI Accordion · Lucide React · Google Fonts (Barlow Condensed, Barlow, JetBrains Mono) · Vitest + Testing Library · Playwright · pnpm · Vercel

---

## File Map

### Config & Root
- `next.config.ts` — static export config
- `tailwind.config.ts` — design tokens: colors, fonts, animations
- `tsconfig.json` — strict TypeScript
- `.eslintrc.json` — ESLint
- `.prettierrc` — Prettier
- `vitest.config.ts` — unit test runner
- `playwright.config.ts` — E2E config
- `src/test-setup.ts` — jest-dom matchers
- `.env.local` — WA number, social handles
- `.env.example` — template

### App Router
- `src/app/layout.tsx` — fonts, metadata, OG tags
- `src/app/page.tsx` — composes all sections
- `src/app/globals.css` — CSS custom properties, base reset, grain utility, accordion keyframes, scrollbar-hide

### Lib
- `src/lib/utils.ts` — `cn()` class merger (clsx + tailwind-merge)
- `src/lib/constants.ts` — SITE, SOCIAL, PRODUCTS, TESTIMONIALS, FAQ_ITEMS, MAP_LOCATIONS
- `src/lib/whatsapp.ts` — `buildWhatsAppUrl`, `buildCategoryMessage`, `buildProductWhatsAppUrl`, `GENERAL_WA_URL`

### Hooks
- `src/hooks/useScrollY.ts` — scroll position for Navbar
- `src/hooks/useMediaQuery.ts` — breakpoint helpers
- `src/hooks/useMagneticButton.ts` — generic magnetic hover effect

### UI Components
- `src/components/ui/Button.tsx` — primary / secondary / ghost / whatsapp variants; renders `<button>` or `<a>` depending on `href` prop
- `src/components/ui/Badge.tsx` — "EN STOCK" (green) / "ENCARGO DISPONIBLE" (amber)
- `src/components/ui/AnimatedCounter.tsx` — count-up on viewport entry via IntersectionObserver
- `src/components/ui/ScrollReveal.tsx` — Framer Motion fade+slide wrapper, `once: true`

### Layout Components
- `src/components/layout/Navbar.tsx` — transparent → solid on scroll, desktop nav links, WA button, hamburger
- `src/components/layout/MobileMenu.tsx` — right-side Framer Motion drawer
- `src/components/layout/Footer.tsx` — logo, social icons, legal

### Section Components
- `src/components/sections/Hero.tsx` — full viewport, GSAP red lines, Framer Motion entrance, animated stats bar
- `src/components/sections/Products.tsx` — 5-category grid, stock/encargo badges, per-category WA CTA
- `src/components/sections/HowItWorks.tsx` — 3-step process, GSAP animated connector line
- `src/components/sections/Testimonials.tsx` — grid desktop / snap carousel mobile
- `src/components/sections/FAQ.tsx` — Radix UI Accordion with CSS keyframe animation
- `src/components/sections/Map.tsx` — Google Maps iframe + location sidebar
- `src/components/sections/CTAFinal.tsx` — red background block, magnetic button

### Tests
- `src/lib/__tests__/utils.test.ts`
- `src/lib/__tests__/whatsapp.test.ts`
- `src/components/ui/__tests__/Button.test.tsx`
- `src/components/ui/__tests__/AnimatedCounter.test.tsx`
- `tests/e2e/landing.spec.ts`

---

## Task 1: Project Scaffolding

**Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `.eslintrc.json`, `.prettierrc`, `vitest.config.ts`, `playwright.config.ts`, `src/test-setup.ts`, `.env.local`, `.env.example`

- [ ] **Step 1: Initialize Next.js 14 project in the current directory**

```bash
cd "c:\Users\PC\projectos\rapaimports-landing-page"
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Accept all prompts with defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
pnpm add framer-motion gsap @gsap/react @radix-ui/react-accordion lucide-react clsx tailwind-merge
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
```

- [ ] **Step 3: Replace next.config.ts with static export config**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 4: Create .prettierrc**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- [ ] **Step 5: Create .env files**

Create `.env.local`:
```
NEXT_PUBLIC_WA_NUMBER=5491100000000
NEXT_PUBLIC_INSTAGRAM=rapaimports
NEXT_PUBLIC_TIKTOK=rapaimports
NEXT_PUBLIC_FACEBOOK=rapaimports
```

Create `.env.example`:
```
NEXT_PUBLIC_WA_NUMBER=549XXXXXXXXXX
NEXT_PUBLIC_INSTAGRAM=your_handle
NEXT_PUBLIC_TIKTOK=your_handle
NEXT_PUBLIC_FACEBOOK=your_handle
```

- [ ] **Step 6: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 7: Create src/test-setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Create playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 9: Add scripts to package.json**

Merge into the `"scripts"` key in `package.json`:
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 10: Verify dev server starts**

```bash
pnpm dev
```

Expected: Server at http://localhost:3000, default Next.js page renders, no console errors.

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 project with TypeScript, Tailwind, and tooling"
```

---

## Task 2: Design System — Tailwind Config & Global CSS

**Files:** `tailwind.config.ts`, `src/app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rapa: {
          red: '#CC0000',
          'red-bright': '#FF0000',
          black: '#000000',
          elevated: '#0A0A0A',
          subtle: '#111111',
          border: 'rgba(204,0,0,0.2)',
          glow: 'rgba(204,0,0,0.4)',
          muted: '#A0A0A0',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '7xl': ['5rem', { lineHeight: '1' }],
        '6xl': ['4.5rem', { lineHeight: '1' }],
        '5xl': ['3.75rem', { lineHeight: '1' }],
      },
      keyframes: {
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #CC0000;
    --color-accent: #FF0000;
    --color-bg: #000000;
    --color-bg-elevated: #0A0A0A;
    --color-bg-subtle: #111111;
    --color-text: #FFFFFF;
    --color-text-muted: #A0A0A0;
    --color-border: rgba(204, 0, 0, 0.2);
    --color-glow: rgba(204, 0, 0, 0.4);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #000000;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background-color: #CC0000;
    color: white;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #CC0000; border-radius: 2px; }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  .grain-overlay {
    position: relative;
  }

  .grain-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 128px;
    opacity: 0.04;
    pointer-events: none;
    z-index: 1;
  }

  .text-gradient-red {
    background: linear-gradient(135deg, #CC0000, #FF4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-border-top {
    border-top: 1px solid rgba(204, 0, 0, 0.2);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "style: design system — Tailwind tokens, CSS variables, grain/scrollbar utilities"
```

---

## Task 3: Lib — Utils, Constants, WhatsApp Builder

**Files:** `src/lib/utils.ts`, `src/lib/constants.ts`, `src/lib/whatsapp.ts`, `src/lib/__tests__/utils.test.ts`, `src/lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Write failing test for cn()**

Create `src/lib/__tests__/utils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('merges class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('resolves Tailwind conflicts — last wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test src/lib/__tests__/utils.test.ts
```

Expected: FAIL — "Cannot find module '../utils'"

- [ ] **Step 3: Implement src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test src/lib/__tests__/utils.test.ts
```

Expected: PASS — 3 tests

- [ ] **Step 5: Write failing tests for WhatsApp builder**

Create `src/lib/__tests__/whatsapp.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { buildWhatsAppUrl, buildCategoryMessage } from '../whatsapp'

describe('buildWhatsAppUrl', () => {
  it('builds a valid wa.me URL', () => {
    const url = buildWhatsAppUrl('5491100000000', 'Hola')
    expect(url).toBe('https://wa.me/5491100000000?text=Hola')
  })

  it('encodes special characters', () => {
    const url = buildWhatsAppUrl('5491100000000', 'Hola, me interesa')
    expect(url).toContain('Hola%2C%20me%20interesa')
  })
})

describe('buildCategoryMessage', () => {
  it('includes the category name in the message', () => {
    expect(buildCategoryMessage('Volantes')).toContain('Volantes')
  })

  it('generates messages for all 5 categories', () => {
    const categories = ['Volantes', 'Alerones', 'Pomos', 'Difusores', 'Ópticas']
    categories.forEach((cat) => {
      expect(buildCategoryMessage(cat)).toContain(cat)
    })
  })
})
```

- [ ] **Step 6: Run — expect FAIL**

```bash
pnpm test src/lib/__tests__/whatsapp.test.ts
```

Expected: FAIL — "Cannot find module '../whatsapp'"

- [ ] **Step 7: Implement src/lib/whatsapp.ts**

```typescript
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function buildCategoryMessage(category: string): string {
  return `Hola RAPA IMPORTS, me interesa consultar sobre ${category}. ¿Pueden asesorarme?`
}

export function buildProductWhatsAppUrl(category: string): string {
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER ?? ''
  return buildWhatsAppUrl(phone, buildCategoryMessage(category))
}

export function GENERAL_WA_URL(): string {
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER ?? ''
  return buildWhatsAppUrl(phone, 'Hola RAPA IMPORTS, quiero consultar sobre sus productos.')
}
```

- [ ] **Step 8: Run — expect PASS**

```bash
pnpm test src/lib/__tests__/whatsapp.test.ts
```

Expected: PASS — 4 tests

- [ ] **Step 9: Create src/lib/constants.ts**

```typescript
export const SITE = {
  name: 'RAPA IMPORTS',
  tagline: 'Personalizá tu auto al siguiente nivel',
  description:
    'Accesorios de importación premium para quienes no se conforman con lo estándar.',
  clientCount: 120,
}

export const SOCIAL = {
  instagram: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM ?? 'rapaimports'}`,
  tiktok: `https://tiktok.com/@${process.env.NEXT_PUBLIC_TIKTOK ?? 'rapaimports'}`,
  facebook: `https://facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK ?? 'rapaimports'}`,
}

export const PRODUCTS = [
  {
    id: 'volantes',
    name: 'Volantes',
    description:
      'Volantes deportivos de alta calidad con distintos materiales y estilos. Personalizables a tu gusto.',
    badge: 'EN STOCK' as const,
  },
  {
    id: 'alerones',
    name: 'Alerones',
    description:
      'Alerones de importación que combinan diseño aerodinámico y acabado premium.',
    badge: 'EN STOCK' as const,
  },
  {
    id: 'pomos',
    name: 'Pomos',
    description:
      'Pomos para caja automática con materiales premium y diseños exclusivos que elevan tu interior.',
    badge: 'EN STOCK' as const,
  },
  {
    id: 'difusores',
    name: 'Difusores',
    description:
      'Difusores traseros que transforman la estética de tu vehículo con un toque agresivo y deportivo.',
    badge: 'ENCARGO DISPONIBLE' as const,
  },
  {
    id: 'opticas',
    name: 'Ópticas',
    description:
      'Ópticas delanteras y traseras de importación con tecnología LED y diseño de vanguardia.',
    badge: 'ENCARGO DISPONIBLE' as const,
  },
] as const

export type Product = (typeof PRODUCTS)[number]
export type BadgeType = Product['badge']

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Martín G.',
    product: 'Volante',
    review:
      'Calidad increíble, llegó en perfectas condiciones y el acabado es de otro nivel. 100% recomendable.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    name: 'Lucas R.',
    product: 'Alerón',
    review:
      'Lo encargué y llegó antes de lo esperado. La atención fue excelente desde el primer mensaje.',
    rating: 5,
    avatar: 'L',
  },
  {
    id: 3,
    name: 'Federico P.',
    product: 'Ópticas LED',
    review:
      'Las ópticas transformaron completamente el frente del auto. Materiales de primera calidad.',
    rating: 5,
    avatar: 'F',
  },
] as const

export const FAQ_ITEMS = [
  {
    id: 'pago',
    question: '¿Cuáles son los métodos de pago?',
    answer:
      'Aceptamos transferencia bancaria, efectivo y los principales medios de pago digitales. Consultanos por más detalles.',
  },
  {
    id: 'envios',
    question: '¿Hacen envíos a todo el país?',
    answer:
      'Sí, realizamos envíos a todo el territorio argentino a través de correo privado. El costo varía según la ubicación.',
  },
  {
    id: 'tiempo-encargo',
    question: '¿Cuánto tarda un pedido por encargo?',
    answer:
      'Los tiempos varían según el producto y su origen. En promedio entre 15 y 30 días hábiles. Te informamos el plazo exacto al confirmar el pedido.',
  },
  {
    id: 'garantia',
    question: '¿Los productos tienen garantía?',
    answer:
      'Sí, todos nuestros productos cuentan con garantía por defectos de fabricación. Ante cualquier problema, nos contactás y lo resolvemos.',
  },
  {
    id: 'como-encargar',
    question: '¿Cómo hago un pedido por encargo?',
    answer:
      'Escribinos por WhatsApp con el producto que querés. Te confirmamos disponibilidad y precio, y coordinamos el pago y el plazo de entrega.',
  },
  {
    id: 'stock-vs-encargo',
    question: '¿Qué diferencia hay entre stock y encargo?',
    answer:
      'El stock disponible está en nuestro depósito y se envía de inmediato. El encargo implica importar el producto puntualmente para vos — más tiempo, pero acceso a referencias exclusivas.',
  },
  {
    id: 'instalacion',
    question: '¿Instalan los productos?',
    answer:
      'No instalamos directamente, pero contamos con talleres asociados que pueden hacerlo. Consultanos y te damos opciones cerca tuyo.',
  },
  {
    id: 'personalizacion',
    question: '¿Puedo personalizar un producto?',
    answer:
      'Sí, varios de nuestros productos son personalizables (materiales, colores, diseño). Contactanos y te asesoramos según lo que estás buscando.',
  },
] as const

export const MAP_LOCATIONS = [
  {
    id: 'oficina',
    type: 'office' as const,
    name: 'RAPA IMPORTS — Oficina Central',
    address: 'Dirección a confirmar — Argentina',
    lat: -34.6037,
    lng: -58.3816,
  },
] as const
```

- [ ] **Step 10: Commit**

```bash
git add src/lib/
git commit -m "feat: lib — utils, constants, WhatsApp URL builder with full test coverage"
```

---

## Task 4: Root Layout & Fonts

**Files:** `src/app/layout.tsx`, `src/app/page.tsx` (stub)

- [ ] **Step 1: Replace src/app/layout.tsx**

```typescript
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
```

- [ ] **Step 2: Create stub src/app/page.tsx**

```typescript
export default function Home() {
  return (
    <main>
      <p className="text-white p-8 font-display text-4xl uppercase">RAPA IMPORTS — Building...</p>
    </main>
  )
}
```

- [ ] **Step 3: Verify fonts load**

```bash
pnpm dev
```

Expected: http://localhost:3000 shows white text on black, no font errors in console.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: root layout with Barlow fonts, SEO metadata, and OG tags"
```

---

## Task 5: Core UI Components

**Files:** `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/AnimatedCounter.tsx`, `src/components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Write failing test for Button**

Create `src/components/ui/__tests__/Button.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children as a button by default', () => {
    render(<Button>Consultar</Button>)
    expect(screen.getByRole('button', { name: 'Consultar' })).toBeInTheDocument()
  })

  it('renders as an anchor when href is provided', () => {
    render(<Button href="https://wa.me/123">Consultar</Button>)
    expect(screen.getByRole('link', { name: 'Consultar' })).toBeInTheDocument()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button').className).toContain('bg-rapa-red')
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test src/components/ui/__tests__/Button.test.tsx
```

Expected: FAIL — "Cannot find module '../Button'"

- [ ] **Step 3: Implement src/components/ui/Button.tsx**

```typescript
'use client'

import { cn } from '@/lib/utils'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonBaseProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variants: Record<NonNullable<ButtonBaseProps['variant']>, string> = {
  primary: 'bg-rapa-red text-white hover:bg-rapa-red-bright border border-rapa-red hover:shadow-[0_0_16px_rgba(204,0,0,0.4)]',
  secondary: 'bg-transparent text-white border border-white hover:border-rapa-red hover:text-rapa-red',
  ghost: 'bg-transparent text-rapa-muted hover:text-white',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BC5A] border border-[#25D366]',
}

const sizes: Record<NonNullable<ButtonBaseProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rapa-red focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test src/components/ui/__tests__/Button.test.tsx
```

Expected: PASS — 3 tests

- [ ] **Step 5: Implement src/components/ui/Badge.tsx**

```typescript
import { cn } from '@/lib/utils'
import type { BadgeType } from '@/lib/constants'

type BadgeProps = {
  children: string
  variant?: 'stock' | 'encargo'
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  stock: 'bg-green-900/40 text-green-400 border border-green-700/50',
  encargo: 'bg-amber-900/40 text-amber-400 border border-amber-700/50',
}

export function Badge({ children, variant = 'stock', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-body font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function badgeVariantFromLabel(label: BadgeType): BadgeProps['variant'] {
  return label === 'EN STOCK' ? 'stock' : 'encargo'
}
```

- [ ] **Step 6: Write failing test for AnimatedCounter**

Create `src/components/ui/__tests__/AnimatedCounter.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedCounter } from '../AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renders a number', () => {
    render(<AnimatedCounter value={120} />)
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('renders suffix when provided', () => {
    render(<AnimatedCounter value={120} suffix="+" />)
    expect(screen.getByText(/\+/)).toBeInTheDocument()
  })

  it('renders prefix when provided', () => {
    render(<AnimatedCounter value={99} prefix="+" />)
    expect(screen.getByText(/\+/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 7: Run — expect FAIL**

```bash
pnpm test src/components/ui/__tests__/AnimatedCounter.test.tsx
```

Expected: FAIL — "Cannot find module '../AnimatedCounter'"

- [ ] **Step 8: Implement src/components/ui/AnimatedCounter.tsx**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return (
    <span ref={ref} className={cn('font-mono tabular-nums', className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
```

- [ ] **Step 9: Run — expect PASS**

```bash
pnpm test src/components/ui/__tests__/AnimatedCounter.test.tsx
```

Expected: PASS — 3 tests

- [ ] **Step 10: Implement src/components/ui/ScrollReveal.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

const directionOffset = {
  up: { y: 30, x: 0 },
  left: { y: 0, x: -30 },
  right: { y: 0, x: 30 },
  none: { y: 0, x: 0 },
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 11: Run all unit tests**

```bash
pnpm test
```

Expected: PASS — all tests

- [ ] **Step 12: Commit**

```bash
git add src/components/ui/
git commit -m "feat: UI components — Button, Badge, AnimatedCounter, ScrollReveal with tests"
```

---

## Task 6: Hooks

**Files:** `src/hooks/useScrollY.ts`, `src/hooks/useMediaQuery.ts`, `src/hooks/useMagneticButton.ts`

- [ ] **Step 1: Implement src/hooks/useScrollY.ts**

```typescript
'use client'

import { useEffect, useState } from 'react'

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}
```

- [ ] **Step 2: Implement src/hooks/useMediaQuery.ts**

```typescript
'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
```

- [ ] **Step 3: Implement src/hooks/useMagneticButton.ts**

```typescript
'use client'

import { useRef, useEffect } from 'react'

export function useMagneticButton<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 80

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength
        el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`
      } else {
        el.style.transform = 'translate(0, 0)'
      }
    }

    const onMouseLeave = () => {
      el.style.transition = 'transform 0.4s ease'
      el.style.transform = 'translate(0, 0)'
    }

    const onMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease'
    }

    document.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [strength])

  return ref
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: hooks — useScrollY, useMediaQuery, useMagneticButton"
```

---

## Task 7: Layout — Navbar, MobileMenu, Footer

**Files:** `src/components/layout/Navbar.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: Implement src/components/layout/MobileMenu.tsx**

```typescript
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
```

- [ ] **Step 2: Implement src/components/layout/Navbar.tsx**

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollY } from '@/hooks/useScrollY'
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
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 60

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
```

- [ ] **Step 3: Implement src/components/layout/Footer.tsx**

```typescript
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import { SOCIAL } from '@/lib/constants'

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-rapa-black border-t border-rapa-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/logo.png"
            alt="RAPA IMPORTS"
            width={160}
            height={56}
            className="h-12 w-auto object-contain"
          />

          <div className="flex items-center gap-6" role="list" aria-label="Redes sociales">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rapa-muted hover:text-rapa-red transition-colors"
              aria-label="Instagram de RAPA IMPORTS"
              role="listitem"
            >
              <Instagram size={20} />
            </a>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rapa-muted hover:text-rapa-red transition-colors"
              aria-label="TikTok de RAPA IMPORTS"
              role="listitem"
            >
              <TikTokIcon size={20} />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rapa-muted hover:text-rapa-red transition-colors"
              aria-label="Facebook de RAPA IMPORTS"
              role="listitem"
            >
              <Facebook size={20} />
            </a>
          </div>

          <p className="text-rapa-muted text-sm text-center">
            © {new Date().getFullYear()} RAPA IMPORTS · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Save logo to public/**

Copy the RAPA IMPORTS logo image (provided by the client at conversation start) to:
```
public/logo.png
```

The logo has a black background (#000000) which blends with the site background — no need for transparent version, though PNG with transparency is preferred if available.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/ public/
git commit -m "feat: layout — Navbar with scroll behavior, MobileMenu drawer, Footer"
```

---

## Task 8: Hero Section

**Files:** `src/components/sections/Hero.tsx`

- [ ] **Step 1: Implement src/components/sections/Hero.tsx**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SITE } from '@/lib/constants'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

export function Hero() {
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [lineTopRef.current, lineBottomRef.current],
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.5 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grain-overlay overflow-hidden bg-rapa-black"
      aria-label="Sección principal"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rapa-red/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Top red line */}
        <div ref={lineTopRef} className="h-px w-48 sm:w-72 bg-rapa-red mx-auto mb-8" aria-hidden />

        <motion.h1
          className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl uppercase leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          Personalizá tu auto
          <br />
          <span className="text-gradient-red">al siguiente nivel</span>
        </motion.h1>

        {/* Bottom red line */}
        <div ref={lineBottomRef} className="h-px w-48 sm:w-72 bg-rapa-red mx-auto mt-8 mb-6" aria-hidden />

        <motion.p
          className="font-body text-lg sm:text-xl text-rapa-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button href={GENERAL_WA_URL()} variant="whatsapp" size="lg">
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </Button>
          <Button href="#productos" variant="secondary" size="lg">
            Ver productos
            <ChevronDown size={20} />
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-16 pt-8 border-t border-rapa-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <div className="text-center">
            <AnimatedCounter
              value={SITE.clientCount}
              suffix="+"
              className="font-display font-extrabold text-4xl text-rapa-red"
            />
            <p className="font-body text-sm text-rapa-muted mt-1">Clientes satisfechos</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl text-rapa-red">Stock</p>
            <p className="font-body text-sm text-rapa-muted mt-1">Disponible inmediato</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-rapa-border" aria-hidden />
          <div className="text-center">
            <p className="font-display font-extrabold text-4xl text-rapa-red">Encargos</p>
            <p className="font-body text-sm text-rapa-muted mt-1">Productos exclusivos</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ChevronDown size={24} className="text-rapa-muted" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero section — GSAP red lines, Framer Motion entrance, animated stats bar"
```

---

## Task 9: Products Section

**Files:** `src/components/sections/Products.tsx`

- [ ] **Step 1: Implement src/components/sections/Products.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Badge, badgeVariantFromLabel } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PRODUCTS, type Product } from '@/lib/constants'
import { buildProductWhatsAppUrl } from '@/lib/whatsapp'

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        className="group flex flex-col bg-rapa-elevated rounded-lg overflow-hidden border border-rapa-border h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Placeholder image — replace with next/image once client provides photos */}
        <div className="relative aspect-[4/3] bg-rapa-subtle overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-rapa-subtle to-rapa-black flex items-center justify-center">
            <span className="font-display font-extrabold text-6xl text-rapa-border uppercase select-none">
              {product.name[0]}
            </span>
          </div>
          <motion.div
            className="absolute inset-0 bg-rapa-red/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_0_1px_#CC0000]" />
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-extrabold text-xl uppercase text-white">
              {product.name}
            </h3>
            <Badge variant={badgeVariantFromLabel(product.badge)}>{product.badge}</Badge>
          </div>

          <p className="font-body text-sm text-rapa-muted leading-relaxed flex-1">
            {product.description}
          </p>

          <Button
            href={buildProductWhatsAppUrl(product.name)}
            variant="primary"
            size="sm"
            className="w-full mt-2"
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Products.tsx
git commit -m "feat: Products section — 5-category grid with animated cards and per-category WhatsApp CTA"
```

---

## Task 10: How It Works Section

**Files:** `src/components/sections/HowItWorks.tsx`

- [ ] **Step 1: Implement src/components/sections/HowItWorks.tsx**

```typescript
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
    return () => ctx.revert()
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
              <ScrollReveal key={number} delay={i * 0.15} className="flex flex-col items-center text-center">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HowItWorks.tsx
git commit -m "feat: HowItWorks section — 3 steps with GSAP animated connector line"
```

---

## Task 11: Testimonials Section

**Files:** `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Implement src/components/sections/Testimonials.tsx**

```typescript
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
          className={i < rating ? 'text-rapa-red fill-rapa-red' : 'text-rapa-border fill-rapa-border'}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: Testimonials section — grid desktop, snap carousel mobile, star ratings"
```

---

## Task 12: FAQ Section

**Files:** `src/components/sections/FAQ.tsx`

- [ ] **Step 1: Implement src/components/sections/FAQ.tsx**

```typescript
'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FAQ_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function FAQItem({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[number]
  index: number
}) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <Accordion.Item
        value={item.id}
        className="border border-rapa-border rounded-lg overflow-hidden mb-3"
      >
        <Accordion.Header>
          <Accordion.Trigger
            className={cn(
              'w-full flex items-center justify-between gap-4 p-5 text-left group',
              'font-body font-semibold text-white bg-rapa-elevated',
              'hover:bg-rapa-subtle transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rapa-red focus-visible:ring-inset'
            )}
          >
            <span className="text-sm sm:text-base">{item.question}</span>
            <ChevronDown
              size={18}
              className="shrink-0 text-rapa-red transition-transform duration-300 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <div className="px-5 py-4 bg-rapa-black border-t border-rapa-border">
            <p className="font-body text-rapa-muted text-sm leading-relaxed">{item.answer}</p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </ScrollReveal>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="bg-rapa-black section-border-top py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            Dudas frecuentes
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Preguntas Frecuentes
          </h2>
        </ScrollReveal>

        <Accordion.Root type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={item.id} item={item} index={i} />
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FAQ.tsx
git commit -m "feat: FAQ section — Radix UI accordion with slide animations"
```

---

## Task 13: Map Section

**Files:** `src/components/sections/Map.tsx`

- [ ] **Step 1: Implement src/components/sections/Map.tsx**

```typescript
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
                <a href="#" className="text-rapa-red hover:underline">
                  Contactanos
                </a>{' '}
                para sumarte a nuestra red.
              </p>
            </div>
          </ScrollReveal>

          {/* Map embed */}
          <ScrollReveal className="lg:col-span-2" direction="right">
            <div className="rounded-lg overflow-hidden border border-rapa-border aspect-video lg:aspect-auto lg:h-80">
              {/*
                Replace the src URL below with the actual Google Maps embed URL once
                the client confirms the office address. Generate it from:
                maps.google.com → Share → Embed a map → Copy HTML → extract src URL
              */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Map.tsx
git commit -m "feat: Map section — Google Maps iframe with location sidebar"
```

---

## Task 14: CTA Final Section

**Files:** `src/components/sections/CTAFinal.tsx`

- [ ] **Step 1: Implement src/components/sections/CTAFinal.tsx**

```typescript
'use client'

import { MessageCircle } from 'lucide-react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { GENERAL_WA_URL } from '@/lib/whatsapp'

export function CTAFinal() {
  const magneticRef = useMagneticButton<HTMLAnchorElement>(0.35)

  return (
    <section
      className="relative grain-overlay bg-rapa-red py-20 sm:py-28 overflow-hidden section-border-top"
      aria-label="Llamada a la acción"
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,0,0,0.04)_40px,rgba(0,0,0,0.04)_80px)]"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-body text-white/70 text-sm uppercase tracking-[0.2em] mb-4">
          Empezá hoy
        </p>
        <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl uppercase text-white leading-none mb-6">
          ¿Listo para personalizar tu auto?
        </h2>
        <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-10">
          Escribinos y te asesoramos sin compromiso. Stock disponible y encargos exclusivos.
        </p>

        <a
          ref={magneticRef}
          href={GENERAL_WA_URL()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-black text-white font-display font-bold text-lg uppercase tracking-wider px-10 py-5 rounded transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rapa-red"
        >
          <MessageCircle size={24} />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CTAFinal.tsx
git commit -m "feat: CTAFinal section — red block with magnetic button and stripe texture"
```

---

## Task 15: Page Composition

**Files:** `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx with full composition**

```typescript
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Products } from '@/components/sections/Products'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Map } from '@/components/sections/Map'
import { CTAFinal } from '@/components/sections/CTAFinal'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Map />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify all sections**

```bash
pnpm dev
```

Open http://localhost:3000 and verify:
- Navbar appears, becomes solid on scroll
- Hero shows with animated red lines and stats bar
- Products grid shows 5 cards
- How It Works shows 3 steps
- Testimonials grid / carousel visible
- FAQ accordion opens/closes
- Map iframe loads
- CTA Final is red block
- Footer shows logo and social icons
- No horizontal scroll at 375px viewport

- [ ] **Step 3: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose full landing page — all 9 sections integrated"
```

---

## Task 16: E2E Tests & Build Verification

**Files:** `tests/e2e/landing.spec.ts`

- [ ] **Step 1: Create tests/e2e/landing.spec.ts**

```typescript
import { test, expect } from '@playwright/test'

test.describe('RAPA IMPORTS Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/RAPA IMPORTS/)
  })

  test('navbar is visible on load', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible()
  })

  test('hero H1 and both CTAs are present', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /Consultar por WhatsApp/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Ver productos/i })).toBeVisible()
  })

  test('all 5 product categories are visible', async ({ page }) => {
    await page.locator('#productos').scrollIntoViewIfNeeded()
    for (const name of ['Volantes', 'Alerones', 'Pomos', 'Difusores', 'Ópticas']) {
      await expect(page.getByRole('heading', { name, level: 3 })).toBeVisible()
    }
  })

  test('FAQ accordion opens and closes', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded()
    const trigger = page.getByRole('button', { name: /métodos de pago/i })
    await trigger.click()
    await expect(page.getByText(/Aceptamos transferencia/)).toBeVisible()
    await trigger.click()
    await expect(page.getByText(/Aceptamos transferencia/)).not.toBeVisible()
  })

  test('map iframe renders', async ({ page }) => {
    await page.locator('#ubicaciones').scrollIntoViewIfNeeded()
    await expect(page.getByTitle('Ubicación de RAPA IMPORTS')).toBeVisible()
  })

  test('no horizontal scroll at 375px mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('WhatsApp links point to wa.me', async ({ page }) => {
    const links = page.getByRole('link').filter({ hasText: /WhatsApp/i })
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
    const href = await links.first().getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\//)
  })
})
```

- [ ] **Step 2: Install Playwright browsers**

```bash
pnpm exec playwright install --with-deps chromium
```

Expected: Chromium downloaded, no errors.

- [ ] **Step 3: Run E2E tests**

```bash
pnpm test:e2e --project=chromium
```

Expected: All tests pass.

- [ ] **Step 4: Run all unit tests**

```bash
pnpm test
```

Expected: All unit tests pass.

- [ ] **Step 5: Production build**

```bash
pnpm build
```

Expected: Build completes, `out/` directory created with static files.

- [ ] **Step 6: Final commit and tag**

```bash
git add tests/
git commit -m "test: E2E tests for all landing sections and responsive behavior"
git tag v1.0.0
```

---

## Task 17: Deploy to Vercel

- [ ] **Step 1: Push repository to GitHub**

```bash
git remote add origin https://github.com/[username]/rapaimports-landing-page.git
git push -u origin main
```

- [ ] **Step 2: Create Vercel project**

1. Go to vercel.com → New Project
2. Import the GitHub repository
3. Framework preset: Next.js (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_WA_NUMBER` = client's actual number (format: `549XXXXXXXXXX`, no `+`)
   - `NEXT_PUBLIC_INSTAGRAM` = actual handle
   - `NEXT_PUBLIC_TIKTOK` = actual handle
   - `NEXT_PUBLIC_FACEBOOK` = actual handle
5. Click Deploy

- [ ] **Step 3: Verify deployed site**

- Open Vercel URL on desktop and mobile (real device)
- Confirm all WhatsApp CTAs open wa.me correctly with pre-loaded messages
- Confirm logo displays correctly
- Confirm FAQ opens/closes
- Run Lighthouse on the Vercel URL — target: Desktop 95+, Mobile 90+

---

## Post-Launch Content Checklist

These items must be replaced before handoff to the client:

- [ ] `NEXT_PUBLIC_WA_NUMBER` env var — actual WhatsApp number (format: `549XXXXXXXXXX`)
- [ ] `public/logo.png` — actual logo file (PNG with black background or transparent PNG)
- [ ] Product images — replace the placeholder divs in `Products.tsx` with `<Image>` from `next/image` pointing to client's photos in `/public/images/products/`
- [ ] Testimonials in `src/lib/constants.ts` → `TESTIMONIALS` array — replace 3 placeholders with client's real reviews (name, product, review text)
- [ ] FAQ answers in `src/lib/constants.ts` → `FAQ_ITEMS` — client reviews and approves each answer
- [ ] Map iframe `src` URL — regenerate embed from Google Maps with actual office address: Maps → Share → Embed a map → copy `src` attribute
- [ ] Map coordinates in `constants.ts` → `MAP_LOCATIONS` — actual `lat`/`lng` for office
- [ ] Social URLs in `constants.ts` → `SOCIAL` — verify all handles are correct
- [ ] OG image — create `public/og-image.png` at 1200×630px with RAPA IMPORTS branding
