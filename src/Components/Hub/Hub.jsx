import React, { useState } from 'react'
import { Stack, Button, Typography, Box, TextField } from '@mui/material'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import { modifyTitle } from '../../Redux/slices/hubs.slice.js'
import { useDispatch, useSelector } from 'react-redux'


const Hub = () => {
    
    const [ isEditingTitle, setIsEditingTitle ] = useState(false)
    const dispatch = useDispatch()
    const title = useSelector(state => state.hub.title)
    const linkButtons = useSelector(state => state.hub.links)
    
    const handleIsEditing = () => {
        setIsEditingTitle(true)
    }
    const handleBlur = () => {
        setIsEditingTitle(false)
    }
    
    const TextFieldProps = {
        '&.MuiTextField-root': {
            overflow: 'hidden',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            height: '75px',
            my: '12px'
        },
        'input': {
            p: '0px',
            fontFamily: 'Kalam',
            fontSize: '3rem',
            fontWeight: 700,
            color: 'secondary.main',
            textAlign: 'center'
        },
        '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el focus
            }
        }
    }
    return (
    <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '325px',
            minHeight: '400px',
            height: 'auto',
            border: '1px solid white',
            borderRadius: '16px'
        }}
        >
            {isEditingTitle ? 
            <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='My Url Hub'
                    // error={error.error}
                    // helperText={error.message}
                    onChange={(e) => dispatch(modifyTitle({ title: e.target.value }))}
                    onBlur= {handleBlur}
                    required 
                    sx={TextFieldProps} />
        :
        <Typography
                onClick={handleIsEditing}
                variant='h3'
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    fontFamily: 'kalam',
                    fontWeight: 700,
                    color: 'secondary.main',
                    height: '75px',
                    my: '12px',
                    cursor: 'pointer'
                }}
                >{title === '' ? 'My UrlsHub' : title}
            </Typography>
        }
        
        <Stack 
        spacing={4}
        sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
        '& .MuiButton-root': {
            width: '45%',
            justifyContent: 'flex-start',
            textAlign: 'center'
        },
        '& .MuiButton-startIcon': {
            marginLeft: 0
        }
    }}>{
        linkButtons.map( btn => (
            <Button 
            href={btn.short_link}
            startIcon={<DynamicIcon iconName={btn.icon} />}
            key={btn.name}
            >
                {btn.name}
            </Button>
        ))
    }
    </Stack>
        </Box>
    )
}

export default Hub
