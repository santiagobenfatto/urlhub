import React, { useEffect, useState } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { addLinksBulk, removeLink } from  '../../Redux/slices/links.slice.js'
import { addLinkToHub, removeLinkFromHub } from '../../Redux/slices/hubs.slice.js'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import { deleteLink, getUserLinks } from '../../Service/links.service.js'
import { addLinkToHubService } from '../../Service/hub.service.js'
import { useLink } from '../../Context/useLink.jsx'
import MobileLinkCards from './MobileLinkCards.jsx'



const LinksTable = () => {    

    const linksMap = useSelector(state => state.links.links)
    const hubId = useSelector(state => state.hub.hubId)
    const hubLinks = useSelector(state => state.hub.links)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleEditting, linkId } = useLink()
    const [expandedLink, setExpandedLink] = useState(null)
    
    const handleEdit = async (linkIdData) => { 
        handleEditting(linkIdData)
    }
    
    const handleDelete = async (linkIdData) => { 
        try {
            await deleteLink(linkIdData)
            dispatch(removeLink(linkIdData))
            dispatch(removeLinkFromHub(linkIdData))
            toast.warn('Link deleted', { theme: 'dark'})
        } catch (error) {
            console.error('Error al eliminar en backend:', error)
            toast.error('Could not delete the link', { theme: 'dark' })
        }
    }

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const data = await getUserLinks()
                dispatch(addLinksBulk(data))
            } catch (error) {
                if (error.message.includes('403') || error.message.includes('401')) {
                    toast.error('Session expired. Redirecting...', { theme: 'dark' })
                    navigate('/home')
                    return
                }
                console.error('Error al cargar los links:', error)
            }
        }
        fetchLinks()
    }, [dispatch, navigate])

    return (
            <>
            <MobileLinkCards
                links={linksMap}
                linkId={linkId}
                hubId={hubId}
                hubLinks={hubLinks}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                dispatch={dispatch}
            />
            <TableContainer 
            component={Paper}
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
                maxHeight: { xs: '50vh', sm: '40vh' },
                alignSelf: 'flex-start',
                color: 'primary.main',
                my: '1rem',
                borderRadius: 0,
                overflowX: 'hidden',
                display: { xs: 'none', md: 'block' }
            }}
        >
            <Table size='small'
                sx={{ 
                    overflowY: 'hidden',
                    width: '100%',
                    border: 'none',
                    tableLayout: 'auto'
                }}>
            <TableHead>
            <TableRow
            sx={{maxHeight: '1rem'}}>
                <TableCell>Big&nbsp;Link</TableCell>
                <TableCell>/alias</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>{/* Empty to hold the space */}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {linksMap.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'gray' }}>
                        No links available. Add a new link to get started!
                    </TableCell>
                </TableRow>
            ) : (
            linksMap.map((link) => (
                <TableRow
                key={link.alias}
                sx={{ '&:last-child td, &:last-child th': { border: 0 },
                    '.MuiTableCell-root': {color: link.id === linkId ? '#ffb300' : '' }
                }}
                >
                <TableCell sx={{ maxWidth: { xs: '120px', sm: '200px' } }}>
                    <Tooltip title={link.bigLink}>
                        <span
                            onClick={() => setExpandedLink(expandedLink === link.id ? null : link.id)}
                            style={{
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: expandedLink === link.id ? 'normal' : 'nowrap',
                                cursor: 'pointer'
                            }}
                        >
                            {link.bigLink}
                        </span>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title='Alias'>
                    <span>{link.alias}</span>
                    </Tooltip>
                    &nbsp;
                    <Tooltip title='Copy'>
                    <IconButton
                        alt= 'Copy Short Url'
                        onClick={ () =>{             
                            navigator.clipboard.writeText(link.shortLink)
                            .then( () => {
                                toast.success('Short link copied', {theme: 'dark'})
                            })
                            .catch( () => {
                                toast.error('An error occurred, please try again.', {theme: 'dark'})
                            })
                        }}
                        sx={{
                            p: 0.5,
                            color: link.id === linkId ? '#ffb300' : 'secondary.main',
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                        <ContentCopyIcon />
                    </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title={link.icon ? link.icon : 'No icon assigned'}>
                    <span>
                    {link.icon
                        ? <DynamicIcon iconName={link.icon} />
                        : <ClearIcon sx={{ color: 'error.main', fontSize: '1.2rem' }} />
                    }
                    </span>
                    </Tooltip>
                </TableCell>
                <TableCell>
                <Tooltip title='This will be the button title in your hub'>
                    <span>{link.title}</span>
                </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }} >
                    <Tooltip title='Delete URL'>
                    <IconButton
                        alt= 'Delete URL'
                        onClick={() => handleDelete(link.id)}
                        sx={{
                            p: 0.5,
                            color: link.id === linkId ? '#ffb300' : 'secondary.main',
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                    <DeleteIcon sx={{ fontSize: 'inherit' }}/> 
                    </IconButton>
                    </Tooltip>
                    <Tooltip title='Add the link to your hub'>
                    <IconButton
                        alt= 'Add Hub Icon'
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
                        sx={{
                            p: 0.5,
                            color: link.id === linkId ? '#ffb300' : 'secondary.main',
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                    <AddToPhotosIcon sx={{ fontSize: 'inherit' }}/> 
                    </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit your URL'>
                    <IconButton
                        alt= 'Edit Link Icon'
                        onClick={() => handleEdit(link.id)}
                        sx={{
                            p: 0.5,
                            color: link.id === linkId ? '#ffb300' : 'secondary.main',
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                    <EditIcon /> 
                    </IconButton>  
                    </Tooltip>
                </TableCell>
                </TableRow>
            )))}
            </TableBody>
            </Table>
            </TableContainer>
            </>
    )
}

export default LinksTable
