import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import LinksTableContainer from '../Components/LinksTable/LinksTableContainer.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'
import Footer from '../Components/Footer/Footer.jsx'


const Dashboard = () => {
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
            <NavBar currentPage='dashboard' />
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
                        Dashboard
                </Typography>
            </Box>
            <LinksTableContainer />
            <HubContainer isHome={false}/>
            <Footer />
        </Container>
    )
}

export default Dashboard
