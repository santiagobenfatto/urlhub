import React from 'react'
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import { useSelector } from 'react-redux'


const Hub = () => {
    
    const linkButtons = useSelector(state => state.hub.links)
   
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
            borderRadius: '32px'
        }}
        >
        <Typography
                variant='h3'
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    fontFamily: 'kalam',
                    fontWeight: 700,
                    color: 'secondary.main',
                    height: '75px',
                    my: '12px'
                }}>
                My UrlsHub
            </Typography>
        
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
            <Tooltip 
                title={btn.name}
                key={btn.name}>
            <Button 
            href={btn.short_link}
            startIcon={<DynamicIcon iconName={btn.icon} />}
            >
                {btn.name}
            </Button>
            </Tooltip>
        ))
    }
    </Stack>
        </Box>
    )
}

export default Hub
