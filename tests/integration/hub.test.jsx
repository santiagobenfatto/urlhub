import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import UserHub from '@/Pages/UserHub'
import Dashboard from '@/Pages/Dashboard'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockGetUserHub, mockGetUserLinks, mockGetPublicHub } = vi.hoisted(() => ({
  mockGetUserHub: vi.fn(),
  mockGetUserLinks: vi.fn(),
  mockGetPublicHub: vi.fn()
}))

vi.mock('@/Service/hub.service.js', () => ({
  getUserHub: mockGetUserHub,
  getPublicHub: mockGetPublicHub,
  saveHub: vi.fn(),
  addLinkToHubService: vi.fn(),
  removeLinkFromHubService: vi.fn()
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
  updateLinkAdapter: vi.fn()
}))

const mockHubLinks = [
  { id: 1, title: 'Instagram', shortLink: 'https://urlhub.io/insta', icon: 'Instagram' },
  { id: 2, title: 'GitHub', shortLink: 'https://urlhub.io/gh', icon: 'GitHub' }
]

describe('Hub', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders hub links from API', async () => {
    mockGetPublicHub.mockResolvedValue({
      name: 'My Hub',
      firstName: 'John',
      nickname: 'johnny',
      links: mockHubLinks
    })

    renderWithProviders(
      <Routes>
        <Route path="/hub/:hubId" element={<UserHub />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/hub/hub-123'] }
    )

    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(screen.getByText('johnny')).toBeInTheDocument()
    expect(await screen.findByText('Instagram')).toBeInTheDocument()
    expect(await screen.findByText('GitHub')).toBeInTheDocument()
  })

  it('adds a link to hub from the dashboard table', async () => {
    mockGetUserLinks.mockResolvedValue([
      { id: 1, title: 'Docs', big_link: 'https://docs.com', alias: 'docs', short_link: 'https://urlhub.io/docs', icon: '' }
    ])
    mockGetUserHub.mockResolvedValue({
      id: 1,
      name: 'My Hub',
      links: [{ id: 1, title: 'Instagram', shortLink: 'https://urlhub.io/insta', icon: 'Instagram' }]
    })

    const { store } = renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hub/:hubId" element={<UserHub />} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/dashboard'] }
    )

    const docsLinks = await screen.findAllByText('Docs')
    expect(docsLinks.length).toBeGreaterThan(0)

    const user = userEvent.setup()
    const addToHubButtons = screen.getAllByRole('button', { name: /add the link to your hub/i })
    await user.click(addToHubButtons[0])

    const state = store.getState()
    expect(state.hub.links.some(link => link.title === 'Docs')).toBe(true)
  })
})
