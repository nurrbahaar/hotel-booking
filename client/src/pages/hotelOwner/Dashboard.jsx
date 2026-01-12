import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import DashboardChart from '../../components/DashboardChart'

const Dashboard = () => {
    const { currency, user, getToken, axios, navigate } = useAppContext();


    const [dashboarData, setDashboardData] = useState({
        bookings: [],
        totalBooking: 0,
        totalRevenue: 0,
        chartData: []
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
        if (user || localStorage.getItem('ownerToken')) {
            fetchDashboardData();
        }

    }, [user]);

    const pendingCount = dashboarData.bookings ? dashboarData.bookings.filter(b => b.status === "pending").length : 0;

    return (
        <div className="pb-10 font-outfit">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Panel</h1>
                    <p className="text-gray-500 mt-1">Otelinizin genel durumunu buradan takip edebilirsiniz.</p>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                {/* Total Bookings Card */}
                <div className='bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg transition-all duration-300 group'>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className='text-gray-500 text-sm font-medium'>Toplam Rezervasyon</p>
                            <h3 className='text-3xl font-bold text-gray-800 mt-2 group-hover:text-blue-600 transition-colors'>{dashboarData.totalBooking}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <img src={assets.totalBookingIcon} alt="" className='w-6 h-6 opacity-80' />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded">
                        <span className="mr-1">?</span>
                            <span>Bu ay art{'\u0131'}ta</span>
                    </div>
                </div>

                {/* Total Revenue Card */}
                <div className='bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg transition-all duration-300 group'>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className='text-gray-500 text-sm font-medium'>Toplam Gelir</p>
                            <h3 className='text-3xl font-bold text-gray-800 mt-2 group-hover:text-amber-500 transition-colors'>{dashboarData.totalRevenue} TL</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                            <img src={assets.totalRevenueIcon} alt="" className='w-6 h-6 opacity-80' />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded">
                        <span className="mr-1">?</span>
                            <span>Hedefe ula{'\u015F'}ld{'\u0131'}</span>
                    </div>
                </div>
               
               {/* Quick Action Card (New) */}
               <div onClick={() => navigate('/owner/reservations')} className='bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]'>
                   <div className="flex justify-between items-start">
                       <div>
                           <p className='text-indigo-100 text-sm font-medium'>Aktif {'\u0130'}{'\u015F'}lemler</p>
                           <h3 className='text-xl font-bold mt-2'>Yeni Rezervasyonlar</h3>
                           <p className='text-indigo-100 text-sm mt-1 mb-4 opacity-80'>
                               {pendingCount > 0 ? `Bekleyen ${pendingCount} rezervasyon var` : 'Bekleyen rezervasyon yok'}
                           </p>
                           <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all group-hover:bg-white/30">
                               Detaylar{'\u0131'} G{'\u00F6'}r
                           </button>
                       </div>
                   </div>
               </div>
            </div>

            {/* Charts Section */}
            <div className="mb-10 animate-fade-in-up">
                <DashboardChart data={dashboarData.chartData} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className='text-lg font-bold text-gray-800'>Son Rezervasyonlar</h2>
                </div>
                
                <div className='w-full overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50/50'>
                            <tr>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Kullanýcý</th>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden'>Oda Tipi</th>
                                <th className='py-4 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Tutar</th>
                                <th className='py-4 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Durum</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {dashboarData.bookings.length > 0 ? dashboarData.bookings.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className='py-4 px-6 whitespace-nowrap'>
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs mr-3">
                                                {item.user?.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{item.user?.username}</div>
                                                <div className="text-xs text-gray-500">{item.user?.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-4 px-6 whitespace-nowrap text-sm text-gray-600 max-sm:hidden'>
                                        {item.room?.roomType}
                                    </td>

                                    <td className='py-4 px-6 whitespace-nowrap text-center font-medium text-gray-900'>
                                        {item.totalPrice} TL
                                    </td>
                                    
                                    <td className='py-4 px-6 whitespace-nowrap text-center'>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            item.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                            item.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                item.status === 'confirmed' ? 'bg-green-600' : 
                                                item.status === 'cancelled' ? 'bg-red-600' : 
                                                'bg-yellow-600'
                                            }`}></span>
                                            {item.status === 'confirmed' ? 'Onaylandý' : 
                                             item.status === 'cancelled' ? 'Ýptal' : 'Beklemede'}
                                        </span>
                                    </td>
                                    
                                    {/* Removed 'Ýþlem' column and cell */}
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                        Henüz rezervasyon bulunmuyor.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
