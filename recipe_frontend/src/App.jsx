import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

import { Link ,createBrowserRouter,RouterProvider} from 'react-router-dom';
const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<Login />
    },
    {
      path:'/home',
      element:<Home />
    }
  ]
)


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
            <RouterProvider router={router}/>

    </>
  )
}

export {App,router}
