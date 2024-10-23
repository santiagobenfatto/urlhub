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
            name: action.payload.name,
            bigLink: action.payload.bigLink,
            shortLink: action.payload.shortLink,
            alias: action.payload.alias,
            icon: action.payload.icon,
            qrLink: action.payload.qrLink
            })
        },
        updateLinkField(state, action) {
            const linkIndex = state.links.findIndex(link => link.id === action.payload.id)
            if (linkIndex !== -1) {
                state.links[linkIndex][action.payload.field] = action.payload.value
            }
        }
        
    }

})

export const { addLink, updateLinkField } = linkSlice.actions
export default linkSlice.reducer