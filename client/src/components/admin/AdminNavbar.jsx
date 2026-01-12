import React from 'react'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../conext/AppContext'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const { user, setIsAdmin, setUserDataLoaded } = useAppContext()

  const logout = () => {
    localStorage.removeItem('adminToken')
    setIsAdmin(false)
    setUserDataLoaded(false)
    navigate('/admin/login')
    window.location.reload()
  }

  return (
    <div className='flex justify-between items-center p-4 md:px-10 border-b border-gray-300'>
      <div onClick={() => navigate('/')} className='cursor-pointer font-bold text-2xl text-red-500'>
        Super Admin
      </div>
      <div className='flex items-center gap-4'>
        {user ? <UserButton /> : (
          <button onClick={logout} className='bg-gray-800 text-white px-4 py-2 rounded-md text-sm'>
            Çýkýþ Yap
          </button>
        )}
      </div>
    </div>
  )
}

export default AdminNavbar
