import React from 'react'
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../Components/NavBar/NavBar.jsx'
import LinksTableContainer from '../Components/LinksTable/LinksTableContainer.jsx'
import HubContainer from '../Components/Hub/HubContainer.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import { buildShortUrl } from '../Utils/shortLink.js'


const Dashboard = () => {
    const hubUrl = useSelector(state => state.hub.shortLink) || ''
    const alias = useSelector(state => state.hub.alias)
    const aliasUrl = alias ? buildShortUrl(alias) : ''
    const navigate = useNavigate()

    const handleCopyLink = () => {
        navigator.clipboard.writeText(hubUrl)
        toast.success('Hub link copied!', { theme: 'dark' })
    }

    const handleCopyAlias = () => {
        if (!aliasUrl) return
        navigator.clipboard.writeText(aliasUrl)
        toast.success('Alias copied to clipboard!', { theme: 'dark' })
    }

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
                <Tooltip title='Settings'>
                    <IconButton
                        aria-label='Settings'
                        color='secondary'
                        onClick={() => navigate('/settings')}
                        sx={{ ml: 2, mb: 1 }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <LinksTableContainer />
            <Box sx={{ display: 'flex', gap: 1, my: 2, alignItems: 'center' }}>
                <Tooltip title={hubUrl ? 'View your public hub' : 'Hub not available yet'}>
                    <span>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            href={hubUrl || '#'}
                            target='_blank'
                            disabled={!hubUrl}
                            endIcon={<OpenInNewIcon />}
                        >
                            View Hub
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title={aliasUrl ? 'Copy your hub alias URL' : 'Alias not available yet'}>
                    <span>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            onClick={handleCopyAlias}
                            disabled={!aliasUrl}
                            endIcon={<ContentCopyIcon />}
                        >
                            Copy Alias
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title={hubUrl ? 'Copy hub link to clipboard' : 'Hub link not available'}>
                    <span>
                        <IconButton color='secondary' onClick={handleCopyLink} disabled={!hubUrl}>
                            <ContentCopyIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            <HubContainer isHome={false}/>
            <Footer />
        </Container>
    )
}

export default Dashboard
