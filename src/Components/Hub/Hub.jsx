import { Stack, Button, Typography, Box } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import React from 'react'
import { BorderColor } from '@mui/icons-material'


const Hub = () => {
    return (
     <Box 
     sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '380px',
        height: 'auto',
        border: '1px solid white',
        borderRadius: '16px',
        pt: '16px',
        pb: '16px'
    }}
    >
        <Typography
                variant='h3'
                sx={{
                    fontFamily: 'kalam',
                    fontWeight: 700,
                    color: 'secondary.main',
                    mt: '16px',
                    mb: '16px'
                }}
                >My Url Hub!
            </Typography>
        <Stack 
            spacing={3}
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                mt: '16px',
                mb: '16px'
            }}
            >
            <Button
                startIcon={<GitHubIcon />}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                    width: '45%',
                    border: '1px solid white',
                    ':hover': {
                        color: '#ff6f00',
                        border: '1px solid #ff6f00'
                    } 
                }}
            > My Github
            </Button>
            <Button
                startIcon={<LinkedInIcon />}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                    width: '45%',
                    border: '1px solid white',
                    ':hover': {
                        color: '#ff6f00',
                        border: '1px solid #ff6f00'
                    } 
                }}
            > My Linkedin
            </Button>
            <Button
                startIcon={<FacebookIcon />}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                    width: '45%',
                    border: '1px solid white',
                    ':hover': {
                        color: '#ff6f00',
                        border: '1px solid #ff6f00'
                    } 
                }}
            > My Facebook
            </Button>
        </Stack>
        </Box>
    )
}

export default Hub
