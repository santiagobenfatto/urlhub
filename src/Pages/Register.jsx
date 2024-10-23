import React, { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'

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
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            m: 0
        }}>
            <NavBar />
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexGrow: 1
        }}>
            <Box sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '600px',
                height: '350px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                height: '25%'
            }}>
            <Typography 
                variant='h4'
                color='secondary.main'
                sx={{
                    fontFamily: 'Montserrat variable',
                    fontWeight: 600
                }}>
                Create your account and manage your <span style={{color: '#ffb300'}}>Links!</span>
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
                    placeholder='Email'
                    type='email'
                    value={email}
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={(e)=> setEmail(e.target.value)} />
                
                <TextField 
                    size='small'
                    placeholder='Password'
                    type='password'
                    required
                    value={pass} 
                    onChange={(e)=> setPass(e.target.value)} />
                
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '70%',
                    mt: 1
                }}>
                    <Button
                        type='submit'
                        sx={{ width: '40%'}}
                        >
                        Register
                    </Button>
                </Box>               
            </Stack>
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height:'auto'
                }}>
            <Typography variant="body1" gutterBottom 
                sx={{
                width: '70%',
                fontFamily: 'Montserrat variable',
                color: 'secondary.main',
                fontSize: '0.9rem',
                m: 0
                }}>
                    Already have an account?&nbsp;
                    <Typography 
                        variant='body1' 
                        component={'a'} 
                        href='/login' 
                        sx={{
                            fontFamily: 'Montserrat variable',
                            color: '#ffb300',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            ':hover': {
                                fontWeight: 500
                            }
                            }}>Log in here</Typography>
                    </Typography>
            </Box>
        </Box>
        </Box>
        </Container>
    )
}

export default Login
