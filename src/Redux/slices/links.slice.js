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
                id: state.links[state.links.length - 1]?.id +1 || 1,
                title: action.payload.title,
                bigLink: action.payload.big_link,
                shortLink: action.payload.short_link,
                icon: action.payload.icon || '',
                alias: `/${action.payload.alias}`
            })
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

export const { addLink, removeLink, updateLinkField } = linkSlice.actions
export default linkSlice.reducer