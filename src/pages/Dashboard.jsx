import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { setUser } from '../app/slices/authSlice';
import { getUserFromServer } from '../helpers/getUserFromServer';
import AddService from './AddService';
import Messages from './Messages';
import { MdClose } from 'react-icons/md';
import Loader from '../components/Loader';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
 
  
  useEffect(() => {
    if (token) {
      getUserFromServer(token)
        .then(data => {
          dispatch(setUser(data.user));
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='py-24 flex container mx-auto'>
      <div className='md:w-1/4 w-[80vw]  bg-white flex flex-col p-5 rounded-lg justify-center shadow-lg gap-5 h-[70vh] absolute md:relative'>
        <h2 className='font-semibold text-gray-800 text-center mt-5 text-xl'>Admin Dashboard</h2>
        <div className='md:hidden absolute top-5'>
          <MdClose color='black' className='cursor-pointer' size={20}/>
        </div>
        <Link to='/dashboard' className='bg-blue-500 p-3 rounded-lg cursor-pointer'>Home</Link>
        <Link to='/dashboard/services' className='bg-blue-500 p-3 rounded-lg cursor-pointer'>Add Service</Link>
        <Link to='/dashboard/messages' className='bg-blue-500 p-3 rounded-lg cursor-pointer'>Messages</Link>
      </div>
      <div className='lg:w-3/4 w-full md:p-0'>
        <Routes>
          <Route path="/" element={<AddService />} />
          <Route path="/services" element={<AddService />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
