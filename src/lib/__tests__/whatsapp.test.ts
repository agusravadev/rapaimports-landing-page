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
