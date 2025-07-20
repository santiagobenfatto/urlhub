import React, { useState } from 'react'
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { toast } from 'react-toastify'
import { validateUrl } from '../../Utils/validateRegex'
import { useLink } from '../../Context/useLink.jsx'


const Shortener = () => {

    const [ linkData, setLinkData ] = useState({
        bigLink: '',
        shortLink: ''
    })
    const [ urlError, setUrlError] = useState({
        error: false,
        message: ''
    })
    
    const { addShortURL } = useLink()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validateUrl(linkData.bigLink)){
            setUrlError({
                error:true,
                message: 'Please enter a valid URL'
            })
            return
        }
        setUrlError({
            error: false,
            message: ''
        })
        //shortLink comes from backend adapter before
        addShortURL({ 
                bigLink: linkData.bigLink,
                shortLink: 'https://urlhub.app/4vCl6'
            })
        
        toast.success('Link shortened successfully', { theme:'dark' })
    }

    return (
        <Box 
            component='form'
            onSubmit={handleSubmit}
                sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '600px',
                height: '280px',
                padding: '8px',
                }}>
            
            <Typography 
                variant='h5' 
                gutterBottom
                color='secondary.main'
                sx={{
                    fontFamily: 'Montserrat variable',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.75)'
                }}>
                Short your link here!
            </Typography>
            <Tooltip title='Enter the full URL to shorten'>
            <TextField
                variant="outlined"
                size='small'
                placeholder='https://biglink.com/etc'
                value={linkData.bigLink}
                error={urlError.error}
                helperText={urlError.message}
                required 
                onChange={e => {setLinkData((data) => ({...linkData, bigLink: e.target.value}))}}
                sx={{ width: '90%', mb: '12px' }}/>
            </Tooltip>
            <Box sx={{
                display:'flex',
                width:'100%',
                gap: '8px',
                mb: '8px'
            }}>
            <Tooltip title='https://urlhub.app/'>
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
            </Tooltip>
            <Tooltip title={`Sign up to customize your alias otherwise, it's auto-generated.`}>
            <TextField
            variant="outlined"
            size="small"
            placeholder='4vCl6'
            slotProps={{
                input: {
                    readOnly: true,
                }
            }}
            sx={{ width:'auto', mb: '8px' }}/>
            </Tooltip>
            </Box>
            <Tooltip title='Make that URL shorter!'>
            <Button 
                type='submit'
                startIcon={<AutoFixHighIcon/>}
                sx= {{
                    width: '100%',
                    alignItems: 'flex-start'
                }}
                >
                    SHORTEN URL
            </Button>
            </Tooltip>
        </Box>
    )
}

export default Shortener
