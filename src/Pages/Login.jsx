import React, { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar.jsx'
import { useDispatch } from 'react-redux'
import { loginAdapter } from '../Adapters/login.adapter.js'
import { saveUser } from '../Redux/slices/user.slice.js'

const Login = () => {
    
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ error, setError ] = useState({
        error: false,
        message: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const emailValidation = (email) => {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
        return regex.test(email)
    }
    
    const TextFieldProps = {
        '& .MuiTextField-root': { 
            width: '60%',
            mb: '12px',
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
            const userData = await loginAdapter({email, pass})

            dispatch(saveUser(userData))
            
            setEmail('')
            setPass('')

            if(userData.response.ok){
                navigate('/dashboard')
            }

        } catch (error) {
           console.log(error)
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
            <NavBar currentPage='login' />
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
                Log in to manage your <span style={{color: '#ffb300'}}>Links!</span>
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
                    alignItems: 'flex-end',
                    width: '60%',
                    mt: 1
                }}>
                    <Button 
                        type='submit'
                        sx={{ width: '90%'}}
                        >
                        Login
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
                    Don&apos;t have an account?&nbsp;
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
                            }}>Sign up here</Typography>
                    </Typography>
            </Box>
        </Box>
        </Box>
        </Container>
    )
}

export default Login
