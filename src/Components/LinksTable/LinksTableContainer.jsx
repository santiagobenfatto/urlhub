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
                minHeight: '50vh',
                width: '50%',
                height: 'auto',
                maxHeight: '80vh',
            }}>
                <LinksTable />
                { !isEditting ? (<AddLinkForm />) : (<EditLinkForm linkId={linkId} />)}
                
            </Box>
    )
}

export default LinksTableContainer
