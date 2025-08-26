import React, { useEffect } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { addLinksBulk, removeLink } from  '../../Redux/slices/links.slice.js'
import { addLinkToHub } from '../../Redux/slices/hubs.slice.js'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import { deleteLink, getUserLinks } from '../../Service/links.service.js'
import { useLink } from '../../Context/useLink.jsx'



const LinksTable = () => {    

    const linksMap = useSelector(state => state.links.links)
    const dispatch = useDispatch()

    const { handleEditting, linkId } = useLink()
    
    const handleEdit = async (linkIdData) => { 
        handleEditting(linkIdData)
    }

    const handleDelete = async (linkIdData) => { 
        try {
            await deleteLink(linkIdData)
            dispatch(removeLink(linkIdData))
            toast.warn('Link eliminado', { theme: 'dark'})
        } catch (error) {
            console.error('Error al eliminar en backend:', error)
            toast.error('No se pudo eliminar el link', { theme: 'dark' })
        }
    }

    useEffect(() => {
        const fetchLinks = async () => {
        try {
            const data = await getUserLinks()
            console.log('======= DATA DEL getUserLinks ======', data)
            dispatch(addLinksBulk(data))
        } catch (error) {
        console.error('Error al cargar links:', error)
        if (error.message.includes('403') || error.message.includes('401')) {
            window.location.href = '/home'
            return
        }
        }
        }

        fetchLinks()
    }, [dispatch])

    return (
            <TableContainer 
            component={Paper}
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
                maxHeight: '40vh',
                alignSelf: 'flex-start',
                color: 'primary.main',
                my: '1rem',
                borderRadius: 0
            }}
        >
            <Table size='small'
                sx={{ 
                    overflowY: 'hidden',
                    width: '100%',
                    border: 'none'
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
                <TableCell>
                    <Tooltip title='BigLink'>
                        <span>{link.bigLink}</span>
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
                                toast.success('Se ha copiado el link acortado', {theme: 'dark'})
                            })
                            .catch( () => {
                                toast.error('Ha ocurrido un error, si persiste contactate', {theme: 'dark'})
                            })
                        }}
                        sx={{
                            p: 0,
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
                    <Tooltip title={link.icon || 'No icon'}>
                    <span>
                    <DynamicIcon iconName={link.icon} />
                    </span>
                    </Tooltip>
                </TableCell>
                <TableCell>
                <Tooltip title='This will be the button title in your hub'>
                    <span>{link.title}</span>
                </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center'}} >
                    <Tooltip title='Delete URL'>
                    <IconButton
                        alt= 'Delete URL'
                        onClick={() => handleDelete(link.id)}
                        sx={{
                            p: 0,
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
                        onClick={() => dispatch(addLinkToHub(link.id))} //provisorio
                        sx={{
                            p: 0,
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
                            p: 0,
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
    )
}

export default LinksTable
