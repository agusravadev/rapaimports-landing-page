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
