import React, { useState } from 'react'
import { 
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, 
    } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import QrCode2Icon from '@mui/icons-material/QrCode2'



const rows = [
    {
        big_link: 'https://biglink.com/blabla',
        alias: '/4vQr7',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link:''
    },
    {
        big_link: 'https://biglink.com/blabla',
        alias: '/5vTr7',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link:''
    }
]


const LinksTable = () => {
    const [ isEditing, setIsEditing ] = useState(false)

    return (
            <TableContainer component={Paper}
            sx={{
                width: '60%',
                height: 'auto',
                alignSelf: 'center',
                color: 'primary.main',
            }}
        >
            <Table sx={{ 
                width: '100%'                
                }}>
            <TableHead>
            <TableRow>
                <TableCell>Big&nbsp;Link</TableCell>
                <TableCell>/alias</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>QR</TableCell>
                <TableCell>
                    <Button 
                        variant='text'
                        color='secondary'
                        sx={{
                            fontFamily: 'Montserrat Variable',
                            textTransform: 'none',
                            px: '8px',
                            py: 0,
                            m: 0,
                            ':hover': {
                                color: '#ff6f00'
                            }
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
                <TableCell>{row.icon}</TableCell>
                <TableCell>
                  <QrCode2Icon />
                </TableCell>
                <TableCell>
                    {isEditing ? 
                    <>
                    <IconButton 
                        color='secondary'
                        sx={{
                            p: 0,
                            ':hover': {
                                color: '#ff6f00'
                            }
                        }}>
                    <CheckIcon />
                    </IconButton>
                    <IconButton 
                        color='secondary'
                        sx={{
                            p: 0,
                            ':hover': {
                                color: '#ff6f00'
                            }
                        }}>
                            <ClearIcon /> 
                        </IconButton>
                    </> 
                    :
                    <IconButton 
                        color='secondary'
                        sx={{
                            p: 0,
                            ':hover': {
                                color: '#ff6f00'
                            }
                        }}>
                            <DeleteIcon />
                        </IconButton>
                        }
                    
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
    )
}

export default LinksTable
