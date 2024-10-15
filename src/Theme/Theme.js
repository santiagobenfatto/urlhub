import { createTheme } from '@mui/material'
import '@fontsource/roboto'
import '@fontsource/kalam'
import '@fontsource-variable/montserrat'

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'Montserrat',
            'sans serif',
            'kalam'
        ].join(',')
    },
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    fontFamily: 'Montserrat Variable',
                    color: '#FFFFFF'
                },
                head: {
                    letterSpacing: '1px',
                    paddingBottom: '4px'
                }
            }
        }
    }
})

