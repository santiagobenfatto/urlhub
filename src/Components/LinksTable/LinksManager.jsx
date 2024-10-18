import React from 'react'
import { Box } from '@mui/material'
import LinksTableContainer from './LinksTableContainer.jsx'
import HubContainer from '../Hub/HubContainer.jsx'



const LinksManager = () => {
    return (
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '95%',
            flexGrow: 1,
        }}>
            <LinksTableContainer />
            <HubContainer isHome={false}/>
        </Box>
    )
}

export default LinksManager
