import React from 'react'
import { Box } from '@mui/material'
import Footer from './Footer.jsx'

const FooterContainer = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
            height: '150px',
            mb: '12px'
        }}>
           <Footer />
        </Box >
    )
}

export default FooterContainer
