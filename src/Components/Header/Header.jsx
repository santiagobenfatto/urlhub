import { Container, Typography } from '@mui/material'
import React from 'react'
import Shortener from '../Shortener/Shortener'


const Header = () => {
    return (
        <Container maxWidth='false' sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            maxHeight: '70vh',
            width: '60%',
            height: '70vh'
        }}>
        <Typography variant='h2' sx={{
                alignSelf: 'center',
                width: '80%',
                maxHeight : '120px',
                fontSize: '3rem',
                fontFamily:'Montserrat variable',
                fontWeight: 600,
                textAlign: 'left',
                color: 'secondary.main',
                mt: '1rem'
            }}
            >Easy way to manage your links: <span style={{ fontFamily: 'kalam', color: '#ff6f00'}}> URL Hub!</span>
        </Typography>
        <Shortener />
        </Container>
    )
}

export default Header
