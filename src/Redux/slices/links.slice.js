import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    links: [
        {
        id: 1,
        big_link: 'https://instagram.com/blabla',
        alias: '/4vQr7',
        name: 'Instagram',
        icon: 'Instagram',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link: ''
    },
    {
        id: 2,
        big_link: 'https://facebook.com/blabla',
        alias: '/5vTr7',
        name: 'Facebook',
        icon: 'Facebook',
        short_link: 'https://urlhub.io/4vQr7',
        qr_link: ''
    }]
}

const linkSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        addLink(state, action) {
            state.links.push({
            id: state.links[state.links.length - 1]?.id +1 || 1,
            name: action.payload.name,
            big_link: action.payload.big_link,
            short_link: action.payload.short_link,
            icon: action.payload.icon || '',
            alias: `/${action.payload.alias}`,
            qr_link: action.payload.qr_link || ''
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