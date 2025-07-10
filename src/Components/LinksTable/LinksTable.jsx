import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { removeLink } from  '../../Redux/slices/links.slice.js'
import { addLinkToHub } from '../../Redux/slices/hubs.slice.js'
import DynamicIcon from '../Icons/DynamicIcon.jsx'



const LinksTable = () => {
    
    const rows = useSelector(state => state.links.links)
    const dispatch = useDispatch()

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
                {/* <TableCell>QR</TableCell> */}
                <TableCell>{/* Empty to hold the space */}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'gray' }}>
                        No links available. Add a new link to get started!
                    </TableCell>
                </TableRow>
            ) : (
            rows.map((row) => (
                <TableRow
                key={row.alias}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>
                    <Tooltip title='BigLink'>
                        {row.bigLink}
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title='Alias'>
                    {row.alias}
                    </Tooltip>
                    &nbsp;
                    <Tooltip title='Copy'>
                    <IconButton
                        alt= 'Copy Short Url'
                        title='Copy Short Url'
                        onClick={ () =>{
                            navigator.clipboard.writeText(row.shortLink)
                            .then( () => {
                                toast.success('Se ha copiado el link acortado', {theme: 'dark'})
                            })
                            .catch( () => {
                                toast.error('Ha ocurrido un error, si persiste contactate', {theme: 'dark'})
                            })
                        }}
                        color='secondary'
                        sx={{
                            p: 0,
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                        <ContentCopyIcon />
                    </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title={row.icon || 'No icon'}>
                    <span>
                    <DynamicIcon iconName={row.icon} />
                    </span>
                    </Tooltip>
                </TableCell>
                <TableCell>
                <Tooltip title='This will be the button title in your hub'>
                    {row.title}
                </Tooltip>
                </TableCell>
                {/* <TableCell>
                  <QrCode2Icon />
                </TableCell> */}
                <TableCell sx={{ textAlign: 'center'}} >
                    <Tooltip title='Delete URL'>
                    <IconButton
                        alt= 'Delete URL'
                        title='Delete URL'
                        onClick={() => { 
                            dispatch(removeLink(row.id))
                            toast.warn('Link Eliminado', { theme: 'dark'})
                        }}
                        color='secondary'
                        sx={{
                            p: 0,
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
                        title='Add URL to Hub'
                        onClick={() => dispatch(addLinkToHub(row.id))}
                        color='secondary'
                        sx={{
                            p: 0,
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
                        title='Edit URL'
                        color='secondary'
                        sx={{
                            p: 0,
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
