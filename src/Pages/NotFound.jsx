import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'

const NotFound = () => {
    return (
        <Container disableGutters maxWidth='false' sx={{
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
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
                flexGrow: 1,
                gap: 2,
                textAlign: 'center',
                px: 2
            }}>
                <Typography variant='h1' sx={{
                    fontFamily: 'kalam',
                    fontWeight: 700,
                    color: '#ffb300',
                    fontSize: { xs: '5rem', sm: '7rem' },
                    lineHeight: 1
                }}>
                    404
                </Typography>
                <Typography variant='h5' color='secondary.main' sx={{ fontFamily: 'Montserrat variable', fontWeight: 600 }}>
                    Page not found
                </Typography>
                <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat variable' }}>
                    The page you are looking for does not exist or has been moved.
                </Typography>
                <Button href='/' sx={{ mt: 2 }}>
                    Back to Home
                </Button>
            </Box>
            <Footer />
        </Container>
    )
}

export default NotFound
