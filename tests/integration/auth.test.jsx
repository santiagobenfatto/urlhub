import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Dashboard from '@/Pages/Dashboard'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockLogout, mockGetUserLinks } = vi.hoisted(() => ({
  mockLogout: vi.fn(),
  mockGetUserLinks: vi.fn()
}))

vi.mock('@/Service/logout.service.js', () => ({
  logout: mockLogout
}))

vi.mock('@/Service/links.service.js', () => ({
  getUserLinks: mockGetUserLinks,
  addNewLink: vi.fn(),
  addPublicLink: vi.fn(),
  updateLink: vi.fn(),
  deleteLink: vi.fn()
}))

vi.mock('@/Adapters/links.adapter.js', () => ({
  addLinkAdapter: vi.fn(),
  linksListAdapter: vi.fn(),
  addPublicLinkAdapter: vi.fn(),
  updateLinkAdapter: vi.fn()
}))

describe('Auth & Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to home when token is expired (403 from getUserLinks)', async () => {
    mockGetUserLinks.mockRejectedValue(new Error('403 Forbidden'))

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    expect(await screen.findByText('Sesión expirada. Redirigiendo...')).toBeInTheDocument()
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })

  it('logs out and redirects to home', async () => {
    mockGetUserLinks.mockResolvedValue([])
    mockLogout.mockResolvedValue({ ok: true })

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    await screen.findByText('Dashboard')

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /logout/i }))

    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })
})
