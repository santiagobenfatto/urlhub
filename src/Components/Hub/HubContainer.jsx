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
            width: isHome ? '60%' : '50%',
            height: '80vh',
            m: 0
        }}>
        {isHome ?
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
            >Create your <span style={{ textDecoration: 'underline', color: '#ffb300'}}>Personal Hub</span>.
        </Typography> 
        : null
        }
            <Hub />
        </Container>
    )
}

export default HubContainer
