import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router.jsx'

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
