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
