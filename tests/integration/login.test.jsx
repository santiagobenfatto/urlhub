import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Login from '@/Pages/Login'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockLoginService, mockLoginAdapter } = vi.hoisted(() => ({
  mockLoginService: vi.fn(),
  mockLoginAdapter: vi.fn((data) => ({
    userName: data?.first_name || '',
    nickname: data?.nickname || '',
    email: data?.email || '',
    hubSetup: data?.hub_setup || null
  }))
}))

vi.mock('@/Service/login.service.js', () => ({
  loginService: mockLoginService
}))

vi.mock('@/Adapters/login.adapter.js', () => ({
  loginAdapter: mockLoginAdapter
}))

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows success toast, dispatches user, and redirects on successful login', async () => {
    const mockUser = {
      first_name: 'John',
      nickname: 'johnny',
      email: 'john@example.com',
      hub_setup: true
    }

    mockLoginService.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })

    const { store } = renderWithProviders(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div data-testid="dashboard-page">Dashboard</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/login'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledWith({
        email: 'john@example.com',
        pass: 'password123'
      })
    })

    expect(await screen.findByText('Login successful')).toBeInTheDocument()
    expect(await screen.findByTestId('dashboard-page')).toBeInTheDocument()

    const state = store.getState()
    expect(state.user.userName).toBe('John')
    expect(state.user.email).toBe('john@example.com')
  })

  it('shows error toast on login failure', async () => {
    mockLoginService.mockRejectedValue(new Error('Login failed'))

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div data-testid="dashboard-page">Dashboard</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/login'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText('Login failed. Check your credentials.')).toBeInTheDocument()
  })
})
