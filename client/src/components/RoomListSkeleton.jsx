import React from 'react'

const RoomListSkeleton = () => {
  return (
    <div className='my-8 flex flex-col md:flex-row items-center gap-6 border-b border-gray-100 pb-8 animate-pulse'>
        {/* Image Placeholder */}
        <div className='h-64 w-full md:w-1/2 bg-gray-300 rounded-xl'></div>

        <div className='w-full md:w-1/2 flex flex-col gap-4'>
            {/* City Placeholder */}
            <div className='h-4 bg-gray-200 rounded w-1/4'></div>
            
            {/* Hotel Name Placeholder */}
            <div className='h-8 bg-gray-300 rounded w-3/4'></div>

            {/* Rating Placeholder */}
            <div className='h-4 bg-gray-200 rounded w-1/3'></div>

            {/* Address Placeholder */}
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>

            {/* Amenities Placeholder */}
            <div className='flex gap-2 mt-2'>
                <div className='h-8 w-20 bg-gray-100 rounded'></div>
                <div className='h-8 w-20 bg-gray-100 rounded'></div>
                <div className='h-8 w-20 bg-gray-100 rounded'></div>
            </div>

            {/* Price and Button Placeholder */}
            <div className='flex items-center justify-between mt-4'>
                <div className='h-6 bg-gray-300 rounded w-1/4'></div>
                <div className='h-10 bg-gray-800 rounded-full w-32 opacity-20'></div>
            </div>
        </div>
    </div>
  )
}

export default RoomListSkeleton
