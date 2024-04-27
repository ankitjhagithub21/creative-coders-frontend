import React from 'react'
import { Link } from 'react-router-dom'
import Services from './Services'
import Contact from './Contact'

const Home = () => {
  return (
    <>
      <section className='min-h-screen flex w-full items-center justify-center'>
        <div className="container mx-auto flex px-5 py-24 md:flex-row  flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="sm:text-4xl text-3xl mb-4 mt-4 md:mt-0 font-semibold">
            Web Development Services
            </h1>
            <p className="mb-8 leading-relaxed text-lg">
            We design and develop websites for our clients worldwide, focusing on outstanding user experience.
            </p>
            <div className="flex justify-center">
              <Link to={"/contact"} className="inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-700 rounded text-lg">
                Contact Us
              </Link>
              <Link to={"/about"} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:p-5">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="./hero.png"
              loading='lazy'
            />
          </div>
        </div>
      </section>
      <section className="lg:px-14 px-5">
        <div className="container px-5 rounded-md my-12 mx-auto bg-white text-black">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2 border-r-2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl ">2.7K</h2>
              <p className="leading-relaxed">Users</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2 border-r-2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl ">1.8K</h2>
              <p className="leading-relaxed">Subscribes</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2 border-r-2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl ">35</h2>
              <p className="leading-relaxed">Downloads</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl ">4</h2>
              <p className="leading-relaxed">Products</p>
            </div>
          </div>
        </div>
      </section>
     <Services/>
     <Contact/>

    </>

  )
}

export default Home
