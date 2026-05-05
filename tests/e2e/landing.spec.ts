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

  test('hero H1 is present', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('hero has WhatsApp CTA link', async ({ page }) => {
    const waLink = page.getByRole('link', { name: /Consultar por WhatsApp/i }).first()
    await expect(waLink).toBeVisible()
    const href = await waLink.getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\//)
  })

  test('products section exists with all 5 categories', async ({ page }) => {
    await page.locator('#productos').scrollIntoViewIfNeeded()
    for (const name of ['Volantes', 'Alerones', 'Pomos', 'Difusores', 'Ópticas']) {
      await expect(page.getByRole('heading', { name, level: 3 })).toBeVisible()
    }
  })

  test('FAQ accordion opens on click', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded()
    const trigger = page.getByRole('button', { name: /métodos de pago/i })
    await expect(trigger).toBeVisible()
    await trigger.click()
    await expect(page.getByText(/Aceptamos transferencia/)).toBeVisible()
  })

  test('map section is present', async ({ page }) => {
    await page.locator('#ubicaciones').scrollIntoViewIfNeeded()
    await expect(page.getByTitle('Ubicación de RAPA IMPORTS')).toBeVisible()
  })

  test('no horizontal scroll at 375px mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
