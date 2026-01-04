import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'


const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all dration-300' >
            <Link to='/' >
                <span className='text-3xl font-black tracking-tight text-black'>
                    ROOMY
                </span>
            </Link>
            <UserButton />
        </div>
    )
}

export default Navbar
