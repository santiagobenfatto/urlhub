import { createSlice } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable'

const initialState = {
    hubId: null,
    shortLink: null,
    name: 'My Urls Hub!',
    links: []
}

const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        setHubId(state, action) {
            state.hubId = action.payload
        },
        setHubShortLink(state, action) {
            state.shortLink = action.payload
        },
        addLinkToHub(state, action) {
            const existingIds = state.links.map(l => l.id)
            const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1
            state.links.push({
                id: action.payload.id || nextId,
                title: action.payload.title,
                bigLink: action.payload.bigLink,
                shortLink: action.payload.shortLink,
                icon: action.payload.icon || ''
            })
        },
        removeLinkFromHub(state, action) {
            state.links = state.links.filter(link => link.id !== action.payload)
        },
        addLinksBulkToHub(state, action) {
            state.links = action.payload.map(link => ({
                id: link.id,
                title: link.title,
                bigLink: link.bigLink,
                shortLink: link.shortLink,
                icon: link.icon || ''
            }))
        },
        modifyTitle(state, action) {
            state.name = action.payload.title
        },
        resetHub() {
            return initialState
        },
        reorderLinks(state, action) {
            const { oldIndex, newIndex } = action.payload
            state.links = arrayMove(state.links, oldIndex, newIndex)
        }
    }
})

export const { setHubId, setHubShortLink, addLinkToHub, removeLinkFromHub, addLinksBulkToHub, resetHub, modifyTitle, reorderLinks } = hubSlice.actions
export default hubSlice.reducer