import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomsDummyData, assets, facilityIcons } from '../assets/assets';
import StarRating from '../components/StarRating';

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
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false);

    // --- FİLTRE STATE'LERİ ---
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);

    const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family'];

    // Fiyat aralıkları şimdilik görsel kalabilir veya mantık eklenebilir
    const priceRanges = ['$50 - $100', '$101 - $200', '$201 - $300', '$301 - $400', '$401+'];

    const sortOptions = [
        'Price: Low to High',
        'Price: High to Low',
        'Rating: High to Low',
        'Rating: Low to High',
    ];

    // Sayfa ilk açıldığında tüm odaları göster
    useEffect(() => {
        setFilteredRooms(roomsDummyData);
    }, []);

    // --- FİLTRELEME FONKSİYONLARI ---
    const handleTypeChange = (checked, label) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, label]);
        } else {
            setSelectedTypes(selectedTypes.filter(t => t !== label));
        }
    };

    const handleSortChange = (label) => {
        setSelectedSort(label);
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedSort('');
        setFilteredRooms(roomsDummyData);
    };

    // Her seçim değiştiğinde listeyi güncelle (useEffect)
    useEffect(() => {
        let tempRooms = [...roomsDummyData];

        // 1. Oda Tipi Filtresi
        // Not: Dummy datanızda 'type' alanı yoksa burası çalışmaz. 
        // Geçici olarak otel isminde veya açıklamasında aratıyoruz:
        if (selectedTypes.length > 0) {
            tempRooms = tempRooms.filter(room =>
                selectedTypes.some(type =>
                    // room.type === type || // Eğer verinizde type varsa bunu açın
                    room.hotel.name.includes(type) ||
                    (room.description && room.description.includes(type))
                )
            );
        }

        // 2. Sıralama Mantığı
        if (selectedSort === 'Price: Low to High') {
            tempRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (selectedSort === 'Price: High to Low') {
            tempRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
        } else if (selectedSort === 'Rating: High to Low') {
            tempRooms.sort((a, b) => b.rating - a.rating);
        } else if (selectedSort === 'Rating: Low to High') {
            tempRooms.sort((a, b) => a.rating - b.rating);
        }

        setFilteredRooms(tempRooms);

    }, [selectedTypes, selectedSort]);


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
                {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                        <div key={room._id} className='my-8 flex flex-col md:flex-row items-center gap-6 border-b border-gray-100 pb-8 last:border-0'>
                            <img
                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }}
                                src={room.images[0]}
                                alt='hotel-img'
                                title='view room details'
                                className='max-h-65 w-full md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-[1.02] transition-all duration-300'
                            />

                            <div className='w-full md:w-1/2 flex flex-col gap-2'>
                                <p className='text-gray-500 text-sm'>{room.hotel.city}</p>
                                <p onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }} className='text-gray-800 text-2xl md:text-3xl font-playfair cursor-pointer hover:text-indigo-600 transition-colors'>
                                    {room.hotel.name}
                                </p>

                                <div className='flex items-center'>
                                    <StarRating rating={room.rating} />
                                    <p className='ml-2 text-sm text-gray-500'>200+ reviews</p>
                                </div>

                                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                    <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                                    <span> {room.hotel.address}</span>
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
                                    <p className='text-xl font-medium text-gray-800'> ${room.pricePerNight} <span className='text-sm text-gray-500 font-normal'>/night</span> </p>
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

                        {/* Price Range (Visual Only for now) */}
                        <div className='mb-6'>
                            <p className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider'>Price Range</p>
                            {priceRanges.map((range, index) => (
                                <CheckBox key={index} label={range} selected={false} onChange={() => { }} />
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
                                    onChange={handleSortChange}
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