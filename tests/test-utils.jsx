import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { configureStore } from '@reduxjs/toolkit'
import linksReducer from '@/Redux/slices/links.slice'
import userReducer from '@/Redux/slices/user.slice'
import hubReducer from '@/Redux/slices/hubs.slice'
import LinksProvider from '@/Context/LinksProvider'
import { theme } from '@/Theme/Theme'

export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      links: linksReducer,
      hub: hubReducer
    },
    preloadedState
  })
}

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <LinksProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <MemoryRouter initialEntries={initialEntries}>
                {children}
                <ToastContainer />
              </MemoryRouter>
            </CssBaseline>
          </ThemeProvider>
        </Provider>
      </LinksProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
