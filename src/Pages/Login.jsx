import React, { useState } from 'react'
import { Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../Components/NavBar/NavBar.jsx'
import { useDispatch } from 'react-redux'
import { loginAdapter } from '../Adapters/login.adapter.js'
import { saveUser } from '../Redux/slices/user.slice.js'
import { emailValidation } from '../Utils/validateRegex.js'
import { loginService } from '../Service/login.service.js'
import { getPublicLink, removePublicLink } from '../Utils/utils.js'

const Login = () => {
    
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ showPassword, setShowPassword ] = useState(false)
    const [ error, setError ] = useState({
        error: false,
        message: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const TextFieldProps = {
        '& .MuiTextField-root': { 
            width: '70%',
            mb: '12px',
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!emailValidation(email)){
            setError({
                error:true,
                message: 'Please enter a valid email'
            })
            return
        }
        setError({
            error: false,
            message: ''
        })

        try {
            const response = await loginService({email, pass})
            const parsedResponse = await response.json()
            const userData = await loginAdapter(parsedResponse.user)
            dispatch(saveUser(userData))
            
            setEmail('')
            setPass('')

            if(response.ok){
                const [publicLink] = getPublicLink()
                if (publicLink?.id) {
                    removePublicLink()
                    toast.info('Your public link can be recreated from the dashboard.', { theme: 'dark' })
                }
                toast.success('Login successful', { theme: 'dark' })
                navigate('/dashboard')
            }

        } catch (error) {
            console.error(error)
            toast.error('Login failed. Check your credentials.', { theme: 'dark' })
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
                width: { xs: '90%', sm: '500px', md: '600px' },
                minHeight: '350px'
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
                    fontWeight: 600,
                    fontSize: { xs: '1.6rem', sm: '2rem', md: '2.125rem' },
                    textAlign: { xs: 'center', sm: 'left' }
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
                <Tooltip title='Insert your password.'>
                <TextField 
                    size='small'
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={pass} 
                    onChange={(e)=> setPass(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='Toggle password visibility'
                                        onClick={() => setShowPassword(prev => !prev)}
                                        edge='end'
                                        size='small'
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }} />
                </Tooltip>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '70%',
                    mt: 1
                }}>
                   <Tooltip title='Login user.'
   >
                    <Button 
                        type='submit'
                        sx={{ width: '40%'}}
                        >
                        Login
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
                    Don&apos;t have an account?&nbsp;
                <Tooltip title='Create an account.'>
                    <Typography 
                        variant='body1' 
                        component='a'
                        href='/register' 
                        sx={{
                            fontFamily: 'Montserrat variable',
                            color: '#ffb300',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            ':hover': {
                                cursor: 'pointer',
                                fontWeight: 500
                            }
                            }}>Sign up here
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
