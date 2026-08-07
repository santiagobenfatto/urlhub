import React from 'react'
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EditIcon from '@mui/icons-material/Edit'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import { toast } from 'react-toastify'
import { addLinkToHubService } from '../../Service/hub.service.js'
import { addLinkToHub } from '../../Redux/slices/hubs.slice.js'

const MobileLinkCards = ({ links, linkId, hubId, hubLinks, handleEdit, handleDelete, dispatch }) => {
    const handleCopy = (shortLink) => {
        navigator.clipboard.writeText(shortLink)
            .then(() => toast.success('Short link copied', { theme: 'dark' }))
            .catch(() => toast.error('An error occurred, please try again.', { theme: 'dark' }))
    }

    if (links.length === 0) {
        return (
            <Box sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                color: 'gray',
                py: 4,
                width: '100%'
            }}>
                No links available. Add a new link to get started!
            </Box>
        )
    }

    return (
        <Box sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
            py: 1
        }}>
            {links.map((link) => {
                const isEditing = link.id === linkId
                return (
                    <Paper key={link.alias} sx={{
                        p: 1.5,
                        backgroundColor: '#1e1e1e',
                        border: isEditing ? '1px solid #ffb300' : 'none',
                        borderRadius: 1
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 0.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DynamicIcon iconName={link.icon} />
                                <Typography variant='body1' sx={{
                                    fontWeight: 600,
                                    color: isEditing ? '#ffb300' : 'inherit'
                                }}>
                                    {link.title}
                                </Typography>
                            </Box>
                            <Tooltip title='Copy'>
                                <IconButton
                                    onClick={() => handleCopy(link.shortLink)}
                                    size='small'
                                    sx={{
                                        color: isEditing ? '#ffb300' : 'secondary.main',
                                        ':hover': { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))' }
                                    }}
                                >
                                    <ContentCopyIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Typography variant='body2' sx={{
                            color: 'secondary.main',
                            mb: 0.5,
                            fontFamily: 'monospace'
                        }}>
                            {link.alias}
                        </Typography>

                        <Tooltip title={link.bigLink}>
                            <Typography variant='caption' sx={{
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: 'rgba(255, 255, 255, 0.6)',
                                mb: 1
                            }}>
                                {link.bigLink}
                            </Typography>
                        </Tooltip>

                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title='Edit your URL'>
                                <IconButton
                                    onClick={() => handleEdit(link.id)}
                                    size='small'
                                    sx={{
                                        color: isEditing ? '#ffb300' : 'secondary.main',
                                        ':hover': { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))' }
                                    }}
                                >
                                    <EditIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Add the link to your hub'>
                                <IconButton
                                    onClick={async () => {
                                        if (!hubId) {
                                            toast.info('Hub is still loading, please wait', { theme: 'dark' })
                                            return
                                        }
                                        if (hubLinks.some(l => l.id === link.id)) {
                                            toast.info('This link is already in your hub', { theme: 'dark' })
                                            return
                                        }
                                        try {
                                            await addLinkToHubService(hubId, link.id)
                                            dispatch(addLinkToHub(link))
                                            toast.success('Link added to hub', { theme: 'dark' })
                                        } catch (error) {
                                            console.error('Error adding link to hub:', error)
                                            toast.error('Failed to add link to hub', { theme: 'dark' })
                                        }
                                    }}
                                    size='small'
                                    sx={{
                                        color: isEditing ? '#ffb300' : 'secondary.main',
                                        ':hover': { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))' }
                                    }}
                                >
                                    <AddToPhotosIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete URL'>
                                <IconButton
                                    onClick={() => handleDelete(link.id)}
                                    size='small'
                                    sx={{
                                        color: isEditing ? '#ffb300' : 'secondary.main',
                                        ':hover': { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))' }
                                    }}
                                >
                                    <DeleteIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default MobileLinkCards
