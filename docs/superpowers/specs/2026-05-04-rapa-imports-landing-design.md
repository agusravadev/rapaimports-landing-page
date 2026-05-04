# RAPA IMPORTS — Landing Page Design Spec
**Date:** 2026-05-04  
**Status:** Approved by client  
**Stack:** Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion · GSAP

---

## 1. Business Context

**Company:** RAPA IMPORTS  
**Industry:** Automotive accessories import (Argentina)  
**Model:** Physical stock (immediate delivery) + import-on-demand (exclusive products)  
**Channels:** WhatsApp (primary), Instagram, TikTok, Facebook, Meta Ads  
**Social proof:** +120 satisfied clients  

**Target audiences:**
1. Young car enthusiasts (18–30) — customize for aesthetics and passion
2. Workshops and mechanics — resell and install products

**Products showcased (5 categories):**
- Volantes (steering wheels)
- Alerones (spoilers)
- Pomos (automatic gear shift knobs)
- Difusores (diffusers)
- Ópticas (lights/headlights/taillights)

**Primary goal:** Build trust → showcase products → generate WhatsApp leads  
**Future:** Online store + steering wheel configurator (must not break current architecture)

---

## 2. Information Architecture

Scroll order:

```
1. NAVBAR
2. HERO
3. PRODUCTOS
4. CÓMO FUNCIONA
5. TESTIMONIOS
6. FAQ
7. MAPA
8. CTA FINAL
9. FOOTER
```

**Conversion principle:** Never more than 2 scrolls without a WhatsApp CTA opportunity.  
WhatsApp CTAs appear in: Navbar, Hero (primary CTA), each product card, CTA Final block.

---

## 3. Visual Design System

### Color Palette
```
--color-primary:      #CC0000   /* RAPA red — from logo */
--color-accent:       #FF0000   /* bright red — hovers, glows */
--color-bg:           #000000   /* pure black — main background */
--color-bg-elevated:  #0A0A0A   /* cards, elevated surfaces */
--color-bg-subtle:    #111111   /* section separation */
--color-text:         #FFFFFF   /* primary text */
--color-text-muted:   #A0A0A0   /* secondary/supporting text */
--color-border:       rgba(204,0,0,0.2)  /* red translucent borders */
--color-glow:         rgba(204,0,0,0.4)  /* box-shadow glow color */
```

### Typography
```
Display (headings):   Barlow Condensed ExtraBold — uppercase, high impact
Body:                 Barlow Regular / Medium — consistent family
Mono (stats/data):    JetBrains Mono — animated counters, numbers
```
All fonts loaded via `next/font` (Google Fonts) — no layout shift.

### Typographic Scale
```
6xl  → 4.5rem   (hero headline)
5xl  → 3.75rem  (section titles)
4xl  → 3rem
3xl  → 1.875rem (card titles)
xl   → 1.25rem  (body large)
base → 1rem     (body)
sm   → 0.875rem (captions, labels)
```

### Aesthetic Direction: Dark Automotive Cinematic
The "ONE THING" that makes this landing memorable: **red outline strokes on black** — mirroring the VW Golf illustration in the logo. Key elements (product cards, hero, separators) use red glow borders as if drawn in red light on darkness.

**Supporting details:**
- Grain/noise texture overlay on hero at ~4% opacity (cinematic depth)
- Red decorative lines flanking section subtitles (echoing "—IMPORTS—" logo treatment)
- CTA Final: only section with red as background — creates maximum contrast moment

### Spacing System
Base: 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

### Border Radius
```
sm: 4px  (badges, tags)
md: 8px  (cards)
lg: 16px (large containers)
full: 9999px (pills, avatars)
```

### Shadow / Glow System
```
card-default:   0 0 0 1px var(--color-border)
card-hover:     0 0 24px var(--color-glow), 0 0 0 1px var(--color-accent)
button-hover:   0 0 16px var(--color-glow)
```

### Breakpoints
```
xs:  320px   sm: 375px   md: 768px
lg: 1024px   xl: 1280px  2xl: 1440px
```
Mobile-first approach. Base CSS written for 320px, scaled up with `min-width`.

---

## 4. Section Specifications

### 4.1 NAVBAR
- Transparent background over hero → `#000000` + `backdrop-blur-md` on scroll
- Left: RAPA IMPORTS logo (SVG)
- Center: anchor links → Productos, Cómo funciona, Testimonios, FAQ, Ubicaciones
- Right: WhatsApp button (green `#25D366`)
- Mobile: hamburger icon → animated right-side drawer

### 4.2 HERO
- Full viewport height (`100vh`), black background with grain overlay
- Centered layout (text + CTAs)
- Red decorative line animates left-to-right on page load (GSAP, 0.8s)
- Content:
  ```
  [Decorative red line]
  PERSONALIZÁ TU AUTO
  AL SIGUIENTE NIVEL
  [Decorative red line]
  
  Accesorios de importación premium para quienes
  no se conforman con lo estándar.
  
  [Consultar por WhatsApp]  [Ver productos ↓]
  
  — +120 clientes satisfechos · Stock disponible · Envíos a todo el país —
  ```
- Stats bar uses `JetBrains Mono` with animated counter on scroll entry
- Background: hero product image or logo graphic with outline-red treatment (placeholder until client provides)

### 4.3 PRODUCTOS
- Section title: "NUESTROS PRODUCTOS"
- Grid: 2×3 desktop, 1-col mobile
- Each card (`#0A0A0A`, 8px radius):
  - Product image (placeholder with aspect-ratio 4:3)
  - Badge: "EN STOCK" (green) or "ENCARGO DISPONIBLE" (amber)
  - Category name (Barlow Condensed)
  - Short description (1–2 lines, muted text)
  - "Consultar" button → opens WhatsApp with pre-loaded message per category
  - Hover: scale(1.02) + red glow border animation (Framer Motion)
- Categories: Volantes · Alerones · Pomos · Difusores · Ópticas

### 4.4 CÓMO FUNCIONA
- Section title: "ASÍ DE SIMPLE"
- 3 steps, horizontal desktop / vertical mobile
- Steps:
  ```
  ① CONSULTÁ          ② ELEGÍS               ③ RECIBÍS
  Escribinos por      Del stock disponible    En tu puerta o
  WhatsApp o RRSS     o pedimos tu encargo    en el taller
  ```
- Large step numbers in `--color-primary`
- Connecting animated line between steps (GSAP ScrollTrigger, draws left-to-right)
- Each step icon: minimal SVG in red

### 4.5 TESTIMONIOS
- Section title: "LO QUE DICEN NUESTROS CLIENTES"
- Desktop: 3-column grid. Mobile: snap carousel (CSS scroll-snap)
- Each card:
  - Avatar (client photo or red initial avatar)
  - Name
  - Product purchased (badge)
  - Review text
  - Star rating (5 red stars or partial)
- Content: client provides real testimonials (placeholders in spec)

### 4.6 FAQ
- Section title: "PREGUNTAS FRECUENTES"
- Accordion component (Radix UI primitive)
- Smooth open/close animation (Framer Motion layout animation)
- 8 questions covering:
  1. ¿Cuáles son los métodos de pago?
  2. ¿Hacen envíos a todo el país?
  3. ¿Cuánto tarda un encargo?
  4. ¿Los productos tienen garantía?
  5. ¿Cómo hago un pedido por encargo?
  6. ¿Qué diferencia hay entre stock y encargo?
  7. ¿Instalan los productos?
  8. ¿Puedo personalizar un producto?
- All answers: placeholder text, to be replaced by client

### 4.7 MAPA
- Section title: "DÓNDE ENCONTRARNOS"
- Embedded map: Google Maps iframe (no API key required)
- Two marker types:
  - 🔴 RAPA IMPORTS office (primary location)
  - ⚫ Associated workshops (resellers/installers)
- Sidebar list: name + address per location
- Mobile: list above map
- Placeholder: map centered on Argentina until coordinates provided

### 4.8 CTA FINAL
- Full-width block, background `#CC0000` (only red-background section)
- White text: "¿LISTO PARA TRANSFORMAR TU AUTO?"
- Subtext: "Escribinos y te asesoramos sin compromiso."
- Black button with WhatsApp icon — magnetic hover effect (follows cursor within 80px radius)
- Grain overlay at 3% for consistency

