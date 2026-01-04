import React from 'react'

const HotelCardSkeleton = () => {
  return (
    <div className='border border-gray-200 rounded-lg shadow-md overflow-hidden w-[300px] animate-pulse bg-white'>
      {/* Image Placeholder */}
      <div className='h-48 bg-gray-300 w-full'></div>
      
      <div className='p-4 flex flex-col gap-3'>
        {/* Title Placeholder */}
        <div className='h-6 bg-gray-300 rounded w-3/4'></div>
        
        {/* Location Placeholder */}
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        
        {/* Rating Placeholder */}
        <div className='flex gap-1'>
            <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
        </div>

        {/* Price Placeholder */}
        <div className='mt-2 flex justify-between items-center'>
            <div className='h-6 bg-gray-300 rounded w-1/3'></div>
            <div className='h-8 bg-gray-300 rounded w-1/4'></div>
        </div>
      </div>
    </div>
  )
}

export default HotelCardSkeleton
