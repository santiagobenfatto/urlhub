import React, { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'

const Login = () => {
    
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ error, setError ] = useState({
        error: false,
        message: ''
    })

    const handleSubmit = (e) => {
        //submit
    }
    
    return (
        <Container disableGutters maxWidth='false' sx={{
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            m: 0
        }}>
            <Box sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '600px',
                height: '350px',
                padding: '8px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                heigh: '25%'
            }}>
            <Typography 
                variant='h4'
                gutterBottom
                color='secondary.main'
                sx={{
                    fontFamily: 'Montserrat variable',
                    fontWeight: 600,
                }}>
                Create your account and custom your <span style={{color: '#ffb300'}}>Links!</span>
            </Typography>

            </Box>

            <Stack 
                component='form'
                useFlexGap
                direction="column"
                alignItems="center"
                onSubmit={handleSubmit}
                noValidate
                autoComplete='off'
                sx={{
                    '& .MuiTextField-root': { 
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        width: '70%',
                        fontFamily: 'Montserrat Variable',
                        fontSize: '1rem',
                        borderRadius: '12px',
                        mb: '12px'
                    }
                }}
                >
                <TextField 
                    size='small'
                    placeholder='Correo electrónico'
                    type='email'
                    value={email}
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={(e)=> setEmail(e.target.value)} />
                
                <TextField 
                    size='small'
                    placeholder='Contraseña'
                    type='password'
                    required
                    value={pass} 
                    onChange={(e)=> setPass(e.target.value)} />
                
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Button
                        type='submit'
                        sx={{ width: '40%'}}
                        >
                        Enviar
                    </Button>
                </Box>               
            </Stack>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '90%',
                    height:'auto'
                }}>
            <Typography variant="body1" gutterBottom sx={{
                fontFamily: 'Montserrat variable',
                color: 'secondary.main',
                fontSize: '0.9rem',
                alignSelf: 'start',
                marginTop: '1rem'}}>
                    ¿No tienes una cuenta?&nbsp;
                    <Typography 
                        variant='body1' 
                        component={'a'} 
                        href='/register' 
                        sx={{
                            fontFamily: 'Montserrat variable',
                            color: '#ffb300',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            ':hover': {
                                fontWeight: 500
                            }
                            }}>Regístrate aquí</Typography>
                    </Typography>
            </Box>
        </Box>
        </Container>
    )
}

export default Login
