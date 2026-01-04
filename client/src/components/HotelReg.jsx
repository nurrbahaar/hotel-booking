import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../conext/AppContext'
import toast from 'react-hot-toast';


const HotelReg = () => {
    const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            console.log("Submitting form data:", { name, address, contact, city });

            const token = await getToken();
            console.log("Token:", token);

            const { data } = await axios.post('/api/hotels', {
                name,
                address,
                contact,
                city
            }, { headers: { Authorization: `Bearer ${token}` } })

            console.log("Response data:", data);

            if (data?.success) {
                toast.success(data.message)
                setIsOwner(true)
                setShowHotelReg(false);
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div onClick={() => setShowHotelReg(false)} className='fixed inset-0 flex justify-center items-center min-h-screen bg-black/50 px-4 z-[1000]'>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2 relative'>
                <img src={assets.regImage} alt="reg-img" className='w-1/2 rounded-xl hidden md:block' />

                <div className='w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg'>
                    <button
                        type='button'
                        onClick={() => setShowHotelReg(false)}
                        className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full'
                    >
                        <img src={assets.closeIcon} alt="close-icon" className='w-6 h-6 cursor-pointer' />
                    </button>
                    <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

                    <div className='mt-4'>
                        <label htmlFor="name" className='block mt-6 font-medium text-gray-700'>
                            Hotel name
                        </label>
                        <input id='name' onChange={(e) => setName(e.target.value)} value={name}
                            type="text"
                            placeholder="Type here" className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="contact" className='block mt-6 font-medium text-gray-700'>
                            Phone
                        </label>
                        <input onChange={(e) => setContact(e.target.value)} value={contact} id='contact'
                            type="text"
                            placeholder="Type here" className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="address" className='block mt-6 font-medium text-gray-700'>
                            Address
                        </label>
                        <input onChange={(e) => setAddress(e.target.value)} value={address} id='address'
                            type="text"
                            placeholder="Type here" className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="city" className='block mt-6 font-medium text-gray-700'>
                            City
                        </label>
                        <select onChange={(e) => setCity(e.target.value)} value={city} id='city' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                        Register
                    </button>
                </div>

            </form>
        </div>
    )
}

export default HotelReg
