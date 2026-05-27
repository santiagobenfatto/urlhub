import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../test-utils'
import Register from '@/Pages/Register'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockRegisterService } = vi.hoisted(() => ({
  mockRegisterService: vi.fn()
}))

vi.mock('@/Service/register.service.js', () => ({
  registerService: mockRegisterService
}))

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows success toast and redirects on successful registration', async () => {
    mockRegisterService.mockResolvedValue({ ok: true })

    renderWithProviders(
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/register'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Name'), 'TestUser')
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'password123')

    await user.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(mockRegisterService).toHaveBeenCalledWith({
        userName: 'TestUser',
        email: 'test@example.com',
        pass: 'password123'
      })
    })
    expect(await screen.findByText('Cuenta creada exitosamente', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(await screen.findByTestId('home-page', {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('shows error toast on registration failure', async () => {
    mockRegisterService.mockRejectedValue(new Error('Registration failed'))

    renderWithProviders(
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
      </Routes>,
      { initialEntries: ['/register'] }
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Name'), 'TestUser')
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /register/i }))

    expect(await screen.findByText('Error al registrarse. Intenta de nuevo.')).toBeInTheDocument()
  })
})
