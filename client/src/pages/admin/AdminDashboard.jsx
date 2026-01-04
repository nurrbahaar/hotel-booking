import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const AdminDashboard = () => {
    const { axios, getToken } = useAppContext()
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalHotels: 0,
        totalBookings: 0,
        pendingHotels: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await getToken()
                const { data } = await axios.get('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (data.success) {
                    setStats(data.stats)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error("Failed to fetch stats")
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Total Users</h2>
            <p className='text-3xl font-bold text-gray-700'>{loading ? '...' : stats.totalUsers}</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Total Hotels</h2>
            <p className='text-3xl font-bold text-gray-700'>{loading ? '...' : stats.totalHotels}</p>
            <p className='text-sm text-gray-500 mt-1'>{loading ? '...' : stats.pendingHotels} Pending</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Total Bookings</h2>
            <p className='text-3xl font-bold text-gray-700'>{loading ? '...' : stats.totalBookings}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
