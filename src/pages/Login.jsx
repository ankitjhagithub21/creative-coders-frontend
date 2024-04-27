import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { storeTokenInLs } from '../app/slices/authSlice'
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const initialData = {
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

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        dispatch(storeTokenInLs(data.token))
        setFormData(initialData)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }

  }
  if (user) {
    return <Navigate to={"/"} />
  }
  return (
    <section>
      <div className='lg:w-3/4 w-full mx-auto py-24 flex flex-wrap items-center'>
        <div className='md:w-1/2 w-full'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png" alt="login" className='lg:mt-10 mt-0 mx-auto' loading='lazy'/>
        </div>
        <div className='md:w-1/2 w-full p-3 text-white'>

          <div>
            <h2 className="mb-6 text-2xl font-semibold  text-center">Login to your Account</h2>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

            <input type="email" placeholder='Email' className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent' name='email' value={formData.email} onChange={handleChange} required autoComplete='off' />
            <div className='relative w-full'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='text-lg w-full px-4 border-2 py-2 rounded-md outline-none bg-transparent' name='password' value={formData.password} onChange={handleChange} required />
              {
                showPassword ? <FaEye className='absolute top-4 cursor-pointer right-4' onClick={() => setShowPassword(false)} /> : <FaEyeSlash className='absolute cursor-pointer top-4 right-4' onClick={() => setShowPassword(true)} />
              }
            </div>
            <button type='submit' className='text-lg px-4 py-2 rounded-md outline-none bg-blue-600 hover:bg-blue-700 text-white'>{loading ? 'Loading...' : 'Login'}</button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Login
