import React from 'react'
import { Container } from '@mui/material'
import { useAuthRedirect } from '../Hooks/useAuth.jsx'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Header from '../Components/Header/Header.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'
import FooterContainer from '../Components/Footer/FooterContainer.jsx'
import LinkDrawer from '../Components/LinkDrawer/LinkDrawer.jsx'
import LinksProvider from '../Context/LinksProvider.jsx'

const Home = () => {
    useAuthRedirect()

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
            <LinksProvider>
                <NavBar currentPage='home' />
                <LinkDrawer />
                <Header />
                <HubContainer isHome={true}/>
                <FooterContainer />
            </LinksProvider>
        </Container>
    )
}

export default Home
