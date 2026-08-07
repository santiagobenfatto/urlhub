import { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import PublicHub from '../Components/Hub/PublicHub.jsx'
import LoadingScreen from '../Components/LoadingScreen.jsx'
import { getPublicHub } from '../Service/hub.service.js'

function UserHub() {
    const { hubId } = useParams()
    const [hubData, setHubData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPublicHub = async () => {
            try {
                setLoading(true)
                const data = await getPublicHub(hubId)
                setHubData(data)
            } catch (err) {
                setError(err.message || 'Hub not found')
            } finally {
                setLoading(false)
            }
        }
        fetchPublicHub()
    }, [hubId])

    if (loading) return <LoadingScreen />

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
            <NavBar currentPage='hub' />
            {error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Typography color='error' variant='h6'>{error}</Typography>
                </Box>
            ) : (
                <PublicHub
                    ownerName={hubData?.firstName}
                    ownerNickname={hubData?.nickname}
                    links={hubData?.links || []}
                />
            )}
            <Footer />
        </Container>
    )
}

export default UserHub
