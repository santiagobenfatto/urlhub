import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import DynamicIcon from '../Icons/DynamicIcon.jsx'

const PublicHub = ({ ownerName, ownerNickname, links }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: { xs: '90%', sm: '420px', md: '460px' },
                height: 'auto',
                py: 4
            }}
        >
            {ownerName && (
                <Typography
                    variant='h3'
                    sx={{
                        fontFamily: 'kalam',
                        fontWeight: 700,
                        color: 'secondary.main',
                        fontSize: { xs: '2rem', sm: '2.4rem', md: '3rem' },
                        mb: ownerNickname ? 1 : 4,
                        textAlign: 'center'
                    }}>
                    {ownerName}
                </Typography>
            )}
            {ownerNickname && (
                <Typography
                    variant='body1'
                    sx={{
                        fontFamily: 'Montserrat variable',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.7)',
                        mb: 4,
                        textAlign: 'center'
                    }}>
                    {ownerNickname}
                </Typography>
            )}

            <Stack
                spacing={2}
                sx={{
                    width: '100%',
                    '& .MuiButton-root': {
                        width: '100%',
                        height: '56px',
                        borderRadius: '16px',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        px: 3,
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }
                    },
                    '& .MuiButton-startIcon': {
                        ml: 0
                    }
                }}>
                {links.length === 0 ? (
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'rgba(255,255,255,0.5)',
                            textAlign: 'center',
                            py: 6,
                            fontFamily: 'Montserrat variable'
                        }}>
                        No links available yet.
                    </Typography>
                ) : (
                    links.map((link) => (
                        <Button
                            key={link.id}
                            href={link.shortLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            startIcon={<DynamicIcon iconName={link.icon} />}
                        >
                            {link.title}
                        </Button>
                    ))
                )}
            </Stack>
        </Box>
    )
}

export default PublicHub
