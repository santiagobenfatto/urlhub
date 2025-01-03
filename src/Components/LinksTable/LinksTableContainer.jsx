import { Box, Button } from '@mui/material'
import React from 'react'
import LinksTable from './LinksTable.jsx'
import LinksProvider from '../../Context/LinksProvider.jsx'

const LinksTableContainer = () => {
    return (
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '50%',
            height: '100%'
        }}>
            <LinksProvider>
            <LinksTable />
            <Button 
            sx={{
                alignSelf: 'flex-end',
                width: '200px'
            }}>
                GENERATE HUB
            </Button>
            </LinksProvider>
        </Box>
    )
}

export default LinksTableContainer
