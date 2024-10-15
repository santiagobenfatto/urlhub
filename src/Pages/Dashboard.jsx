import React from 'react'
import LinksTableContainer from '../Components/LinksTable/LinksTableContainer.jsx'
import { Box, Container, Typography } from '@mui/material'


const Dashboard = () => {
    return (
        <Container disableGutters sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            height: '100%'
          }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '200px',
                width: '75%',
            }}>
                <Typography
                    variant='h3'
                    sx={{
                        fontFamily: 'kalam',
                        fontWeight: 600,
                        color: '#ff6f00'
                    }}>
                        Dashboard
                </Typography>
            </Box>
        <LinksTableContainer />
        </Container>
    )
}

export default Dashboard
