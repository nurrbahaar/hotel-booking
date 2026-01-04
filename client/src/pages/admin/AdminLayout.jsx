import React, { useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../conext/AppContext'

const AdminLayout = () => {
    const { isAdmin, userDataLoaded } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (userDataLoaded && !isAdmin) {
            navigate('/')
        }
    }, [isAdmin, userDataLoaded, navigate])

    if (!userDataLoaded) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    if (!isAdmin) {
        return null; // Or a "Not Authorized" page
    }

    return (
        <div className='flex flex-col h-screen'>
            <AdminNavbar />
            <div className='flex h-full'>
                <AdminSidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full overflow-y-auto' >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
