import React from 'react'
import { Container } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Header from '../Components/Header/Header.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'
import FooterContainer from '../Components/Footer/FooterContainer.jsx'

const Home = () => {
    return (
        <Container disableGutters maxWidth='false' sx={{
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            m: 0
        }}>
            <NavBar currentPage='home' />
            <Header />
            <HubContainer isHome={true}/>
            <FooterContainer />
        </Container>
    )
}

export default Home
