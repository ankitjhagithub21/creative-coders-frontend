import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import { MdMenu, MdClose } from 'react-icons/md';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
   
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logout Successful.");
    };

    const links = ['home', 'about', 'services', 'contact'];

    return (
        <nav className='z-10 w-full fixed top-0 lg:px-5 px-2'>
            <div className="container mx-auto bg-blue-500 px-4 mt-2 rounded-lg">
                <div className="flex justify-between items-center h-16">
                    <div>
                        <span className="font-semibold text-xl">Creative Coders</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex gap-3">
                            {links.map((link, index) => (
                                <Link
                                    to={`/${link === 'home' ? '' : link}`}
                                    key={index}
                                    className={`capitalize px-3 text-lg py-1  rounded-md bg-blue hover:bg-white hover:text-blue-500`}
                                >
                                    {link}
                                </Link>
                            ))}
                           
                            {isLoggedIn ? (
                                <button className="capitalize bg-red-500 px-3 text-lg py-1 rounded-md hover:bg-red-600" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="capitalize hover:bg-white hover:text-blue-500 px-3 text-lg py-1 rounded-md">
                                        Login
                                    </Link>
                                    <Link to="/register" className="capitalize hover:bg-white hover:text-blue-500 px-3 text-lg py-1 rounded-md">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                            {isOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <div className={isOpen ? 'md:hidden' : 'hidden'}>
                <div className="flex flex-col bg-[#3D3D3D] rounded-lg py-2 gap-1 px-2">
                    {links.map((link, index) => (
                        <Link
                            to={`/${link === 'home' ? '' : link}`}
                            key={index}
                            className="capitalize hover:bg-blue-700 px-3 text-lg py-1 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            {link}
                        </Link>
                    ))}
                   

                    {isLoggedIn ? (
                        <button className="capitalize bg-red-500 px-3 text-lg py-1 rounded-md hover:bg-red-600" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="capitalize hover:bg-blue-700 px-3 text-lg py-1 rounded-md">
                                Login
                            </Link>
                            <Link to="/register" className="capitalize hover:bg-blue-700 px-3 text-lg py-1 rounded-md">
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;
