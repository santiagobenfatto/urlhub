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
                root: {
                    backgroundColor: '#ffb300',
                    color: '#000000',
                    borderRadius: '8px',
                    ':hover': {
                        backgroundColor: '#ff8f00'
                    }
                }
            }
        },        
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
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    fontFamily: 'Montserrat Variable',
                    fontSize: '1rem',
                    borderRadius: '12px'
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff8f00',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff8f00',
                },
              },
              notchedOutline: {
                border: '2px solid transparent'
              },
            },
          },
        MuiCheckbox: {
            styleOverrides: {
                backgroundColor: 'secondary.main'
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: 'white',
                    fontFamily: 'Roboto',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                },
                icon: {
                    color: '#000000', // Cambia el color del ícono desplegable
                },
                outlined: {
                    borderRadius: '12px',
                },
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                },
            }
        },
        MuiTooltip: {
            defaultProps:{
                placement: 'bottom-end',
                slotProps : {
                    popper: {
                        modifiers: [
                        {
                            name: 'offset',
                            options: {
                            offset: [14, -10],
                            },
                        },
                        ],
                    },
                }
            }
        }
    }
})

