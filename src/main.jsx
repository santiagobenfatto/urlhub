import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import LinksProvider from './Context/LinksProvider.jsx'
import { store }from './Redux/store.js'
import { theme } from './Theme/Theme.js'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LinksProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
          <App />
          <ToastContainer />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </LinksProvider>
  </StrictMode>
)
