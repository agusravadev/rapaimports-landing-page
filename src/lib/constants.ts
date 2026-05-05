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
    image: '/images/products/volante-modelo.jpeg' as string | null,
  },
  {
    id: 'alerones',
    name: 'Alerones',
    description:
      'Alerones de importación que combinan diseño aerodinámico y acabado premium.',
    badge: 'EN STOCK' as const,
    image: '/images/products/aleron.png' as string | null,
  },
  {
    id: 'pomos',
    name: 'Pomos',
    description:
      'Pomos para caja automática con materiales premium y diseños exclusivos que elevan tu interior.',
    badge: 'EN STOCK' as const,
    image: '/images/products/pomo-botonera-opt.png' as string | null,
  },
  {
    id: 'difusores',
    name: 'Difusores',
    description:
      'Difusores traseros que transforman la estética de tu vehículo con un toque agresivo y deportivo.',
    badge: 'ENCARGO DISPONIBLE' as const,
    image: '/images/products/difusor-gti-modelo.png' as string | null,
  },
  {
    id: 'opticas',
    name: 'Ópticas',
    description:
      'Ópticas delanteras y traseras de importación con tecnología LED y diseño de vanguardia.',
    badge: 'ENCARGO DISPONIBLE' as const,
    image: '/images/products/opticas-traseras-opt.png' as string | null,
  },
]

export type BadgeType = 'EN STOCK' | 'ENCARGO DISPONIBLE'
export type Product = {
  id: string
  name: string
  description: string
  badge: BadgeType
  image: string | null
}

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Federico Petrillo',
    product: 'Volante fibra de carbono · Golf 1.4',
    review:
      'La mejor opción fue confiar en ustedes. De varios volantes que vi en distintos lugares me decidí 100% por este tanto por el precio como por la calidad. No puedo estar más satisfecho.',
    rating: 5,
    avatar: 'F',
  },
  {
    id: 2,
    name: 'Gian Palmiotti',
    product: 'Volante fibra de carbono · Vento GLI',
    review:
      'La estética del auto cambió rotundamente. Además de que queda muy lindo, la calidad de los materiales es de otro nivel. Da placer usar el volante.',
    rating: 5,
    avatar: 'G',
  },
  {
    id: 3,
    name: 'Nicolás Ferraro',
    product: 'Alerón + Difusor fibra de carbono · Golf GTI',
    review:
      'El combo alerón y difusor en fibra de carbono le dio al GTI otro toque. Se nota que son piezas de calidad desde que las tenés en la mano. La atención fue excelente y el envío rapidísimo.',
    rating: 5,
    avatar: 'N',
  },
] as const

export const FAQ_ITEMS = [
  {
    id: 'pago',
    question: '¿Cuáles son los métodos de pago?',
    answer:
      'Aceptamos cualquier método de pago: transferencia bancaria, efectivo, Mercado Pago, tarjetas y también dólares (USD). Elegí el que más te convenga.',
  },
  {
    id: 'envios',
    question: '¿Hacen envíos a todo el país?',
    answer:
      'Sí, enviamos a todo el territorio argentino a través de Andreani, Via Cargo y Correo Argentino. El costo de envío está a cargo del cliente y varía según el destino y el peso del paquete.',
  },
  {
    id: 'tiempo-encargo',
    question: '¿Cuánto tarda un pedido por encargo?',
    answer:
      'Los pedidos por encargo tienen un plazo aproximado de 30 días hábiles. Te confirmamos el tiempo exacto al momento de coordinar el pedido.',
  },
  {
    id: 'garantia',
    question: '¿Los productos tienen garantía?',
    answer:
      'Sí, ofrecemos 3 meses de garantía. La garantía aplica cuando la instalación del producto es realizada por nuestros talleres recomendados o por talleres que forman parte de nuestra red de distribución.',
  },
  {
    id: 'seña-encargo',
    question: '¿Se requiere seña para hacer un encargo?',
    answer:
      'Sí. Para confirmar un encargo solicitamos una seña del 20% del valor del producto. El saldo restante se abona al momento de recibir el pedido.',
  },
  {
    id: 'como-encargar',
    question: '¿Cómo hago un pedido por encargo?',
    answer:
      'Escribinos por WhatsApp con el producto que buscás. Te confirmamos precio y disponibilidad, coordinamos la seña del 20% para reservarlo y te mantenemos informado durante todo el proceso.',
  },
  {
    id: 'stock-vs-encargo',
    question: '¿Qué diferencia hay entre stock y encargo?',
    answer:
      'El stock disponible está en nuestro depósito y se despacha de inmediato. El encargo es para productos que no tenemos en el momento — los importamos especialmente para vos, con acceso a referencias exclusivas o difíciles de conseguir en el mercado local.',
  },
  {
    id: 'personalizacion',
    question: '¿Puedo personalizar un producto?',
    answer:
      'Sí, muchos de nuestros productos son personalizables en materiales, colores y diseño. Contactanos y te asesoramos según el estilo que estás buscando para tu auto.',
  },
] as const

export const MAP_LOCATIONS = [
  {
    id: 'oficina',
    type: 'office' as const,
    name: 'RAPA IMPORTS — Oficina Central',
    address: 'Av. San Martín 442, Junín, Buenos Aires',
    mapsUrl: 'https://maps.google.com/?q=Avenida+San+Martín+442,+Junín,+Buenos+Aires,+Argentina',
    lat: -34.5869,
    lng: -60.9439,
  },
  {
    id: 'taller-bella-vista',
    type: 'workshop' as const,
    name: 'Taller Asociado — Bella Vista',
    address: 'Olegario Andrade 1816, Bella Vista, Buenos Aires',
    mapsUrl: 'https://maps.google.com/?q=Olegario+Andrade+1816,+Bella+Vista,+Buenos+Aires,+Argentina',
    lat: -34.5519,
    lng: -58.6887,
  },
] as const
