import React from 'react'
import LinksManager from '../Components/LinksTable/LinksManager.jsx'
import { Box, Container, Typography } from '@mui/material'


const Dashboard = () => {
    return (
        <Container disableGutters maxWidth='false' sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            minHeight: '100%',
            m: 0
          }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '125px',
                width: '75%',
            }}>
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'kalam',
                        fontWeight: 600,
                        color: '#ffb300'
                    }}>
                        Dashboard
                </Typography>
            </Box>
        <LinksManager />
        </Container>
    )
}

export default Dashboard
