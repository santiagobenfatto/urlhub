import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Dashboard from '@/Pages/Dashboard'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockGetUserLinks, mockAddNewLink, mockUpdateLink, mockDeleteLink, mockAddLinkAdapter, mockUpdateLinkAdapter } = vi.hoisted(() => ({
  mockGetUserLinks: vi.fn(),
  mockAddNewLink: vi.fn(),
  mockUpdateLink: vi.fn(),
  mockDeleteLink: vi.fn(),
  mockAddLinkAdapter: vi.fn((data) => ({
    id: data.id,
    title: data.title,
    bigLink: data.big_link,
    alias: data.alias,
    shortLink: data.short_link,
    icon: data.icon || ''
  })),
  mockUpdateLinkAdapter: vi.fn((data) => ({
    id: data.id,
    title: data.title,
    bigLink: data.big_link,
    alias: data.alias,
    shortLink: data.short_link,
    icon: data.icon || ''
  }))
}))

vi.mock('@/Service/links.service.js', () => ({
  getUserLinks: mockGetUserLinks,
  addNewLink: mockAddNewLink,
  addPublicLink: vi.fn(),
  updateLink: mockUpdateLink,
  deleteLink: mockDeleteLink
}))

vi.mock('@/Adapters/links.adapter.js', () => ({
  addLinkAdapter: mockAddLinkAdapter,
  linksListAdapter: vi.fn(),
  updateLinkAdapter: mockUpdateLinkAdapter
}))

const mockLinks = [
  { id: 1, title: 'My Link', big_link: 'https://example.com', alias: 'my', short_link: 'https://urlhub.io/my', icon: 'GitHub' },
  { id: 2, title: 'Other', big_link: 'https://other.com', alias: 'oth', short_link: 'https://urlhub.io/oth', icon: '' }
]

describe('Private Links', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and displays links in the dashboard table', async () => {
    mockGetUserLinks.mockResolvedValue(mockLinks)

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    const myLinks = await screen.findAllByText('My Link')
    expect(myLinks.length).toBeGreaterThan(0)
    expect(screen.getAllByText('https://example.com').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Other').length).toBeGreaterThan(0)
    expect(screen.getAllByText('https://other.com').length).toBeGreaterThan(0)
  })

  it('creates a new link successfully', async () => {
    mockGetUserLinks.mockResolvedValue([])
    mockAddNewLink.mockResolvedValue({
      id: 3,
      title: 'New Link',
      big_link: 'https://new.com',
      alias: 'new',
      short_link: 'https://urlhub.io/new',
      icon: '',
      status: { ok: true }
    })

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    const noLinks = await screen.findAllByText('No links available. Add a new link to get started!')
    expect(noLinks.length).toBeGreaterThan(0)

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Big Link'), 'https://new.com')
    await user.type(screen.getByPlaceholderText('alias'), 'new')
    await user.type(screen.getByPlaceholderText('Title'), 'New Link')

    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).not.toBeDisabled()
    await user.click(addButton)

    expect(await screen.findByText('Link creado exitosamente')).toBeInTheDocument()
    expect((await screen.findAllByText('New Link')).length).toBeGreaterThan(0)
  })

  it('edits an existing link successfully', async () => {
    mockGetUserLinks.mockResolvedValue(mockLinks)
    mockUpdateLink.mockResolvedValue({
      status: { ok: true },
      id: 1,
      title: 'Updated Link',
      big_link: 'https://example.com',
      alias: 'upd',
      short_link: 'https://urlhub.io/upd',
      icon: 'GitHub'
    })

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    await screen.findAllByText('My Link')

    const user = userEvent.setup()
    const editButtons = screen.getAllByRole('button', { name: /edit your url/i })
    await user.click(editButtons[0])

    const aliasInput = screen.getByPlaceholderText('/my')
    const titleInput = screen.getByPlaceholderText('My Link')

    await user.clear(aliasInput)
    await user.type(aliasInput, 'upd')
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Link')

    await user.click(screen.getByRole('button', { name: 'Edit' }))

    expect(await screen.findByText('Link actualizado exitosamente')).toBeInTheDocument()
  })

  it('deletes a link successfully', async () => {
    mockGetUserLinks.mockResolvedValue(mockLinks)
    mockDeleteLink.mockResolvedValue({ ok: true })

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    await screen.findAllByText('My Link')

    const user = userEvent.setup()
    const deleteButtons = screen.getAllByRole('button', { name: /delete url/i })
    await user.click(deleteButtons[0])

    await waitFor(() => {
      expect(mockDeleteLink).toHaveBeenCalledWith(1)
    })

    expect(await screen.findByText('Link eliminado')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryAllByText('My Link').length).toBe(0)
    })
  })
})
