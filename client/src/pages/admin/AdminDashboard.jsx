
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../conext/AppContext';
import { toast } from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { axios, getToken } = useAppContext();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalHotels: 0,
        totalBookings: 0,
        pendingHotels: 0,
        userTypeCounts: { hotelOwners: 0, siteUsers: 0 },
        recentUsers: [],
        recentHotels: [],
        pendingHotelsList: [],
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await getToken();
                const { data } = await axios.get('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (data.success) {
                    setStats(data.stats);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Ýstatistikler alýnamadý');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                    <h2 className='text-xl font-semibold mb-2'>Toplam Kullanýcý</h2>
                    <p className='text-3xl font-bold text-gray-700'>{loading ? '...' : stats.totalUsers}</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                    <h2 className='text-xl font-semibold mb-2'>Toplam Otel</h2>
                    <p className='text-3xl font-bold text-gray-700'>{loading ? '...' : stats.totalHotels}</p>
                    <p className='text-sm text-gray-500 mt-1'>{loading ? '...' : stats.pendingHotels} Beklemede</p>
                </div>
            </div>

            {/* Kullanýcý/Otel Artýþ Grafiði */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Aylýk Kullanýcý ve Otel Artýþý</h2>
                {loading ? (
                    <p>Loading charts...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} name="Kullanýcýlar" />
                            <Line type="monotone" dataKey="hotels" stroke="#f59e42" strokeWidth={3} name="Oteller" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Son Eklenen Kullanýcýlar ve Oteller */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
                    <h3 className="text-lg font-bold mb-4">Son Eklenen Kullanýcýlar</h3>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="py-2 px-2 text-left">Ad</th>
                                <th className="py-2 px-2 text-left">Email</th>
                                <th className="py-2 px-2 text-left">Kayýt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentUsers && stats.recentUsers.map((user) => (
                                <tr key={user._id} className="border-b last:border-b-0">
                                    <td className="py-2 px-2">{user.username}</td>
                                    <td className="py-2 px-2">{user.email}</td>
                                    <td className="py-2 px-2">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
                    <h3 className="text-lg font-bold mb-4">Son Eklenen Oteller</h3>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="py-2 px-2 text-left">Otel Adý</th>
                                <th className="py-2 px-2 text-left">Þehir</th>
                                <th className="py-2 px-2 text-left">Kayýt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentHotels && stats.recentHotels.map((hotel) => (
                                <tr key={hotel._id} className="border-b last:border-b-0">
                                    <td className="py-2 px-2">{hotel.name}</td>
                                    <td className="py-2 px-2">{hotel.address?.city || '-'}</td>
                                    <td className="py-2 px-2">{new Date(hotel.createdAt).toLocaleDateString('tr-TR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Onay Bekleyen Oteller */}
            <div className="mt-10 bg-white rounded-lg shadow border border-yellow-200 p-6">
                <h3 className="text-lg font-bold mb-4 text-yellow-700">Onay Bekleyen Oteller</h3>
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="py-2 px-2 text-left">Otel Adý</th>
                            <th className="py-2 px-2 text-left">Sahibi</th>
                            <th className="py-2 px-2 text-left">Þehir</th>
                            <th className="py-2 px-2 text-left">Kayýt Tarihi</th>
                            <th className="py-2 px-2 text-left">Ýþlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.pendingHotelsList && stats.pendingHotelsList.length > 0 ? (
                            stats.pendingHotelsList.map((hotel) => (
                                <tr key={hotel._id} className="border-b last:border-b-0">
                                    <td className="py-2 px-2">{hotel.name}</td>
                                    <td className="py-2 px-2">{hotel.owner?.username || hotel.owner?.email || '-'}</td>
                                    <td className="py-2 px-2">{hotel.address?.city || '-'}</td>
                                    <td className="py-2 px-2">{new Date(hotel.createdAt).toLocaleDateString('tr-TR')}</td>
                                    <td className="py-2 px-2 flex gap-2">
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token = await getToken();
                                                    const { data } = await axios.post('/api/hotels/approve', { hotelId: hotel._id }, { headers: { Authorization: `Bearer ${token}` } });
                                                    if (data.success) {
                                                        toast.success('Otel onaylandý');
                                                        window.location.reload();
                                                    } else {
                                                        toast.error(data.message);
                                                    }
                                                } catch (err) {
                                                    toast.error('Onaylanamadý');
                                                }
                                            }}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                                        >Onayla</button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token = await getToken();
                                                    const { data } = await axios.post('/api/hotels/reject', { hotelId: hotel._id }, { headers: { Authorization: `Bearer ${token}` } });
                                                    if (data.success) {
                                                        toast.success('Otel reddedildi');
                                                        window.location.reload();
                                                    } else {
                                                        toast.error(data.message);
                                                    }
                                                } catch (err) {
                                                    toast.error('Reddedilemedi');
                                                }
                                            }}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                        >Reddet</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-400">Bekleyen otel yok</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
