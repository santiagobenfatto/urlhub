import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'


const Shortener = () => {

    const [ link, setLink ] = useState('')

    return (
        <Box component='form'
                sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '600px',
                height: '280px',
                padding: '8px',
                '& .MuiTextField-root': {
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    fontFamily: 'Roboto',
                    fontSize: '1rem',
                    borderRadius: '12px',
                },
                '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue', // Elimina el hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue', // Elimina el focus
                    },
                }
        }}>
            <Typography 
                variant='h5' 
                gutterBottom
                color='secondary.main'
                sx={{
                    fontFamily: 'Montserrat variable',
                    fontWeight: 600
                }}>
                Short your link here!
            </Typography>
            
            <TextField
                variant="outlined"
                size='small'
                placeholder='https://biglink.com/etc'
                onChange={e => {setLink(e.target.value)}}
                sx={{ width: '90%', mb: '12px' }}/>
            <Box sx={{
                display:'flex',
                width:'100%',
                gap: '8px',
                mb: '8px'
            }}>
            <TextField
                variant="outlined"
                size="small"
                defaultValue="https://urlhub.app/"
                slotProps={{
                    input: {
                        readOnly: true,
                    }
                }}
                sx={{ width:'auto', maxWidth: '18ch', mb: '8px' }}/>
                <TextField
                variant="outlined"
                size="small"
                defaultValue={link}
                placeholder='4vCl6'
                slotProps={{
                    input: {
                        readOnly: true,
                    }
                }}
                sx={{ width:'auto', mb: '8px' }}/>
            </Box>
            

            <Button 
                type='submit'
                disableElevation
                startIcon={<AutoFixHighIcon/>}
                sx= {{
                    width: '100%',
                    alignItems: 'flex-start'
                }}
                >
                    SHORTEN URL
            </Button>
        </Box>
    )
}

export default Shortener
