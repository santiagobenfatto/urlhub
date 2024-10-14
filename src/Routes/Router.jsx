import { createBrowserRouter } from 'react-router-dom'
import { Home, Login, Register, Dashboard } from '../Pages/index.js'

export const router = createBrowserRouter([
    {
        path:'*',
        element: <Home />
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
    }
])