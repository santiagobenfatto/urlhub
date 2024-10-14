import React from 'react'
import { Container } from '@mui/material'
import Navbar from '../Components/NavBar/Navbar.jsx'
//import Header from '../Components/Header/Header.jsx'
// import HubContainer from '../Components/Hub/HubContainer.jsx'
// import FooterContainer from '../Components/Footer/FooterContainer.jsx'
import Dashboard from './Dashboard.jsx'

const Home = () => {
    return (
        <Container disableGutters maxWidth='none' sx={{
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            m: 0
        }}>
            <Navbar />
            <Dashboard />
            {/* <Header />
            <HubContainer />
            <FooterContainer /> */}
        </Container>
    )
}

export default Home
