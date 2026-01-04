import React, { useState, useMemo } from 'react'

import { assets } from '../assets/assets'
import { useAppContext } from '../conext/AppContext'
import heroImage from '../assets/adanasuu.png'

const Hero = () => {

const {navigate, getToken, axios,setSearchedCities} = useAppContext()
const [destination, setDestination] = useState('')
const [checkIn, setCheckIn] = useState('')
const [checkOut, setCheckOut] = useState('')
const [guests, setGuests] = useState('')

const onSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);

    navigate(`/Odalar?${params.toString()}`)

    if (destination) {
        await axios.post('/api/user/store-recent-search', {recentSearchedCity: destination   }, {headers: {Authorization: `Bearer ${await getToken()}`}});

        setSearchedCities(prevSearchedCities => {
            const updatedSearchedcities = [ ...prevSearchedCities, destination];
            if( updatedSearchedcities.length > 3){
                updatedSearchedcities.shift();
            }
            return updatedSearchedcities;   
        })
    }
}

    return (
        <div
            className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen'
            style={{ backgroundImage: `url(${heroImage})` }}>
            
            <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-20'>Roomy en iyi otel deneyimi</h1>
            <p className='max-w-130 mt-2 text-sm md:text-base'>Bugun yolculugunuz basliyor! </p>


            <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4  mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

                <div className='flex flex-col justify-center'>
                    <input onChange={e=> setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                    <datalist id='destinations'>
                        {cities.map((city, index) => (
                            <option value={city} key={index} />
                        ))}
                    </datalist>
                </div>

                <div className='flex flex-col justify-center'>
                    <input onChange={e => setCheckIn(e.target.value)} value={checkIn} id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                </div>

                <div className='flex flex-col justify-center'>
                    <input onChange={e => setCheckOut(e.target.value)} value={checkOut} id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                </div>

                <div className='flex flex-col justify-center'>
                    <input onChange={e => setGuests(e.target.value)} value={guests} min={1} max={10} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none max-w-24" />
                </div>

                <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <span>Arama</span>
                </button>
            </form>

        </div>
    )
}

export default Hero
