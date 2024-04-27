import React, { useState, useEffect } from 'react'
import { getServices } from '../helpers/getServices'
import Service from '../components/Service'
import toast from "react-hot-toast"
import Loader from '../components/Loader'
const Services = () => {
  const [services, setServices] = useState([])
  const [loading,setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const getAllServices = () => {
    getServices().then((data) => {
      setServices(data.services)
    }).catch((err) => {
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }
  useEffect(() => {
    getAllServices()
  }, [])
  
  const handleDelete = async (id) => {
    if (token) {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/service/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        getAllServices()
      } else {
        toast.error(data.message)
      }
    }
  }

  if(loading){
    return <Loader/>
  }
  return (
    <section id="services">
      <div className="container lg:px-5 px-0 py-24 mx-auto">
        <h1 className="text-4xl   text-center mb-10">
          Our Services
        </h1>
        <div className="flex flex-wrap">
          {
            services.length > 0 && services.map((service) => {
              return <Service key={service._id} service={service} handleDelete={handleDelete} />
            })
          }

        </div>
      </div>
    </section>

  )
}

export default Services
