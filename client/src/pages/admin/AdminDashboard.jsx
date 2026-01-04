import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Total Users</h2>
            <p className='text-3xl font-bold text-gray-700'>Loading...</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Pending Hotels</h2>
            <p className='text-3xl font-bold text-gray-700'>Loading...</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
            <h2 className='text-xl font-semibold mb-2'>Total Bookings</h2>
            <p className='text-3xl font-bold text-gray-700'>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
