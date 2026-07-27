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
            justifyContent: { xs: 'flex-start', sm: 'space-evenly' },
            gap: { xs: 2, sm: 0 },
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            m: 0
          }}>
            <NavBar currentPage='dashboard' />
            <Box sx={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                alignItems: 'flex-end',
                width: '100%',
                px: { xs: 2, sm: 0 },
                minHeight: { xs: '5vh', sm: '15vh', md: '20vh' }
            }}>
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'kalam',
                        fontWeight: 600,
                        color: '#ffb300',
                        fontSize: { xs: '3rem', md: '3.75rem' },
                        marginLeft: 4
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
