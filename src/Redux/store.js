import { configureStore } from '@reduxjs/toolkit'
import linksReducer from './slices/links.slice.js'
import userReducer from './slices/user.slice.js'
import hubReducer from './slices/hubs.slice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        links: linksReducer,
        hub: hubReducer
    }
})