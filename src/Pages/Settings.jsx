import React, { useState } from 'react'
import { Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import { saveUser } from '../Redux/slices/user.slice.js'
import { updateUser } from '../Service/user.service.js'

const Settings = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nickname: user.nickname || '',
        firstName: user.userName || '',
        email: user.email || '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const TextFieldProps = {
        '& .MuiTextField-root': {
            width: '70%',
            mb: '12px'
        }
    }

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updates = {
            nickname: formData.nickname,
            first_name: formData.firstName,
            email: formData.email
        }
        if (formData.password) {
            updates.password = formData.password
        }

        try {
            const updated = await updateUser(updates)
            dispatch(saveUser({
                userName: updated?.first_name || formData.firstName,
                nickname: updated?.nickname || formData.nickname,
                email: updated?.email || formData.email,
                hubSetup: user.hubSetup
            }))
            setFormData(prevState => ({ ...prevState, password: '' }))
            toast.success('Settings updated successfully', { theme: 'dark' })
            navigate('/dashboard')
        } catch (error) {
            console.error('Error updating user:', error)
            toast.error('Failed to update settings. Please try again.', { theme: 'dark' })
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
            <NavBar currentPage='settings' />
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
                    <Typography
                        variant='h4'
                        color='secondary.main'
                        sx={{
                            fontFamily: 'Montserrat variable',
                            fontWeight: 600,
                            fontSize: { xs: '1.6rem', sm: '2rem', md: '2.125rem' },
                            textAlign: { xs: 'center', sm: 'left' },
                            mb: 3
                        }}>
                        Account <span style={{ color: '#ffb300' }}>Settings</span>
                    </Typography>

                    <Stack
                        component='form'
                        useFlexGap
                        direction="column"
                        alignItems="center"
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete='off'
                        sx={TextFieldProps}
                    >
                        <Tooltip title='Edit your nickname.'>
                            <TextField
                                size='small'
                                placeholder='Nickname'
                                type='text'
                                value={formData.nickname}
                                onChange={e => handleInputChange('nickname', e.target.value)}
                            />
                        </Tooltip>
                        <Tooltip title='Edit your first name.'>
                            <TextField
                                size='small'
                                placeholder='First name'
                                type='text'
                                value={formData.firstName}
                                onChange={e => handleInputChange('firstName', e.target.value)}
                            />
                        </Tooltip>
                        <Tooltip title='Edit your email.'>
                            <TextField
                                size='small'
                                placeholder='Email'
                                type='email'
                                value={formData.email}
                                required
                                onChange={e => handleInputChange('email', e.target.value)}
                            />
                        </Tooltip>
                        <Tooltip title='Set a new password.'>
                            <TextField
                                size='small'
                                placeholder='New password'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={e => handleInputChange('password', e.target.value)}
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
                                }}
                            />
                        </Tooltip>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            width: '70%',
                            mt: 1,
                            gap: 1
                        }}>
                            <Button
                                type='button'
                                variant='text'
                                onClick={() => navigate('/dashboard')}
                            >
                                Cancel
                            </Button>
                            <Button type='submit' sx={{ width: '40%' }}>
                                Save
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            <Footer />
        </Container>
    )
}

export default Settings
