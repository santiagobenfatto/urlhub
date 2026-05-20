import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import LinksProvider from '../Context/LinksProvider.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'

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
                <HubContainer />
                <Footer />
            </LinksProvider>
        </Container>
    )
}

export default UserHub