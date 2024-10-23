import { Box, Typography } from '@mui/material'
import React from 'react'

const LinkModal = () => {
    return (
        <Box sx={{
            position: 'absolute',
            alignSelf: 'center',
            justifySelf: 'center',
            display: 'flex',
            width: '500',
            height: '300px',
            py: 2,
            px: 3
        }}>
            <Typography variant='h6' gutterBottom >
                BigLink:
            </Typography>
        </Box>
    )
}

export default LinkModal
