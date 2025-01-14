import React, { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import { registerAdapter } from '../Adapters/register.adapter.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ error, setError ] = useState({
        error: false,
        message: ''
    })


    const navigate = useNavigate()

    const emailValidation = (email) => {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
        return regex.test(email)
    }

    const TextFieldProps = {
        '& .MuiTextField-root': { 
            overflow: 'hidden',
            backgroundColor: 'white',
            width: '70%',
            fontFamily: 'Montserrat Variable',
            fontSize: '1rem',
            borderRadius: '12px',
            mb: '12px'
        },
        '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
            },
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
                    <TextField 
                    size='small'
                    placeholder='Name'
                    type='text'
                    value={userName}
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={(e)=> setUserName(e.target.value)} />
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
                            }}>Login here</Typography>
                    </Typography>
            </Box>
        </Box>
        </Box>
        </Container>
    )
}

export default Login
