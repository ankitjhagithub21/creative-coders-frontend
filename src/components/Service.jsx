import React from 'react'
import { useSelector } from 'react-redux'
import {FaTrash} from "react-icons/fa"

const Service = ({ service,handleDelete }) => {
    const user = useSelector(state=>state.auth.user)
    

    return (
        <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
            <div className="border border-gray-200 p-6 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white">

                <div className='flex items-center justify-between mb-4'>
                <h2 className="text-xl">{service.title}</h2>
                {
                    user && user.isAdmin && <FaTrash onClick={()=>handleDelete(service._id)}/>
                }
                </div>
                <p>
                    {service.description}
                </p>
               
            </div>
        </div>
    )
}

export default Service
