import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    links: [
        {
        id: 1,
        bigLink: 'https://instagram.com/blabla',
        alias: '/4vQr7',
        title: 'Instagram',
        icon: 'Instagram',
        shortLink: 'https://urlhub.io/4vQr7'
    },
    {
        id: 2,
        bigLink: 'https://facebook.com/blabla',
        alias: '/5vTr7',
        title: 'Facebook',
        icon: 'Facebook',
        shortLink: 'https://urlhub.io/5vTr7'
    }]
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