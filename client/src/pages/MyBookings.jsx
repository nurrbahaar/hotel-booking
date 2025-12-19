import React, { useEffect, useState } from 'react'
import Title from '../components/Title.jsx'
import { userBookingsDummyData, assets } from '../assets/assets'
import { useAppContext } from '../conext/AppContext.jsx';
import toast from 'react-hot-toast';

const MyBookings = () => {

  const {axios, getToken, user} = useAppContext();
  const [bookings, setBookings] = useState( [])

  const fetchBookings = async () => {
    try {
      const {data} = await axios.get('/api/bookings/user', {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data?.success){
        setBookings(data.bookings);
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }}

    useEffect(() => {
      if(user){
        fetchUserBookings();
      } }, [user])

  return (
    <div className='py-28 md:py-32 px-4 md:px-24 xl:px-32'>
      <Title title='My Bookings' subtitle='Your recent reservations' align='left' />

      <div className='mt-8'>
        <div className='hidden md:flex border-b-2 border-gray-300 pb-4 font-semibold text-gray-700'>
          <div className='w-1/3'>Hotels</div>
          <div className='w-1/3'>Date & Timings</div>
          <div className='w-1/3'>Payment</div>
        </div>

        <div className='space-y-4 mt-4'>
          {bookings.length === 0 && (
            <div className='text-gray-500'>No bookings found.</div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border-b border-gray-200 py-4'
            >
              {/* Hotels column */}
              <div className='md:w-1/3 flex items-start gap-4 w-full'>
                <img
                  src={booking.room?.images?.[0] ?? assets.placeholderImage}
                  alt='hotel-img'
                  className='w-24 h-16 object-cover rounded-md flex-shrink-0'
                />
                <div>
                  <p className='font-playfair text-lg md:text-xl'>
                    {booking.hotel?.name ?? '—'}
                    <span className='font-inter text-sm text-gray-600 ml-2'>
                      ({booking.room?.roomType ?? '—'})
                    </span>
                  </p>
                  <div className='flex items-center mt-1 text-gray-500 gap-2 text-sm'>
                    <img src={assets.locationIcon} alt='location-icon' className='w-4 h-4' />
                    <span>{booking.hotel?.address ?? '—'}</span>
                  </div>
                </div>
              </div>

              {/* Date & Timings */}
              <div className='md:w-1/3 w-full'>
                <p className='font-medium'>{booking.date ?? booking.startDate ?? '—'}</p>
                <p className='text-sm text-gray-500 mt-1'>
                  {booking.time ?? `${booking.checkIn ?? '—'} - ${booking.checkOut ?? '—'}`}
                </p>
              </div>

              {/* Payment */}
              <div className='md:w-1/3 w-full flex flex-col items-start md:items-end'>
                <p className='font-medium'>
                  {booking.totalPrice ? `${booking.totalPrice} ${booking.currency ?? ''}` : '—'}
                </p>
                <p className={`text-sm mt-1 ${booking.payment?.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                  {booking.payment?.status ? booking.payment.status : 'Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookings
