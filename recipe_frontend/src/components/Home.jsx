import '../Home.css'
import cook from '../assets/cooking.png'
import plus from '../assets/plus.png'
import profile from '../assets/profile.png'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Category  from './category'
import About from './about'

export default function Home(){

    return(
        <>
        <div className="nav">
            <div className="logo">
                <img src={cook} alt="" />
            </div>
            <div className="menu">
                <img src={profile} alt="" />
                <img src={plus} alt="" />
            </div>
        </div>
        <div className="body">
<About />
        </div>
        </>
    )
}