import React from 'react'
import { Container, Typography } from '@mui/material'
import Shortener from '../Shortener/Shortener'


const Header = () => {
    return (
        <Container maxWidth='false' sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: { xs: '90%', sm: '70%', md: '60%' },
            minHeight: { xs: 'auto', sm: '50vh', md: '70vh' },
            py: { xs: 4, sm: 0 }
        }}>
        <Typography variant='h2' sx={{
                alignSelf: 'center',
                width: { xs: '100%', sm: '80%' },
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                fontFamily:'Montserrat variable',
                fontWeight: 600,
                textAlign: { xs: 'center', sm: 'left' },
                color: 'secondary.main',
                mt: '1rem'
            }}
            >Easy way to manage your links: <span style={{ fontFamily: 'kalam', color: '#ffb300'}}> URL Hub!</span>
        </Typography>
        <Shortener />
        </Container>
    )
}

export default Header
