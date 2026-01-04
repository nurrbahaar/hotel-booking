import React from 'react'

const MyBookingsSkeleton = () => {
  return (
    <div className='py-28 md:py-32 px-4 md:px-24 xl:px-32 animate-pulse'>
      {/* Title Skeleton */}
      <div className='mb-8'>
        <div className='h-8 bg-gray-200 rounded w-48 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-64'></div>
      </div>

      <div className='mt-8'>
        {/* Header Skeleton */}
        <div className='hidden md:flex border-b-2 border-gray-300 pb-4'>
          <div className='w-1/3 h-6 bg-gray-200 rounded'></div>
          <div className='w-1/3 h-6 bg-gray-200 rounded mx-4'></div>
          <div className='w-1/3 h-6 bg-gray-200 rounded'></div>
        </div>

        {/* List Skeleton */}
        <div className='space-y-4 mt-4'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border-b border-gray-200 py-4'>
              {/* Hotel Info */}
              <div className='w-full md:w-1/3 flex items-center gap-4'>
                <div className='w-24 h-16 bg-gray-200 rounded'></div>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='h-5 bg-gray-200 rounded w-3/4'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
              </div>

              {/* Date Info */}
              <div className='w-full md:w-1/3 flex flex-col gap-2'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>

              {/* Payment Info */}
              <div className='w-full md:w-1/3 flex flex-col gap-2'>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookingsSkeleton
