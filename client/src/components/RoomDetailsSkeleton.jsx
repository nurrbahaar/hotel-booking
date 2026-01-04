import React from 'react'

const RoomDetailsSkeleton = () => {
  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 animate-pulse'>
      {/* Title Skeleton */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2 mb-4'>
        <div className='h-10 bg-gray-200 rounded w-3/4 md:w-1/2'></div>
        <div className='h-6 bg-gray-200 rounded w-20'></div>
      </div>

      {/* Rating Skeleton */}
      <div className='flex items-center gap-4 mb-6'>
        <div className='h-4 bg-gray-200 rounded w-32'></div>
        <div className='h-4 bg-gray-200 rounded w-48'></div>
      </div>

      {/* Images Skeleton */}
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='w-full md:w-2/3 h-[400px] bg-gray-200 rounded-xl'></div>
        <div className='w-full md:w-1/3 flex flex-row md:flex-col gap-4'>
            <div className='w-full h-[125px] bg-gray-200 rounded-xl'></div>
            <div className='w-full h-[125px] bg-gray-200 rounded-xl'></div>
            <div className='w-full h-[125px] bg-gray-200 rounded-xl'></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Column */}
        <div className='w-full lg:w-2/3'>
            <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-6'></div>

            <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className='h-10 bg-gray-200 rounded'></div>
                ))}
            </div>
        </div>

        {/* Right Column (Booking Form) */}
        <div className='w-full lg:w-1/3'>
            <div className='h-[400px] bg-gray-200 rounded-xl'></div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailsSkeleton
