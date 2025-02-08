import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
       <span className='flex flex-col'>
       <img className='w-32' src={assets.logo} alt="" />
       <p className='text-gray-600 font-semibold text-sm'>Admin Panel</p>
       </span>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar