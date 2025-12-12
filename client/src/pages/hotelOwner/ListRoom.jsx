import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {

    const [rooms, setRooms] = useState(roomsDummyData)

    return (
        <div>
            <Title align='left' font='outfit' title='Rooms' subTitle='Manage your rooms here' />
            <p className='text-gray-500 mt-8'>All Rooms</p>

            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
                <table className='w-full'>
                    <thead className='bg-gray-100 sticky top-0'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Price / Night</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {rooms.map((item, index) => (
                            <tr key={index}>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                    {/* Hata önleyici kontrol: Veri dizi ise join yap, değilse direkt yaz */}
                                    {Array.isArray(item.roomType) ? item.roomType.join(', ') : item.roomType}
                                </td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                    {Array.isArray(item.amenities) ? item.amenities.join(', ') : item.amenities}
                                </td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                    {item.pricePerNight}
                                </td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                    <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                        <input
                                            type='checkbox'
                                            className='sr-only peer'
                                            checked={item.isAvailable}
                                            readOnly
                                        />
                                        <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                                        <span className='dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5'></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom