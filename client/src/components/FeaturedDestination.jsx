import React from 'react'

import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../conext/AppContext';



const FeaturedDestination = () => {
    const { rooms, navigate } = useAppContext();


    return rooms.length > 0 && (
        <div className='flex flex-col  items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Title subtitle={'Sizin i\u00E7in se\u00E7ti\u011Fimiz en \u00F6zel oteller'} Title={'GELECE\u011EIN OTELLER\u0130'} />
            <div className='flex flex-wrap  items-center justify-center gap-6 mt-20'>
                {rooms.filter(r => r.hotel).slice(0, 4).map((room, index) => (<HotelCard key={room._id} room={room} index={index} />))}</div>
            <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
                className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded  bg-white hover:bg-gray-50 transition-all cursor-pointer'>
                View all destinations

            </button>
        </div>
    )
}

export default FeaturedDestination
