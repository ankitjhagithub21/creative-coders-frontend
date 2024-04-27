import React, { useEffect, useState } from 'react'
import { getContact } from '../helpers/getContact'

const Messages = () => {
  const [conatcts,setContacts] = useState([])
  useEffect(()=>{
    getContact().then((data)=>{
      setContacts(data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className='flex flex-col w-full gap-5 text-gray-800 p-5 pr-2 lg:pr-0'>
      <h2 className='text-white text-3xl font-semibold text-center'>All contacts</h2>
      {
        conatcts.map((contact)=>{
          return <div key={contact._id} className='bg-white p-5 rounded-lg shadow-lg'>
            <h2>{contact.username}</h2>
            <h2>{contact.email}</h2>
            <p>{contact.message}</p>
          </div>
        })
      }
    </div>
  )
}

export default Messages
