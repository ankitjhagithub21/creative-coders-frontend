import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useSelector } from 'react-redux'
const Contact = () => {
  const user = useSelector(state=>state.auth.user)
  const initialData = {
    username: user ? user.username : "",
   email: user ? user.email : "",
    message: ""
  }
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
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/contact/new`, {
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

  return (
    <section>
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="md:w-1/2 w-full p-5">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-6114172-5059493.png" alt="contact" />
        </div>
        <form className="md:w-1/2 w-full " onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold  mb-5">
            Contact Us
          </h2>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="username" className="mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent'
              required
              autoComplete='off'
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent'
              required
              autoComplete='off'
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="message" className="mb-2">
              Message
            </label>
            <textarea name="message" id="message" value={formData.message}
              onChange={handleChange} className='text-lg px-4 border-2 py-2 rounded-md outline-none bg-transparent'  rows="3" required></textarea>
          </div>
          <button className="text-white bg-blue-600 border-0 py-1 px-6 focus:outline-none hover:bg-blue-700 rounded text-lg">
            {loading ? 'Loading...' : 'Submit'}
          </button>

        </form>

      </div>
      <div className='container mx-auto px-5 mb-12'>
        <iframe
       
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.34595732528!2d77.24107616913463!3d23.199639468430778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1713956876546!5m2!1sen!2sin"
          className='w-full h-96 rounded'
          
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>
    </section>

  )
}

export default Contact
