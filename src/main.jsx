import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './Theme/Theme.js'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline>
        <App />
        </CssBaseline>
      </ThemeProvider>
  </StrictMode>
)
