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
