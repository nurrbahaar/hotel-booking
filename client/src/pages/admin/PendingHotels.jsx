import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const PendingHotels = () => {
    const { axios, getToken } = useAppContext()
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPendingHotels = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/hotels/pending', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                setHotels(data.hotels)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const approveHotel = async (hotelId) => {
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/hotels/approve', { hotelId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                toast.success(data.message)
                fetchPendingHotels()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const rejectHotel = async (hotelId) => {
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/hotels/reject', { hotelId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                toast.success(data.message)
                fetchPendingHotels()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPendingHotels()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Hotel Approvals</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='bg-gray-100 border-b'>
                            <th className='py-2 px-4 text-left'>Name</th>
                            <th className='py-2 px-4 text-left'>Owner</th>
                            <th className='py-2 px-4 text-left'>Location</th>
                            <th className='py-2 px-4 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel._id} className='border-b hover:bg-gray-50'>
                                <td className='py-2 px-4'>{hotel.name}</td>
                                <td className='py-2 px-4'>{hotel.owner?.name || hotel.owner?.email || 'Unknown'}</td>
                                <td className='py-2 px-4'>{hotel.address?.city}, {hotel.address?.country}</td>
                                <td className='py-2 px-4 flex gap-2'>
                                    <button 
                                        onClick={() => approveHotel(hotel._id)}
                                        className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => rejectHotel(hotel._id)}
                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {hotels.length === 0 && (
                            <tr>
                                <td colSpan='4' className='py-4 text-center text-gray-500'>No pending hotels found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingHotels
