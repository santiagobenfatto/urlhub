import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { resolveAlias } from '../Service/alias.service.js'
import { linksListAdapter } from '../Adapters/links.adapter.js'
import { publicHubAdapter } from '../Adapters/hub.adapter.js'
import PublicHub from '../Components/Hub/PublicHub.jsx'
import { Container } from '@mui/material'
import NavBar from '../Components/NavBar/NavBar.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import NotFound from './NotFound.jsx'
import LoadingScreen from '../Components/LoadingScreen.jsx'

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
            let redirected = false
            try {
                const json = await resolveAlias(alias)

                if (json.type === 'link') {
                    const target = json.big_link || json.bigLink
                    if (target) {
                        redirected = true
                        window.location.replace(target)
                        return
                    }
                    setHubData(null)
                    return
                }

                if (json.type === 'hub' && json.name) {
                    const hub = await publicHubAdapter(json)
                    if (hub?.links) {
                        hub.links = await linksListAdapter(hub.links)
                    }
                    setHubData(hub)
                    return
                }

                setHubData(null)
            } catch {
                setHubData(null)
            } finally {
                if (!redirected) {
                    setResolved(true)
                    setLoading(false)
                }
            }
        }
        fetchAlias()
    }, [alias])

    if (!resolved && loading) return <LoadingScreen />

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
                    ownerName={hubData?.firstName}
                    ownerNickname={hubData?.nickname}
                    links={hubData?.links || []}
                />
                <Footer />
            </Container>
        )
    }

    return <NotFound />
}

export default AliasResolver
