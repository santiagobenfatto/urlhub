import { configureStore } from '@reduxjs/toolkit'
import linksReducer from './slices/links.slice.js'
import userReducer from './slices/user.slice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        links: linksReducer
    }
})