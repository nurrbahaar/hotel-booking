import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'

const Reservations = () => {
    const { currency, user, getToken, axios } = useAppContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending'); // pending, confirmed, cancelled

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/bookings/hotel', { 
                headers: { Authorization: `Bearer ${await getToken()}` } 
            });
            if (data.success) {
                setBookings(data.DashboardData.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
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
                fetchBookings(); // Refresh data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'pending') return booking.status === 'pending';
        if (activeTab === 'confirmed') return booking.status === 'confirmed';
        if (activeTab === 'cancelled') return booking.status === 'cancelled';
        return true;
    });

    return (
        <div className='w-full p-4'>
            <Title align='left' font='outfit' title='Rezervasyonlar' subTitle='Rezervasyon Yonetimi' />

            {/* Tabs */}
            <div className='flex gap-4 border-b border-gray-200 mb-6 mt-4'>
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Bekleyenler ({bookings.filter(b => b.status === 'pending').length})
                </button>
                <button 
                    onClick={() => setActiveTab('confirmed')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'confirmed' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Onaylananlar ({bookings.filter(b => b.status === 'confirmed').length})
                </button>
                <button 
                    onClick={() => setActiveTab('cancelled')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'cancelled' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Iptal Edilenler ({bookings.filter(b => b.status === 'cancelled').length})
                </button>
            </div>

            {/* Table */}
            <div className='w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm'>
                <table className='w-full min-w-[800px]'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Misafir</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Oda</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tarihler</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tutar</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Durum</th>
                            <th className='py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Islemler</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-4">Yukleniyor...</td></tr>
                        ) : filteredBookings.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-4 text-gray-500">Bu kategoride rezervasyon bulunamadi.</td></tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id} className='hover:bg-gray-50'>
                                    <td className='py-4 px-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3'>
                                                {booking.user?.username?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <div className='text-sm font-medium text-gray-900'>{booking.user?.username || 'Unknown'}</div>
                                                <div className='text-sm text-gray-500'>{booking.user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-4 px-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>{booking.room?.roomType}</div>
                                        <div className='text-xs text-gray-500'>{booking.guests} Misafir</div>
                                    </td>
                                    <td className='py-4 px-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>
                                            {new Date(booking.checkInDate).toLocaleDateString('tr-TR')}
                                        </div>
                                        <div className='text-xs text-gray-500'>
                                            to {new Date(booking.checkOutDate).toLocaleDateString('tr-TR')}
                                        </div>
                                    </td>
                                    <td className='py-4 px-4 whitespace-nowrap'>
                                        <div className='text-sm font-medium text-gray-900'>{booking.totalPrice} {currency}</div>
                                        <div className={`text-xs ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                                            {booking.paymentStatus === 'paid' ? 'Odendi' : 'Beklemede'}
                                        </div>
                                    </td>
                                    <td className='py-4 px-4 whitespace-nowrap'>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {booking.status === 'confirmed' ? 'Onaylandi' : 
                                             booking.status === 'cancelled' ? 'Iptal' : 'Beklemede'}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4 whitespace-nowrap text-center text-sm font-medium'>
                                        {booking.status === 'pending' && (
                                            <div className='flex justify-center gap-2'>
                                                <button 
                                                    onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                                    className='text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors'
                                                >
                                                    Onayla
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                                    className='text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors'
                                                >
                                                    Reddet
                                                </button>
                                            </div>
                                        )}
                                        {booking.status !== 'pending' && (
                                            <span className='text-gray-400 text-xs'>Islem yapildi</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Reservations