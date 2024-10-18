import React, { useState } from 'react'
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import QrCode2Icon from '@mui/icons-material/QrCode2'



const rows = [
    {
        big_link: 'https://instagram.com/blabla',
        alias: '/4vQr7',
        name: 'Instagram',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link: ''
    },
    {
        big_link: 'https://facebook.com/blabla',
        alias: '/5vTr7',
        name: 'Facebook',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link: ''
    }
]


const LinksTable = () => {
    const [ isEditing, setIsEditing ] = useState(false)

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
            <TableRow>
                <TableCell>Big&nbsp;Link</TableCell>
                <TableCell>/alias</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>QR</TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    <Button 
                        sx={{
                            fontFamily: 'Montserrat Variable',
                            fontSize: '1rem',
                            textTransform: 'none',
                            px: '8px',
                            py: 0,
                            m: 0
                        }}>
                        +add&nbsp;Link
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
             <TableRow>
             <TableCell>Input</TableCell>
                <TableCell>Input</TableCell>
                <TableCell>Select Icon</TableCell>
                <TableCell>
                  <QrCode2Icon />
                </TableCell>
                <TableCell sx={{ textAlign: 'center'}} >
                    <IconButton 
                        sx={{
                            fontWeight: 600,
                            color: 'green',
                            p: 0,
                            ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                        }
                        }}>
                    <CheckIcon sx={{ fontSize: 'inherit' }}/>
                    </IconButton>
                    <IconButton 
                        sx={{
                            fontWeight: 600,
                            color: 'red',
                            p: 0,
                            ':hover': {
                                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                            }
                        }}>
                    <ClearIcon sx={{ fontSize: 'inherit' }}/> 
                    </IconButton>                
                </TableCell>
             </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
    )
}

export default LinksTable
