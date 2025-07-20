import React, { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Tooltip, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import { registerAdapter } from '../Adapters/register.adapter.js'
import { useNavigate } from 'react-router-dom'
import { emailValidation } from '../Utils/validateRegex.js'

const Login = () => {
    
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ error, setError ] = useState({
        error: false,
        message: ''
    })


    const navigate = useNavigate()

    const TextFieldProps = {
        '& .MuiTextField-root': { 
            width: '70%',
            mb: '12px'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!emailValidation(email)){
            setError({
                error:true,
                message: 'Introduce un email válido'
            })
            return
        }
        setError({
            error: false,
            message: ''
        })

        try {
            const userData = await registerAdapter({userName, email, pass})

            setEmail('')
            setPass('')

            if(userData.response.ok){
                navigate('/home')
                //add message: "register succesfully"
            }


        } catch (error) {
            throw new Error(`Error in register at ${error}`)
        }

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
            <NavBar currentPage='register' />
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
                sx={ TextFieldProps }
                >
                <Tooltip title='Insert your name or username.'>
                    <TextField 
                    size='small'
                    placeholder='Name'
                    type='text'
                    value={userName}
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={(e)=> setUserName(e.target.value)} />
                </Tooltip>
                <Tooltip title='Insert your email.'>
                <TextField 
                    size='small'
                    placeholder='Email'
                    type='email'
                    value={email}
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={(e)=> setEmail(e.target.value)} />
                </Tooltip>
                <Tooltip title='Create a strong password.'>
                <TextField 
                    size='small'
                    placeholder='Password'
                    type='password'
                    required
                    value={pass} 
                    onChange={(e)=> setPass(e.target.value)} />
                </Tooltip>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '70%',
                    mt: 1
                }}>
                <Tooltip title='Register user'>
                    <Button
                        type='submit'
                        sx={{ width: '40%'}}
                        >
                        Register
                    </Button>
                </Tooltip>
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
                    <Tooltip title='Login into your account.'>
                    <Typography 
                        variant='body1'
                        component='a'
                        href='/login'
                        sx={{
                            fontFamily: 'Montserrat variable',
                            color: '#ffb300',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            ':hover': {
                                cursor: 'pointer',
                                fontWeight: 500
                            }
                            }}>Login here
                    </Typography>
                    </Tooltip>
                    </Typography>
            </Box>
        </Box>
        </Box>
        </Container>
    )
}

export default Login
