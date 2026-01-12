import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r border-gray-300 hidden md:block'>
        <div className='flex flex-col gap-4 pt-10 pl-[20%]'>
            <NavLink to='/admin' end className={({isActive})=> `flex items-center gap-3 px-3 py-2 rounded-l-full cursor-pointer ${isActive ? 'bg-red-100 border-r-4 border-red-500' : ''}`}>
                <img src={assets.homeIcon} alt="" className='w-5 h-5' />
                <p className='hidden lg:block'>Dashboard</p>
            </NavLink>
            <NavLink to='/admin/pending-hotels' className={({isActive})=> `flex items-center gap-3 px-3 py-2 rounded-l-full cursor-pointer ${isActive ? 'bg-red-100 border-r-4 border-red-500' : ''}`}>
                <img src={assets.userIcon} alt="" className='w-5 h-5' />
                <p className='hidden lg:block'>Hotel Approval</p>
            </NavLink>
            <NavLink to='/admin/all-hotels' className={({isActive})=> `flex items-center gap-3 px-3 py-2 rounded-l-full cursor-pointer ${isActive ? 'bg-red-100 border-r-4 border-red-500' : ''}`}>
                <img src={assets.homeIcon} alt="" className='w-5 h-5' />
                <p className='hidden lg:block'>All Hotels</p>
            </NavLink>
            <NavLink to='/admin/users' className={({isActive})=> `flex items-center gap-3 px-3 py-2 rounded-l-full cursor-pointer ${isActive ? 'bg-red-100 border-r-4 border-red-500' : ''}`}>
                <img src={assets.userIcon} alt="" className='w-5 h-5' />
                <p className='hidden lg:block'>Users</p>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar
