import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../conext/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

const ListRoom = () => {

    const [rooms, setRooms] = useState([])
    const { axios, getToken, user, currency } = useAppContext()

    //fetch rooms of the hotel owner
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setRooms(data.rooms)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleAvalilability = async (roomId) => {
        const { data } = await axios.post('/api/rooms/toggle-isAvailable', { roomId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
        if (data.success) {
            toast.success(data.message)
            fetchRooms()
        } else {
            toast.error(data.message)
        }
    }
    useEffect(() => {
        if (user || localStorage.getItem('ownerToken')) {
            fetchRooms()
        }
    }, [user])
    
    // Helper to safely display array or string
    const displayList = (item) => {
        let text = '';
        if (Array.isArray(item)) text = item.join(', ');
        else text = item || '';
        
        // Fix encoding issues or fallback texts
        return text.replace('?cretsiz', '\u00DCcretsiz')
                   .replace('Ucretsiz', '\u00DCcretsiz')
                   .replace('Yuzme', 'Y\u00FCzme')
                   .replace('Kahvalti', 'Kahvalt\u0131')
                   .replace('Havaalani', 'Havaalan\u0131');
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
             <div className="mb-8 border-b pb-4 flex justify-between items-end">
                <Title align='left' font='outfit' title='Odalari Listele' subTitle='Otelinizin mevcut odalarini yonetin' />
                <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">{rooms.length} Oda Bulundu</span>
            </div>

            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-sm'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Gorsel</th>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Oda Tipi</th>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell'>Olanaklar</th>
                                <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Fiyat / Gece</th>
                                <th className='py-4 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Durum</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {rooms.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-500">
                                        Henuz hic oda eklemediniz. "Oda Ekle" sayfasindan yeni oda olusturabilirsiniz.
                                    </td>
                                </tr>
                            ) : (
                                rooms.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className='py-4 px-6 whitespace-nowrap'>
                                            <img
                                                src={Array.isArray(item.images) && item.images[0] ? item.images[0] : assets.uploadArea}
                                                alt="Room"
                                                onError={(e) => { e.target.onerror = null; e.target.src = assets.uploadArea; }}
                                                className="h-12 w-16 object-cover rounded-md border border-gray-200 shadow-sm"
                                            />
                                        </td>
                                        <td className='py-4 px-6 text-sm font-medium text-gray-900'>
                                            {displayList(item.roomType)}
                                        </td>
                                        <td className='py-4 px-6 text-sm text-gray-500 hidden md:table-cell max-w-xs truncate' title={displayList(item.amenities)}>
                                            {displayList(item.amenities)}
                                        </td>
                                        <td className='py-4 px-6 text-sm text-gray-900 font-semibold'>
                                            {item.pricePerNight} {currency}
                                        </td>
                                        <td className='py-4 px-6 text-center whitespace-nowrap'>
                                            <div className="flex flex-col items-center gap-1">
                                                <label className='relative inline-flex items-center cursor-pointer'>
                                                    <input
                                                        onChange={() => toggleAvalilability(item._id)}
                                                        type='checkbox'
                                                        className='sr-only peer'
                                                        checked={item.isAvailable}
                                                    />
                                                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600`}></div>
                                                </label>
                                                <span className={`text-xs font-medium ${item.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {item.isAvailable ? 'Musait' : 'Kapali'}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListRoom
