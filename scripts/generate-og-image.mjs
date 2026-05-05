import { chromium } from '@playwright/test'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const logoPath = resolve('public/logo.png')
const logoBase64 = readFileSync(logoPath).toString('base64')
const logoSrc = `data:image/png;base64,${logoBase64}`

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    background: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* Subtle red radial glow */
  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(204,0,0,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Top and bottom red bars */
  .bar-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: #CC0000;
  }
  .bar-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: #CC0000;
  }

  /* Content area */
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  /* Logo */
  .logo {
    width: 260px;
    height: auto;
    object-fit: contain;
    margin-bottom: 20px;
  }

  /* Red decorative lines flanking content */
  .line-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 16px;
  }
  .line {
    width: 120px;
    height: 2px;
    background: #CC0000;
  }
  .line-label {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #CC0000;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  /* Headline */
  .headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 88px;
    line-height: 0.9;
    text-transform: uppercase;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.01em;
    margin-bottom: 8px;
  }
  .headline .accent {
    color: #CC0000;
  }

  /* Bottom line + subtitle */
  .divider {
    width: 200px;
    height: 2px;
    background: #CC0000;
    margin: 20px auto 18px;
  }

  .subtitle {
    font-family: 'Barlow', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #A0A0A0;
    letter-spacing: 0.05em;
    text-align: center;
  }
  .subtitle span {
    color: #ffffff;
    font-weight: 500;
  }

  /* Domain tag bottom-right */
  .domain {
    position: absolute;
    bottom: 24px;
    right: 36px;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: #555555;
    letter-spacing: 0.1em;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="bar-top"></div>
  <div class="bar-bottom"></div>

  <div class="content">
    <img class="logo" src="${logoSrc}" alt="RAPA IMPORTS" />

    <div class="line-row">
      <div class="line"></div>
      <span class="line-label">Accesorios automotrices</span>
      <div class="line"></div>
    </div>

    <div class="headline">
      Personalizá tu auto<br/>
      <span class="accent">al siguiente nivel</span>
    </div>

    <div class="divider"></div>

    <div class="subtitle">
      <span>Importación premium</span> · Stock disponible · Encargos exclusivos · <span>Argentina</span>
    </div>
  </div>

  <div class="domain">rapaimports</div>
</body>
</html>`

async function generate() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'networkidle' })

  // Extra wait for Google Fonts to render
  await page.waitForTimeout(1500)

  await page.screenshot({
    path: 'public/og-image.png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  })

  await browser.close()
  console.log('OG image generated → public/og-image.png')
}

generate().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
