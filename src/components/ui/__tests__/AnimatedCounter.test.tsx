import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedCounter } from '../AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renders a number in the DOM', () => {
    render(<AnimatedCounter value={120} />)
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('renders suffix when provided', () => {
    render(<AnimatedCounter value={120} suffix="+" />)
    expect(screen.getByText(/\+/)).toBeInTheDocument()
  })

  it('renders prefix when provided', () => {
    render(<AnimatedCounter value={99} prefix=">" />)
    expect(screen.getByText(/>/)).toBeInTheDocument()
  })
})
