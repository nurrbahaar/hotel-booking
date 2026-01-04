import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { assets, facilityIcons } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../conext/AppContext';
import RoomListSkeleton from '../components/RoomListSkeleton';

const CheckBox = ({ label, selected, onChange }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected, onChange }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { rooms, navigate, currency, loading } = useAppContext();

    console.log("AllRooms - rooms:", rooms);

    const [openFilters, setOpenFilters] = useState(false);
    // --- FİLTRE STATE'LERİ ---
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');

    const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family'];
    const priceRanges = ['$50 - $100', '$101 - $200', '$201 - $300', '$301 - $400', '$401+'];
    const sortOptions = [
        'Price: Low to High',
        'Price: High to Low',
        'Rating: High to Low',
        'Rating: Low to High',
    ];

    // --- FILTERING LOGIC ---
    const filteredRooms = useMemo(() => {
        let tempRooms = rooms ? [...rooms] : [];

        // Filter out rooms with missing hotel data
        tempRooms = tempRooms.filter(room => room.hotel);

        // 1. Filter by Destination (from URL)
        const destination = searchParams.get('destination');
        if (destination) {
            tempRooms = tempRooms.filter(room =>
                room.hotel?.city?.toLowerCase().includes(destination.toLowerCase()) ||
                room.hotel?.name?.toLowerCase().includes(destination.toLowerCase())
            );
        }

        // 2. Filter by Room Type
        if (selectedTypes.length > 0) {
            tempRooms = tempRooms.filter(room =>
                selectedTypes.some(type => room.roomType.toLowerCase() === type.toLowerCase())
            );
        }

        // 3. Filter by Price Range
        if (selectedPriceRanges.length > 0) {
            tempRooms = tempRooms.filter(room => {
                return selectedPriceRanges.some(range => {
                    if (range === '$401+') {
                        return room.pricePerNight >= 401;
                    }
                    const parts = range.replace(/\$/g, '').split(' - ');
                    const min = parseInt(parts[0]);
                    const max = parseInt(parts[1]);
                    return room.pricePerNight >= min && room.pricePerNight <= max;
                });
            });
        }

        // 4. Sort
        if (selectedSort === 'Price: Low to High') {
            tempRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (selectedSort === 'Price: High to Low') {
            tempRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
        } else if (selectedSort === 'Rating: High to Low') {
            tempRooms.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (selectedSort === 'Rating: Low to High') {
            tempRooms.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        }

        return tempRooms;
    }, [rooms, searchParams, selectedTypes, selectedPriceRanges, selectedSort]);

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedPriceRanges([]);
        setSelectedSort('');
        setSearchParams({});
    };

    // --- HANDLERS ---
    const handleTypeChange = (checked, label) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, label]);
        } else {
            setSelectedTypes(selectedTypes.filter(t => t !== label));
        }
    };

    const handlePriceChange = (checked, label) => {
        if (checked) {
            setSelectedPriceRanges([...selectedPriceRanges, label]);
        } else {
            setSelectedPriceRanges(selectedPriceRanges.filter(p => p !== label));
        }
    };

    const handleSortChange = (label) => {
        setSelectedSort(label);
    };


    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 mn:pt-35 px-4 md:px-24 xl:px-32'>

            {/* Sol Kısım: Oda Listesi */}
            <div className='w-full lg:w-3/4 pr-0 lg:pr-8'>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2'>
                        Explore our best rooms and suites.
                    </p>
                </div>

                {/* FİLTRELENMİŞ LİSTE DÖNGÜSÜ */}
                {loading ? (
                    [1, 2, 3].map((i) => <RoomListSkeleton key={i} />)
                ) : filteredRooms.length > 0 ? (
                    filteredRooms.map((room, index) => (
                        <div key={room._id} 
                             style={{ animationDelay: `${index * 0.1}s` }}
                             className='my-8 flex flex-col md:flex-row items-center gap-6 border-b border-gray-100 pb-8 last:border-0 animate-fade-in-up opacity-0'>
                            <img
                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }}
                                src={room.images[0]}
                                alt='hotel-img'
                                title='view room details'
                                className='max-h-65 w-full md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-[1.02] transition-all duration-300'
                            />

                            <div className='w-full md:w-1/2 flex flex-col gap-2'>
                                <p className='text-gray-500 text-sm'>{room.hotel?.city || 'Unknown City'}</p>
                                <p onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }} className='text-gray-800 text-2xl md:text-3xl font-playfair cursor-pointer hover:text-indigo-600 transition-colors'>
                                    {room.hotel?.name || 'Unknown Hotel'}
                                </p>

                                <div className='flex items-center'>
                                    <StarRating rating={room.rating} />
                                    <p className='ml-2 text-sm text-gray-500'>200+ reviews</p>
                                </div>

                                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                    <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                                    <span> {(() => {
                                        const address = room.hotel?.address;
                                        const addressText = address?.city || address?.line || (typeof address === 'string' ? address : '') || 'No Address';
                                        return addressText.replace(/^\?stanbul/i, '�stanbul').replace(/^stanbul/i, '�stanbul');
                                    })()}</span>
                                </div>

                                <div className='flex flex-wrap items-center mt-3 mb-4 gap-3'>
                                    {room.amenities.slice(0, 4).map((item, index) => (
                                        <div key={index} className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-100'>
                                            <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                                            <p className='text-[11px] text-gray-600 uppercase tracking-wide'> {item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex items-center justify-between mt-2'>
                                    <p className='text-xl font-medium text-gray-800'> {room.pricePerNight} TL <span className='text-sm text-gray-500 font-normal'>/night</span> </p>
                                    <button onClick={() => navigate(`/rooms/${room._id}`)} className='bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='py-20 text-center text-gray-500'>
                        <p>No rooms found matching your filters.</p>
                        <button onClick={clearFilters} className='text-blue-600 underline mt-2'>Clear Filters</button>
                    </div>
                )}
            </div>

            {/* Sağ Kısım: Filtreler */}
            <div className='w-full lg:w-1/4'>
                <div className='bg-white w-full lg:w-80 border border-gray-200 text-gray-600 max-lg:mb-8 lg:mt-16 p-5 rounded-xl shadow-sm sticky top-24'>

                    <div className={`flex items-center justify-between pb-3 ${openFilters ? "border-b border-gray-200" : ""}`}>
                        <p className='font-bold text-gray-800 tracking-wide'>FILTERS</p>
                        <div className='text-xs cursor-pointer font-medium'>
                            <span onClick={() => setOpenFilters(prev => !prev)} className='lg:hidden text-indigo-600'>
                                {openFilters ? 'HIDE' : 'SHOW'}
                            </span>
                            <span onClick={clearFilters} className='hidden lg:block text-red-500 hover:text-red-700 transition-colors'>CLEAR ALL</span>
                        </div>
                    </div>

                    <div className={`${openFilters ? 'h-auto opacity-100 mt-4' : 'h-0 opacity-0 lg:h-auto lg:opacity-100 lg:mt-0'} overflow-hidden transition-all duration-300`}>

                        {/* Room Type Filter */}
                        <div className='mb-6'>
                            <p className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider'>Room Type</p>
                            {roomTypes.map((type, index) => (
                                <CheckBox
                                    key={index}
                                    label={type}
                                    selected={selectedTypes.includes(type)}
                                    onChange={handleTypeChange}
                                />
                            ))}
                        </div>

                        {/* Price Range Filter */}
                        <div className='mb-6'>
                            <p className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider'>Price Range</p>
                            {priceRanges.map((range, index) => (
                                <CheckBox
                                    key={index}
                                    label={range}
                                    selected={selectedPriceRanges.includes(range)}
                                    onChange={handlePriceChange}
                                />
                            ))}
                        </div>

                        {/* Sort Option */}
                        <div>
                            <p className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider'>Sort By</p>
                            {sortOptions.map((option, index) => (
                                <RadioButton
                                    key={index}
                                    label={option}
                                    selected={selectedSort === option}
                                    onChange={() => handleSortChange(option)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;