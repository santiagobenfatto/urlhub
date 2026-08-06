import React, { useEffect, useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reorderLinks, removeLinkFromHub, addLinksBulkToHub, setHubId, setHubShortLink } from '../../Redux/slices/hubs.slice.js'
import { getUserHub, getHubLinks, removeLinkFromHubService, saveHub } from '../../Service/hub.service.js'
import { store } from '../../Redux/store.js'
import SortableLink from './SortableLink.jsx'
import { buildShortUrl } from '../../Utils/shortLink.js'


const Hub = ({ isHome = false }) => {

    const linkButtons = useSelector(state => state.hub.links)
    const hubId = useSelector(state => state.hub.hubId)
    const dispatch = useDispatch()
    const hubLinksFetched = useRef(false)

    useEffect(() => {
        if (isHome) return
        const fetchHub = async () => {
            try {
                const data = await getUserHub()
                if (data?.id) {
                    dispatch(setHubId(data.id))
                }
                dispatch(setHubShortLink(data?.short_link || buildShortUrl(data?.alias)))
            } catch (error) {
                console.error('Error fetching hub:', error)
            }
        }
        fetchHub()
    }, [dispatch, isHome])

    useEffect(() => {
        if (isHome || !hubId || hubLinksFetched.current) return

        const fetchHubLinks = async () => {
            try {
                const rawLinks = await getHubLinks(hubId)
                const userLinks = store.getState().links.links
                const resolved = rawLinks.map(hl => {
                    const full = userLinks.find(l => l.id === hl.link_id)
                    return full
                        ? { id: full.id, title: full.title, bigLink: full.bigLink, shortLink: full.shortLink, icon: full.icon }
                        : null
                }).filter(Boolean)
                if (resolved.length) {
                    dispatch(addLinksBulkToHub(resolved))
                }
                hubLinksFetched.current = true
            } catch (error) {
                console.error('Error fetching hub links:', error)
            }
        }
        fetchHubLinks()
    }, [hubId, dispatch, isHome])

    const handleDelete = async (linkId) => {
        try {
            await removeLinkFromHubService(hubId, linkId)
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
                {linkButtons.length === 0 && (
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'rgba(255,255,255,0.5)',
                            textAlign: 'center',
                            py: 4,
                            fontFamily: 'Montserrat variable'
                        }}>
                        No links added yet. Add links from the table above.
                    </Typography>
                )}
            </Stack>
        </Box>
    )
}

export default Hub
