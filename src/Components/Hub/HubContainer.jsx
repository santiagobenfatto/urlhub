import { Container, Typography } from '@mui/material'
import React from 'react'
import Hub from './Hub.jsx'

const HubContainer = () => {
    return (
        <Container disableGutters maxWidth='none' sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '60%',
            height: '80vh',
            m: 0
        }}>
        <Typography 
            variant='h4' 
            gutterBottom
            sx={{
                width: '100%',
                maxHeight : '120px',
                fontSize: '2.5rem',
                fontFamily:'Montserrat variable',
                fontWeight: 600,
                textAlign: 'center',
                color: 'secondary.main'
            }}
            >Create your <span style={{ textDecoration: 'underline', color: '#ff6f00'}}>Personal Hub</span>.
        </Typography>
            <Hub />
        </Container>
    )
}

export default HubContainer
