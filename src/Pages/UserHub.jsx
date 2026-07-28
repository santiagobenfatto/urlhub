import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import PublicHub from '../Components/Hub/PublicHub.jsx'
import { getPublicHub, getPublicHubByAlias } from '../Service/hub.service.js'

function UserHub() {
    const { hubId, alias } = useParams()
    const [hubData, setHubData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPublicHub = async () => {
            try {
                setLoading(true)
                const data = alias
                    ? await getPublicHubByAlias(alias)
                    : await getPublicHub(hubId)
                setHubData(data)
            } catch (err) {
                setError(err.message || 'Hub not found')
            } finally {
                setLoading(false)
            }
        }
        fetchPublicHub()
    }, [hubId, alias])

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
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Typography color='error' variant='h6'>{error}</Typography>
                </Box>
            ) : (
                <PublicHub
                    hubName={hubData?.name}
                    links={hubData?.links || []}
                />
            )}
            <Footer />
        </Container>
    )
}

export default UserHub
