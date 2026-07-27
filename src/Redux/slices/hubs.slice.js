import { createSlice } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable'

const initialState = {
    name: 'My Urls Hub!',
    links: [
        {
            id: 1,
            title: 'Instagram',
            shortLink: 'https://urlhub.io/4vQr7',
            icon: 'Instagram'
        },
        {
            id: 2,
            title: 'Facebook',
            shortLink: 'https://urlhub.io/4vQr7',
            icon: 'Facebook'
        },
        {
            id: 3,
            title: 'Github',
            shortLink: 'https://urlhub.io/6v8r7',
            icon: 'GitHub'
        }
    ]
}

const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        addLinkToHub(state, action) {
            const existingIds = state.links.map(l => l.id)
            const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1
            state.links.push({
                id: action.payload.id || nextId,
                title: action.payload.title,
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

export const { addLinkToHub, removeLinkFromHub, addLinksBulkToHub, resetHub, modifyTitle, reorderLinks } = hubSlice.actions
export default hubSlice.reducer