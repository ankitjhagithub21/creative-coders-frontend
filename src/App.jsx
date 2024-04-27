import React, { useEffect} from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {Toaster} from "react-hot-toast"
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import { getUserFromServer } from './helpers/getUserFromServer'
import { useDispatch } from 'react-redux'
import { logoutUser, setUser } from './app/slices/authSlice'
import Dashboard from './pages/Dashboard'


const App = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){
      getUserFromServer(token).then((data)=>{
        if(data.success){
          dispatch(setUser(data.user))
        }else{
          dispatch(logoutUser())
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  },[])
  
  return (
   <BrowserRouter>
   <Toaster/>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/services' element={<Services/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard/*' element={<Dashboard/>}/>
    <Route path='/*' element={<NotFound/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
