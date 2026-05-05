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
  primary:
    'bg-rapa-red text-white hover:bg-rapa-red-bright border border-rapa-red hover:shadow-[0_0_16px_rgba(204,0,0,0.4)]',
  secondary:
    'bg-transparent text-white border border-white hover:border-rapa-red hover:text-rapa-red',
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
    const isExternal = href.startsWith('http') || href.startsWith('//')
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
