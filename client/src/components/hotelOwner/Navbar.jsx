import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { useAppContext } from '../../conext/AppContext'


const Navbar = () => {
    const { user, setIsOwner, setUserDataLoaded } = useAppContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('ownerToken')
        setIsOwner(false)
        setUserDataLoaded(false)
        navigate('/owner/login')
        window.location.reload()
    }

    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all dration-300' >
            <Link to='/' >
                <span className='text-3xl font-black tracking-tight text-black'>
                    ROOMY
                </span>
            </Link>
            {user ? <UserButton /> : (
                <button onClick={logout} className='bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors'>
                    Çýkýþ Yap
                </button>
            )}
        </div>
    )
}

export default Navbar
