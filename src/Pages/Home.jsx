import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Header from '../Components/Header/Header.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'
import FooterContainer from '../Components/Footer/FooterContainer.jsx'
import LinkDrawer from '../Components/LinkDrawer/LinkDrawer.jsx'
import LinksProvider from '../Context/LinksProvider.jsx'
import LoadingScreen from '../Components/LoadingScreen.jsx'

const URL = import.meta.env.VITE_API_SERVER_URL

const Home = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${URL}/api/v1/users/auth/verify`, {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) navigate('/dashboard')
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [navigate])

    if (loading) return <LoadingScreen />

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
