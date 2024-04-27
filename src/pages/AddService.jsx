import React, { useState } from 'react'
import toast from 'react-hot-toast'


const AddService = () => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [loading,setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const handleSubmit = async(e) =>{
    e.preventDefault()
   if(token){
    try{
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/service/add`,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        },

        body:JSON.stringify({title,description})

      })
      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        setTitle('')
        setDescription('')
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
   }
  }
 
  return (
    <div className='w-full p-5'>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full  lg:w-2/3 mx-auto'>
        <h2 className='text-center text-semibold text-2xl'>Add a new Service</h2>
        <input type="text" placeholder='Enter title' className='px-4 py-2 text-gray-800 rounded-lg' value={title} onChange={(e)=>setTitle(e.target.value)}  required/>
        <textarea  placeholder='Enter description' className='px-4 py-2 text-gray-800 rounded-lg' value={description} onChange={(e)=>setDescription(e.target.value)}  rows="5" required></textarea>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>{loading ? 'Loading...':'Submit'}</button>
      </form>
    </div>
  )
}

export default AddService
