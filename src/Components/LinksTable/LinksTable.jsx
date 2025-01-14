import React from 'react'
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import QrCode2Icon from '@mui/icons-material/QrCode2' 
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { useSelector, useDispatch } from 'react-redux'
import { removeLink } from  '../../Redux/slices/links.slice.js'
import { addLinkToHub } from '../../Redux/slices/hubs.slice.js'




const LinksTable = () => {
    
    const rows = useSelector(state => state.links.links)
    const dispatch = useDispatch()

    return (
            <TableContainer component={Paper}
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
                maxHeight: '40vh',
                alignSelf: 'flex-start',
                color: 'primary.main',
                my: '1rem'
            }}
        >
            <Table size='small'
                sx={{ 
                    overflowY: 'hidden',
                    width: '100%'
                }}>
            <TableHead>
            <TableRow
            sx={{maxHeight: '1rem'}}>
                <TableCell>Big&nbsp;Link</TableCell>
                <TableCell>/alias</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>QR</TableCell>
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
                <TableCell>{row.big_link}</TableCell>
                <TableCell>{row.alias}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <QrCode2Icon />
                </TableCell>
                <TableCell sx={{ textAlign: 'center'}} >
                    <IconButton
                        alt= 'Delete Url'
                        title='Delete Url'
                        onClick={() => dispatch(removeLink(row.id))}
                        color='secondary'
                        sx={{
                            p: 0,
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                    <DeleteIcon sx={{ fontSize: 'inherit' }}/> 
                    </IconButton>
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
                </TableCell>
                </TableRow>
            )))}
            </TableBody>
            </Table>
            </TableContainer>
    )
}

export default LinksTable
