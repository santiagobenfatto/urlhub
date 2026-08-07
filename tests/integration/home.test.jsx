import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Home from '@/Pages/Home'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn()
}))

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe('Home demo hub', () => {
  it('renders demo links when unauthenticated', async () => {
    mockFetch.mockResolvedValue({ ok: false })

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
      { initialEntries: ['/'] }
    )

    expect(await screen.findByText('My UrlsHub')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()

    const facebook = screen.getByText('Facebook')
    expect(facebook.closest('a')).toHaveAttribute('href', 'https://www.facebook.com')
    expect(facebook.closest('a')).toHaveAttribute('target', '_blank')
  })

  it('redirects to dashboard when already authenticated', async () => {
    mockFetch.mockResolvedValue({ ok: true })

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
      </Routes>,
      { initialEntries: ['/'] }
    )

    expect(await screen.findByTestId('dashboard')).toBeInTheDocument()
  })
})
