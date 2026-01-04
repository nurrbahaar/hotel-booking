import React from 'react'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center p-4 md:px-10 border-b border-gray-300'>
      <div onClick={() => navigate('/')} className='cursor-pointer font-bold text-2xl text-red-500'>
        Super Admin
      </div>
      <div className='flex items-center gap-4'>
        <UserButton />
      </div>
    </div>
  )
}

export default AdminNavbar
