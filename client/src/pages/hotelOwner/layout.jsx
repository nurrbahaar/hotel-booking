import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const Layout = () => {
    const { isOwner, isAdmin, navigate, userDataLoaded, user, setShowHotelReg } = useAppContext()

    useEffect(() => {
        // Redirect if not owner
        if (userDataLoaded) {
            if (!user) {
                // Not logged in
                navigate('/');
                toast.error("Please sign in to access the Owner Panel");
            } else if (!isOwner && !isAdmin) {
                // Logged in but not owner AND not admin
                navigate('/');
                setShowHotelReg(true); // Open registration modal
                toast.error("You must register a hotel to access the Owner Panel");
            }
        }
    }, [isOwner, isAdmin, userDataLoaded, user])

    if (!userDataLoaded) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    // Double check to prevent flash of content
    if (!isOwner && !isAdmin) return null;

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex h-full'>
                <Sidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full' >
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Layout
