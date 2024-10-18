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
        MuiButton: {
            styleOverrides: {
                // root: {
                //     backgroundColor: '#ffb300',
                //     color: '#000000',
                //     ':hover': {
                //         backgroundColor: '#ff8f00'
                //     }
                // }
                root: {
                    backgroundColor: '#ffb300',
                    color: '#000000',
                    borderRadius: '8px',
                    ':hover': {
                        backgroundColor: '#ff8f00'
                    }
                }
            }
        }
        ,
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

