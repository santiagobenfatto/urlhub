import React from 'react'
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import AddLinkForm from './AddLinkForm.jsx'
import DeleteIcon from '@mui/icons-material/Delete'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { useLinksManager } from '../../Context/CustomHooks.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { removeLink } from  '../../Redux/slices/links.slice.js'






const LinksTable = () => {

    const { handleEditing, isEditing} = useLinksManager()
    
    const rows = useSelector(state => state.links.links)
    const dispatch = useDispatch()

    return (
            <TableContainer component={Paper}
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
                alignSelf: 'center',
                color: 'primary.main',
                my: '1rem'
            }}
        >
            <Table size='small'
                sx={{ 
                    width: '100%'  
                }}>
            <TableHead>
            <TableRow
            sx={{maxHeight: '1rem'}}>
                <TableCell>Big&nbspLink</TableCell>
                <TableCell>/alias</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>QR</TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    <Button 
                        onClick={handleEditing}
                        sx={{
                            fontFamily: 'Montserrat Variable',
                            fontSize: '1rem',
                            textTransform: 'none',
                            px: '8px',
                            py: 0,
                            m: 0
                        }}>
                        +add&nbspLink
                    </Button>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
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
                </TableCell>
                </TableRow>
            ))}
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                {isEditing && (
                    <AddLinkForm />
                    )}
                </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
    )
}

export default LinksTable
