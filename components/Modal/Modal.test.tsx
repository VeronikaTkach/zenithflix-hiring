import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal component', () => {
  it('does not render when isOpen is false', () => {
    const onClose = vi.fn()
    const { container } = render(<Modal isOpen={false} onClose={onClose}>Hello</Modal>)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders children when open', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('calls onClose when clicking on backdrop', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose}>Child</Modal>)
    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when clicking inside modal content', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inner</button>
      </Modal>
    )
    fireEvent.click(screen.getByText('Inner'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose on Escape key press', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose}>Test</Modal>)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
