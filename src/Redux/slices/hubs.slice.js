import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        title: 'My Urls Hub!',
        links:[
        {
            id: 1,
            name: 'Instagram',
            short_link: 'https://urlhub.io/4vQr7',
            icon: 'Instagram'
        },
        {
            id: 2,
            name: 'Facebook',
            short_link: 'https://urlhub.io/4vQr7',
            icon: 'Facebook'
        },
        {
            id: 3,
            name: 'Github',
            short_link: 'https://urlhub.io/6v8r7',
            icon: 'GitHub',
        }
        ]
}

const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        addLinkToHub(state, action){
            state.hub.links.push({
            id: state.links.hub[state.hub.links.length - 1]?.id +1 || 1,
            name: action.payload.name,
            short_link: action.payload.short_link,
            icon: action.payload.icon || '',
            qr_link: action.payload.qr_link || ''
            })
        },
        removeLinkFromHub(state, action){
            state.hub.links = state.hub.links.filter(link => link.id !== action.payload)
        },
        modifyTitle(state, action){
            state.title = action.payload.title
        },
        resetHub(state, action){
            return initialState
        }
        
    }

})

export const { addLinkToHub, removeLinkFromHub, resetHub, modifyTitle } = hubSlice.actions
export default hubSlice.reducer