### 4.9 FOOTER
- Black background, red top border line
- Centered logo
- Social icons row: Instagram, TikTok, Facebook (Lucide + custom SVGs)
- Legal: "© 2026 RAPA IMPORTS · Todos los derechos reservados"

---

## 5. Animation Plan

| Element | Library | Trigger | Effect |
|---|---|---|---|
| Hero red lines | GSAP | Page load | Draw left-to-right (scaleX 0→1, 0.8s) |
| Hero text | Framer Motion | Page load | Fade + slide up, staggered |
| Section titles | GSAP ScrollTrigger | Viewport entry | Slide up + fade |
| Product cards | Framer Motion | Viewport entry | Stagger fade-in |
| Product hover | Framer Motion | Hover | scale + glow |
| How it works line | GSAP ScrollTrigger | Viewport entry | Draw left-to-right |
| Stats counter | Custom hook | Viewport entry | Count 0 → value |
| FAQ accordion | Framer Motion | Click | Layout animation |
| Navbar | CSS transition | Scroll | Transparent → solid |
| CTA button | JS mousemove | Hover proximity | Magnetic effect |
| Scroll reveal | GSAP ScrollTrigger | Viewport | Universal enter animation |

**Accessibility:** All animations respect `prefers-reduced-motion` — reduced to instant transitions if enabled.

---

## 6. Technical Architecture

### Stack
```
Framework:     Next.js 14 (App Router, output: 'export')
Language:      TypeScript (strict)
Styling:       Tailwind CSS v3 + CSS custom properties
Animations:    Framer Motion + GSAP + ScrollTrigger
UI primitives: Radix UI (Accordion, Dialog)
Icons:         Lucide React + custom SVGs
Fonts:         next/font (Google: Barlow Condensed, Barlow, JetBrains Mono)
Images:        next/image (WebP optimization, lazy loading)
Map:           Google Maps iframe embed
Forms/WA:      URL-based WhatsApp links (wa.me)
Package mgr:   pnpm
Deploy:        Vercel (free tier, static)
```

### File Structure
```
src/
  app/
    layout.tsx          — Root layout, fonts, metadata
    page.tsx            — Landing page (composes all sections)
    globals.css         — CSS custom properties, base styles
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx
    sections/
      Hero.tsx
      Products.tsx
      HowItWorks.tsx
      Testimonials.tsx
      FAQ.tsx
      Map.tsx
      CTAFinal.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      AnimatedCounter.tsx
      ScrollReveal.tsx
  lib/
    utils.ts            — cn() helper
    constants.ts        — WhatsApp number, social links, product data
    whatsapp.ts         — Pre-loaded message builders per category
  hooks/
    useScrollAnimation.ts
    useMediaQuery.ts
    useMagneticButton.ts
```

### WhatsApp Integration
Each product card generates a pre-loaded WhatsApp message:
```
https://wa.me/54XXXXXXXXXX?text=Hola%20RAPA%20IMPORTS%2C%20me%20interesa%20consultar%20sobre%20[CATEGORIA]
```
Phone number stored in `constants.ts` — single source of truth.

### Performance Targets
- Lighthouse Desktop: 95+ all categories
- Lighthouse Mobile: 90+
- LCP < 2.5s, CLS < 0.1
- All images: WebP via next/image
- Fonts: preloaded, `font-display: swap`

### SEO
- Meta title: "RAPA IMPORTS | Accesorios Automotrices de Importación Premium"
- Meta description: tailored for Meta Ads traffic
- OG image: 1200×630px branded
- Schema.org: LocalBusiness markup

---

## 7. Content Notes

All body text is placeholder — client will provide final copy.  
Product images: placeholders until client uploads to `/resources/images/`.  
Testimonials: placeholders until client provides real reviews.  
Map coordinates: placeholder until client confirms addresses.  
WhatsApp number: placeholder — client to provide.  
FAQ answers: placeholder — client to review and adjust.

---

## 8. Future-Proofing

- **Online store:** Next.js App Router supports adding `/shop` route without restructuring the landing. Component library already established.
- **Steering wheel configurator:** Will be added as `/configurador` route — isolated feature, no impact on landing.
- **Multilanguage:** `next-intl` can be added with minimal refactor (all text already in `constants.ts`).
