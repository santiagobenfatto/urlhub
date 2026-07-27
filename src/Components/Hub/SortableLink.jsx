import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DynamicIcon from '../Icons/DynamicIcon.jsx'

const SortableLink = ({ btn, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState(false)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: btn.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1
    }

    return (
        <>
            <Box
                ref={setNodeRef}
                style={style}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    gap: '4px'
                }}
            >
                <IconButton
                    {...attributes}
                    {...listeners}
                    size='small'
                    sx={{
                        cursor: 'grab',
                        color: 'rgba(255, 255, 255, 0.5)',
                        p: 0.25,
                        '&:active': { cursor: 'grabbing' }
                    }}
                >
                    <DragIndicatorIcon fontSize='small' />
                </IconButton>
                <Tooltip title={btn.title}>
                    <Button
                        href={btn.shortLink}
                        startIcon={<DynamicIcon iconName={btn.icon} />}
                        sx={{ flexGrow: 1 }}
                    >
                        {btn.title}
                    </Button>
                </Tooltip>
                <IconButton
                    size='small'
                    onClick={() => setConfirmDelete(true)}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        p: 0.25,
                        ':hover': { color: 'error.main' }
                    }}
                >
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </Box>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Remove "{btn.title}" from hub?</DialogTitle>
                <DialogContent>
                    <Typography>This link will be removed from your hub.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button
                        color='error'
                        onClick={() => {
                            onDelete(btn.id)
                            setConfirmDelete(false)
                        }}
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SortableLink
