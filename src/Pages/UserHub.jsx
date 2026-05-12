import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import LinksManager from '../Components/LinksTable/LinksManager.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import LinksProvider from '../Context/LinksProvider.jsx'

function UserHub() {
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
            <LinksProvider>
                <NavBar currentPage='hub' />
                <Box sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    width: '60%',
                    height: '20vh'
                }}>
                    <Typography
                        variant='h2'
                        sx={{
                            fontFamily: 'kalam',
                            fontWeight: 600,
                            color: '#ffb300'
                        }}>
                        My Hub
                    </Typography>
                </Box>
                <LinksManager />
                <Footer />
            </LinksProvider>
        </Container>
    )
}

export default UserHub