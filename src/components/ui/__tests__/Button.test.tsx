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
