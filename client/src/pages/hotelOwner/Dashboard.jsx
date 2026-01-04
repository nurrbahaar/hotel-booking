import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
    const { currency, user, getToken, axios } = useAppContext();


    const [dashboarData, setDashboardData] = useState({
        bookings: [],
        totalBooking: 0,
        totalRevenue: 0,
    })

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setDashboardData(data.DashboardData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {

            toast.error(error.message)
        }
    }

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            const { data } = await axios.post('/api/bookings/update-status', 
                { bookingId, status },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );
            if (data.success) {
                toast.success(data.message);
                fetchDashboardData(); // Refresh data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }

    }, [user]);

    return (
        <div>
            <Title align='left' font='outfit' title='Dashboard' subTitle='Otel Yonetim Paneli' />
            <div className='flex gap-4 my-8'>
                <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                    <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />

                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-500 text-lg' >Toplam Rezervasyon</p>
                        <p className='text-neutral-400 text-base' >{dashboarData.totalBooking}</p>
                    </div>
                </div>
                <div>
                    <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                        <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />

                        <div className='flex flex-col sm:ml-4 font-medium'>
                            <p className='text-blue-500 text-lg' >Toplam Gelir</p>
                            <p className='text-neutral-400 text-base' >{dashboarData.totalRevenue} TL</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Son Rezervasyonlar</h2>
                <div className='w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-96 overflow-y-scroll'>
                    <table className='w-full'>
                        <thead className='bg-gray-100 sticky top-0'>
                            <tr>
                                <th className='py-3 px-4 text-gray-800 font-medium'>Kullanici Adi</th>
                                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Oda Tipi</th>
                                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Toplam Tutar</th>
                                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Durum</th>
                                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Islem</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm' >
                            {dashboarData.bookings.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                        {item.user.username}
                                    </td>

                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                        {item.room.roomType}
                                    </td>

                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                        {item.totalPrice} TL
                                    </td>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                        <span className={`py-1 px-3 text-xs rounded-full mx-auto ${
                                            item.status === 'confirmed' ? 'bg-green-200 text-green-600' : 
                                            item.status === 'cancelled' ? 'bg-red-200 text-red-600' : 
                                            'bg-amber-200 text-yellow-600'
                                        }`}>
                                            {item.status === 'confirmed' ? 'Onaylandi' : 
                                             item.status === 'cancelled' ? 'Iptal' : 'Beklemede'}
                                        </span>
                                    </td>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                        {item.status === 'pending' && (
                                            <div className='flex gap-2 justify-center'>
                                                <button 
                                                    onClick={() => handleStatusUpdate(item._id, 'confirmed')}
                                                    className='bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600'
                                                >
                                                    Onayla
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(item._id, 'cancelled')}
                                                    className='bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600'
                                                >
                                                    Reddet
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

        </div>
    )
}

export default Dashboard
