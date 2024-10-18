import React from 'react'
import { Stack, Button, Typography, Box } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'


const Hub = () => {
    return (
    <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '325px',
            minHeight: '350px',
            height: 'auto',
            border: '1px solid white',
            borderRadius: '16px'
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
                }}
                >My Url Hub!
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
    }}>
        <Button startIcon={<GitHubIcon />}> My Github </Button>
        <Button startIcon={<LinkedInIcon />}> My Linkedin </Button>
        <Button startIcon={<FacebookIcon />}> My Facebook </Button>
    </Stack>
        </Box>
    )
}

export default Hub
