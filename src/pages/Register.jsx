import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { simplePasswordValidator } from '../helpers/passwordValidator'
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const initialData = {
    username: "",
    email: "",
    password: ""
  }
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.username.length <3 && formData.username.length > 20){
      return toast.error("Username should be min 3 char long and max 20 char long.")
    }
    let result = simplePasswordValidator(formData.password)
    if (result.success) {
      try {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (data.success) {
          toast.success(data.message)
          setFormData(initialData)
          navigate("/login")
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      } finally {
        setLoading(false)
      }

    } else {
      toast.error(result.msg)
    }

  }
  if (user) {
    return <Navigate to={"/"} />
  }
  return (
    <div className='text-white h-screen w-full flex flex-col  items-center px-5 justify-center'>
      <div>
        <h2 className="mb-6 text-center text-2xl font-semibold">Register a New Account</h2>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5  md:w-1/3 w-full mx-auto'>
        <input type="text" placeholder='Name' name='username' className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent' value={formData.username} onChange={handleChange} required autoComplete='off' />
        <input type="email" placeholder='Email' className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent' name='email' value={formData.email} onChange={handleChange} required autoComplete='off' />
        <div className='relative w-full'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='text-lg w-full px-4 border-2 py-2 rounded-md outline-none bg-transparent' name='password' value={formData.password} onChange={handleChange} required />
          {
            showPassword ? <FaEye className='absolute top-4 cursor-pointer right-4' onClick={() => setShowPassword(false)} /> : <FaEyeSlash className='absolute cursor-pointer top-4 right-4' onClick={() => setShowPassword(true)} />
          }
        </div>
        <button type='submit' className='text-lg px-4 py-2 rounded-md outline-none bg-blue-600 hover:bg-blue-700 text-white'>{loading ? 'Loading...' : 'Register'}</button>
      </form>
    </div>
  )
}

export default Register
