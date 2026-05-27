import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Shortener from '@/Components/Shortener/Shortener'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockAddPublicLink } = vi.hoisted(() => ({
  mockAddPublicLink: vi.fn()
}))

vi.mock('@/Service/links.service.js', () => ({
  addPublicLink: mockAddPublicLink
}))

describe('Public Links (Shortener)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('shortens a URL successfully and shows toast', async () => {
    mockAddPublicLink.mockResolvedValue({
      id: 1,
      big_link: 'https://example.com/very-long-url',
      alias: 'abc12',
      short_link: 'https://urlhub.io/abc12',
      title: ''
    })

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('https://biglink.com/etc'), 'https://example.com/very-long-url')

    await user.click(screen.getByRole('button', { name: /make that url shorter/i }))

    await waitFor(() => {
      expect(mockAddPublicLink).toHaveBeenCalledWith({
        bigLink: 'https://example.com/very-long-url'
      })
    })

    expect(await screen.findByText('Link shortened successfully')).toBeInTheDocument()
  })

  it('handles nested API response via service normalization', async () => {
    mockAddPublicLink.mockResolvedValue({
      id: 1,
      big_link: 'https://example.com/very-long-url',
      alias: 'abc12',
      short_link: 'https://urlhub.io/abc12',
      title: ''
    })

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('https://biglink.com/etc'), 'https://example.com/very-long-url')

    await user.click(screen.getByRole('button', { name: /make that url shorter/i }))

    expect(await screen.findByText('Link shortened successfully')).toBeInTheDocument()
  })

  it('shows info toast when user already has a public link', async () => {
    localStorage.setItem('publicLinks', JSON.stringify([{
      id: 1,
      bigLink: 'https://old.com',
      shortLink: 'https://urlhub.io/old'
    }]))

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('https://biglink.com/etc'), 'https://example.com/another-url')

    await user.click(screen.getByRole('button', { name: /make that url shorter/i }))

    expect(await screen.findByText("You've already shortened a link. Please register!")).toBeInTheDocument()
    expect(mockAddPublicLink).not.toHaveBeenCalled()
  })
})
