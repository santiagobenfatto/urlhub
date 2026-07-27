import React, { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reorderLinks, removeLinkFromHub, addLinksBulkToHub } from '../../Redux/slices/hubs.slice.js'
import { getUserHub, removeLinkFromHubService, saveHub } from '../../Service/hub.service.js'
import SortableLink from './SortableLink.jsx'


const Hub = () => {

    const linkButtons = useSelector(state => state.hub.links)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchHub = async () => {
            try {
                const data = await getUserHub()
                if (data?.links?.length) {
                    dispatch(addLinksBulkToHub(data.links))
                }
            } catch (error) {
                console.error('Error fetching hub:', error)
            }
        }
        fetchHub()
    }, [dispatch])

    const handleDelete = async (linkId) => {
        try {
            await removeLinkFromHubService(linkId)
            dispatch(removeLinkFromHub(linkId))
            toast.warn('Link removed from hub', { theme: 'dark' })
        } catch (error) {
            console.error('Error removing link from hub:', error)
            toast.error('Failed to remove link from hub', { theme: 'dark' })
        }
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = linkButtons.findIndex(link => link.id === active.id)
        const newIndex = linkButtons.findIndex(link => link.id === over.id)

        dispatch(reorderLinks({ oldIndex, newIndex }))

        try {
            const reordered = linkButtons.slice()
            const [moved] = reordered.splice(oldIndex, 1)
            reordered.splice(newIndex, 0, moved)
            await saveHub({ links: reordered })
        } catch (error) {
            console.error('Error saving hub order:', error)
            toast.error('Failed to save hub order', { theme: 'dark' })
        }
    }

    const linkIds = linkButtons.map(link => link.id)

    return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '80%', sm: '325px', md: '350px' },
            minHeight: '400px',
            height: 'auto',
            border: '1px solid white',
            borderRadius: '32px'
        }}
        >
        <Typography
                variant='h3'
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    fontFamily: 'kalam',
                    fontWeight: 700,
                    color: 'secondary.main',
                    height: '75px',
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '3rem' },
                    my: '12px'
                }}>
                My UrlsHub
            </Typography>

                <Stack
                spacing={4}
                sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flexGrow: 1,
                '& .MuiButton-root': {
                    width: {xs: '50%', sm:'45%'},
                    justifyContent: 'flex-start',
                    textAlign: 'center'
                },
                '& .MuiButton-startIcon': {
                    marginLeft: 0
                }
            }}>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={linkIds} strategy={verticalListSortingStrategy}>
                        {linkButtons.map(btn => (
                            <SortableLink
                                key={btn.id}
                                btn={btn}
                                onDelete={handleDelete}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </Stack>
        </Box>
    )
}

export default Hub
