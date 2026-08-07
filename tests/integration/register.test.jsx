import { screen, waitFor, within } from '@testing-library/react'
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

const fillRegisterForm = async (user) => {
  await user.type(screen.getByPlaceholderText('Name'), 'TestUser')
  await user.type(screen.getByPlaceholderText('Nickname'), 'johnny')
  await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
  await user.type(screen.getByPlaceholderText('Password'), 'password123')
}

const renderRegister = () =>
  renderWithProviders(
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<div data-testid="home-page">Home</div>} />
      <Route path="*" element={<div data-testid="catch-all">CatchAll</div>} />
    </Routes>,
    { initialEntries: ['/register'] }
  )

const getNicknameField = () => {
  const input = screen.getByPlaceholderText('Nickname')
  return { input, field: input.closest('.MuiFormControl-root') }
}

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows success toast and redirects on successful registration', async () => {
    mockRegisterService.mockResolvedValue({ ok: true })

    renderRegister()

    const user = userEvent.setup()
    await fillRegisterForm(user)

    await user.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(mockRegisterService).toHaveBeenCalledWith({
        userName: 'TestUser',
        nickname: 'johnny',
        email: 'test@example.com',
        pass: 'password123'
      })
    })
    expect(await screen.findByText('Account created successfully', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(await screen.findByTestId('home-page', {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('shows the backend error under the Nickname field when the nickname already exists', async () => {
    mockRegisterService.mockRejectedValue(new Error('Nickname already exists'))

    renderRegister()

    const user = userEvent.setup()
    await fillRegisterForm(user)
    await user.click(screen.getByRole('button', { name: /register/i }))

    const { field } = getNicknameField()
    expect(await within(field).findByText('Nickname already exists', {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('keeps generic error handling for non-nickname registration errors', async () => {
    mockRegisterService.mockRejectedValue(new Error('Something went wrong'))

    renderRegister()

    const user = userEvent.setup()
    await fillRegisterForm(user)
    await user.click(screen.getByRole('button', { name: /register/i }))

    expect(await screen.findByText('Registration failed. Try again.', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})
