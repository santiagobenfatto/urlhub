import { createBrowserRouter } from 'react-router-dom'
import { Login, Register, Dashboard, Settings, UserHub, Home, NotFound } from '../Pages/index.js'
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
        path:'/settings',
        element:<Settings />
    },
    {
        path:'/hub/:hubId',
        element:<UserHub />
    },
    {
        path:'/404',
        element:<NotFound />
    },
    {
        path:'*',
        element: <AliasResolver />
    }
])