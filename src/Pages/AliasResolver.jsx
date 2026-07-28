import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicHubByAlias } from '../Service/hub.service.js'
import PublicHub from '../Components/Hub/PublicHub.jsx'
import { Box, CircularProgress, Container } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import Home from './Home.jsx'

function AliasResolver() {
    const { '*': path } = useParams()
    const alias = path && !path.includes('/') ? path : null

    const [hubData, setHubData] = useState(null)
    const [loading, setLoading] = useState(!!alias)
    const [resolved, setResolved] = useState(false)

    useEffect(() => {
        if (!alias) {
            setResolved(true)
            return
        }

        const fetchAlias = async () => {
            try {
                const data = await getPublicHubByAlias(alias)
                setHubData(data)
            } catch {
                setHubData(null)
            } finally {
                setResolved(true)
                setLoading(false)
            }
        }
        fetchAlias()
    }, [alias])

    if (!resolved && loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'primary.main'
            }}>
                <CircularProgress color='secondary' />
            </Box>
        )
    }

    if (hubData) {
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
                <PublicHub
                    hubName={hubData?.name}
                    links={hubData?.links || []}
                />
                <Footer />
            </Container>
        )
    }

    return <Home />
}

export default AliasResolver
