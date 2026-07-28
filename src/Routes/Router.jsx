import { createBrowserRouter } from 'react-router-dom'
import { Login, Register, Dashboard, UserHub, Home } from '../Pages/index.js'
import AliasResolver from '../Pages/AliasResolver.jsx'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Home />
    },
    {
        path:'/home',
        element:<Home />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/dashboard',
        element:<Dashboard />
    },
    {
        path:'/hub/:hubId',
        element:<UserHub />
    },
    {
        path:'*',
        element: <AliasResolver />
    }
])