import { Box } from '@mui/material'
import React from 'react'
import LinksTable from './LinksTable.jsx'
import LinksProvider from '../../Context/LinksProvider.jsx'
import AddLinkForm from './AddLinkForm.jsx'

const LinksTableContainer = () => {
    return (
        <LinksProvider>
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            minHeight: '50vh',
            width: '50%',
            height: 'auto',
            maxHeight: '80vh',
        }}>
            <LinksTable />
            <AddLinkForm />
        </Box>
            </LinksProvider>
    )
}

export default LinksTableContainer
