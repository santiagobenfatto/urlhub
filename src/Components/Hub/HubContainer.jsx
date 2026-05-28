import { Container, Typography } from '@mui/material'
import React from 'react'
import Hub from './Hub.jsx'



const HubContainer = ({isHome}) => {
    return (
        <Container disableGutters maxWidth='false' sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: isHome ? { xs: '90%', sm: '70%', md: '60%' } : { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
            minHeight: { xs: 'auto', sm: '60vh', md: '80vh' },
            py: { xs: 6, sm: 0 },
            m: 0
        }}>
        {isHome ?
            <Typography 
            variant='h4' 
            gutterBottom
            sx={{
                width: '100%',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                fontFamily:'Montserrat variable',
                fontWeight: 600,
                textAlign: 'center',
                color: 'secondary.main',
                mb: { xs: 3, sm: 4 }
            }}
            >Create your <span style={{ textDecoration: 'underline', color: '#ffb300'}}>Personal Hub</span>.
        </Typography> 
        : null
        }
            <Hub />
        </Container>
    )
}

export default HubContainer
