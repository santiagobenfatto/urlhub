import React from 'react'
import { Box } from '@mui/material'
import LinksTable from './LinksTable.jsx'
import AddLinkForm from './AddLinkForm.jsx'
import EditLinkForm from './EditLinkForm.jsx'
import { useLink } from '../../Context/useLink.jsx'

const LinksTableContainer = () => {

    const { isEditting, linkId } = useLink()

    return (
            <Box sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                minHeight: { xs: 'auto', sm: '40vh', md: '50vh' },
                width: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
                height: 'auto',
                maxHeight: { xs: 'none', md: '80vh' },
            }}>
                <LinksTable />
                { !isEditting ? (<AddLinkForm />) : (<EditLinkForm linkId={linkId} />)}
                
            </Box>
    )
}

export default LinksTableContainer
