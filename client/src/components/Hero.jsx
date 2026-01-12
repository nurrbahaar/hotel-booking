import React, { useState, useMemo } from 'react'

import { assets, cities } from '../assets/assets'
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
            
            <h1 className='font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl mt-20 drop-shadow-lg'>Hayalinizdeki Tatili Roomy ile Ke{'\u015F'}fedin</h1>
            <p className='max-w-2xl mt-4 text-lg md:text-xl font-light drop-shadow-md'>Konfor, l{'\u00FC'}ks ve unutulmaz an{'\u0131'}lar i{'\u00E7'}in do{'\u011F'}ru adrestesiniz. Sizin i{'\u00E7'}in se{'\u00E7'}ti{'\u011F'}imiz en {'\u00F6'}zel otellerde yerinizi hemen ay{'\u0131'}rt{'\u0131'}n.</p>


            <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4  mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

                <div className='flex flex-col justify-center gap-1'>
                    <label className='text-sm font-bold text-gray-800'>Sehir</label>
                    <input onChange={e=> setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" placeholder="Sehir arayin" className="rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                    <datalist id='destinations'>
                        {cities.map((city, index) => (
                            <option value={city} key={index} />
                        ))}
                    </datalist>
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label className='text-sm font-bold text-gray-800'>{'Giri\u015F Tarihi'}</label>
                    <input onChange={e => setCheckIn(e.target.value)} value={checkIn} id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label className='text-sm font-bold text-gray-800'>{'\u00C7\u0131k\u0131\u015F Tarihi'}</label>
                    <input onChange={e => setCheckOut(e.target.value)} value={checkOut} id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none" />
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label className='text-sm font-bold text-gray-800'>Konuk</label>
                    <input onChange={e => setGuests(e.target.value)} value={guests} min={1} max={10} id="guests" type="number" placeholder="Konuk" className=" rounded border border-gray-200 px-3 py-2 text-sm outline-none max-w-24" />
                </div>

                <div className='flex flex-col justify-end'>
                    <button className='flex items-center justify-center gap-1 rounded-md bg-black py-2 px-4 text-white cursor-pointer max-md:w-full h-[38px]' >
                        <span>Arama</span>
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Hero
