import { screen, waitFor } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import AliasResolver from '@/Pages/AliasResolver'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { mockResolveAlias } = vi.hoisted(() => ({
  mockResolveAlias: vi.fn()
}))

vi.mock('@/Service/alias.service.js', () => ({
  resolveAlias: mockResolveAlias
}))

const originalLocation = window.location

const renderAlias = (initialEntry) =>
  renderWithProviders(
    <Routes>
      <Route path="*" element={<AliasResolver />} />
    </Routes>,
    { initialEntries: [initialEntry] }
  )

describe('AliasResolver', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    Object.defineProperty(window, 'location', { value: originalLocation })
  })

  it('redirects to big_link when the alias resolves to a link', async () => {
    mockResolveAlias.mockResolvedValue({
      type: 'link',
      big_link: 'https://example.com/destination',
      alias: 'myalias'
    })

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { replace: vi.fn() }
    })

    renderAlias('/myalias')

    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith('https://example.com/destination')
    })
  })

  it('renders the hub when the alias resolves to a hub', async () => {
    mockResolveAlias.mockResolvedValue({
      type: 'hub',
      name: 'My Public Hub',
      first_name: 'John',
      nickname: 'johnny',
      links: [
        { id: 1, title: 'Instagram', alias: 'insta', big_link: 'https://instagram.com', icon: '' }
      ]
    })

    renderAlias('/myhub')

    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(await screen.findByText('johnny')).toBeInTheDocument()
    expect(await screen.findByText('Instagram')).toBeInTheDocument()
  })

  it('renders the 404 page when the alias cannot be resolved', async () => {
    mockResolveAlias.mockRejectedValue(new Error('not found'))

    renderAlias('/missing')

    expect(await screen.findByText('Page not found')).toBeInTheDocument()
    expect(screen.queryByText('My Public Hub')).not.toBeInTheDocument()
  })

  it('renders the 404 page for non-alias paths', async () => {
    renderAlias('/some/other/path')

    expect(await screen.findByText('Page not found')).toBeInTheDocument()
  })
})
