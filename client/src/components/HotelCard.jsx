import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
    
    const address = room.hotel?.address;
    const addressText = address?.city || address?.line || (typeof address === 'string' ? address : '') || '';
    const displayAddress = addressText.replace(/^\?stanbul/i, 'Ýstanbul').replace(/^stanbul/i, 'Ýstanbul');

    return (
        <Link to={'/rooms/' + room._id} onClick={() => window.scrollTo(0, 0)} key={room._id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0,05)] animate-fade-in-up opacity-0'>
            <img src={room.images[0]} alt="" className='h-48 w-full object-cover' />
            {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full' >
                Best Seller
            </p>}
            <div className='p-4 pt-5'>
                <div className='flex items-center justify-between'>
                    <p className='font-playfair text-xl font-medium text-gray-800 truncate'>{room.hotel?.name}</p>
                    <div className='flex items-center gap-1'>
                        <img src={assets.starIconFilled} alt="star-icon" className='w-3 h-3' /> 
                        <span className='text-sm'>4.5</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-2 text-sm'>
                    <img src={assets.locationIcon || assets.starIconFilled} alt="location-icon" className='w-4 h-4' />
                    <span className='truncate'>
                        {displayAddress}
                    </span>
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <p className='text-gray-800 font-medium'>
                        <span>{room.pricePerNight || room.basePrice} TL </span> <span className='text-gray-500 text-sm font-normal'>/ gece</span>
                    </p>

                    <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
                </div>
            </div>
        </Link>
    )
}
export default HotelCard

