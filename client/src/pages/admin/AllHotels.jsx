import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const AllHotels = () => {
    const { axios, getToken } = useAppContext()
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchHotels = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/hotels/all-admin', {
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

    useEffect(() => {
        fetchHotels()
    }, [])

    const [search, setSearch] = useState("");

    const handleDelete = async (hotelId) => {
        if (!window.confirm('Bu oteli silmek istediðinize emin misiniz?')) return;
        try {
            const token = await getToken();
            const { data } = await axios.delete(`/api/hotels/${hotelId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setHotels(hotels.filter(h => h._id !== hotelId));
                toast.success('Otel silindi');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Silme iþlemi baþarýsýz');
        }
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        (hotel.owner?.name && hotel.owner.name.toLowerCase().includes(search.toLowerCase())) ||
        (hotel.owner?.email && hotel.owner.email.toLowerCase().includes(search.toLowerCase())) ||
        (hotel.address?.city && hotel.address.city.toLowerCase().includes(search.toLowerCase()))
    );

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>All Hotels</h1>
            <input
                type="text"
                placeholder="Otel, sahip, þehir ara..."
                className="mb-4 px-3 py-2 border rounded w-full max-w-md"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='bg-gray-100 border-b'>
                            <th className='py-2 px-4 text-left'>Otel Adý</th>
                            <th className='py-2 px-4 text-left'>Sahibi</th>
                            <th className='py-2 px-4 text-left'>Þehir</th>
                            <th className='py-2 px-4 text-left'>Durum</th>
                            <th className='py-2 px-4 text-left'>Ýþlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHotels.map((hotel) => (
                            <tr key={hotel._id} className='border-b hover:bg-gray-50'>
                                <td className='py-2 px-4'>{hotel.name}</td>
                                <td className='py-2 px-4'>{hotel.owner?.name || hotel.owner?.email || 'Bilinmiyor'}</td>
                                <td className='py-2 px-4'>{hotel.address?.city}, {hotel.address?.country}</td>
                                <td className='py-2 px-4'>
                                    <span className={`px-2 py-1 rounded text-xs ${hotel.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {hotel.isApproved ? 'Onaylandý' : 'Beklemede'}
                                    </span>
                                </td>
                                <td className='py-2 px-4'>
                                    <button
                                        onClick={() => handleDelete(hotel._id)}
                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs'>Sil</button>
                                </td>
                            </tr>
                        ))}
                        {filteredHotels.length === 0 && (
                            <tr>
                                <td colSpan='5' className='py-4 text-center text-gray-500'>Otel bulunamadý</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllHotels
