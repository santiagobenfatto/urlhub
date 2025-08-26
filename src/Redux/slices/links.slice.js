import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    links: []
}

const linkSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        addLink(state, action) {
            state.links.push({
                id: action.payload.id,
                title: action.payload.title,
                bigLink: action.payload.big_link,
                shortLink: action.payload.short_link,
                icon: action.payload.icon || '',
                alias: `/${action.payload.alias}`
            })
        },
        addLinksBulk(state, action) {
            state.links = action.payload.map(link => ({
                id: link.id,
                title: link.title,
                bigLink: link.big_link,
                shortLink: link.short_link,
                icon: link.icon || '',
                alias: `/${link.alias}`
                }))
            },
        updateLinkField(state, action) {
            const linkIndex = state.links.findIndex(link => link.id === action.payload.id)
            if (linkIndex !== -1) {
                state.links[linkIndex][action.payload.field] = action.payload.value
            }
        },
        removeLink(state, action){
            state.links = state.links.filter(link => link.id !== action.payload)
        }
    }

})

export const { addLink, addLinksBulk, removeLink, updateLinkField } = linkSlice.actions
export default linkSlice.reducer