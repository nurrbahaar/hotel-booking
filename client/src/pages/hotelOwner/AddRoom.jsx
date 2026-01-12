import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';
import { useAppContext } from '../../conext/AppContext';

const AddRoom = () => {
    const { axios, getToken } = useAppContext();
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState({
        '1': null,
        '2': null,
        '3': null,
        '4': null
    });

    const roomTypeOptions = [
        "Standart Oda",
        "Deluxe Oda",
        "Premium Oda",
        "Suit",
        "Aile Odasi",
        "Kral Dairesi"
    ];

    const amenityList = [
        "\u00DCcretsiz Wi-Fi", "Y\u00FCzme Havuzu", "Spa", "Spor Salonu", "Restoran", 
        "Bar", "Otopark", "Oda Servisi", "Klima", "Kahvalt\u0131 Dahil", 
        "Havaalan\u0131 Servisi", "Evcil Hayvan Dostu", "7/24 Resepsiyon"
    ];

    // Initialize amenities state dynamically
    const initialAmenities = amenityList.reduce((acc, amenity) => {
        acc[amenity] = false;
        return acc;
    }, {});

    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: "",
        description: "",
        capacityAdults: 2,
        capacityChildren: 0,
        amenities: initialAmenities
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!inputs.roomType || !inputs.pricePerNight || !Object.values(images).some(img => img)) {
            toast.error("Lutfen gerekli alanlari doldurun ve en az bir fotograf yukleyin.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', inputs.pricePerNight)
            formData.append('description', inputs.description)
            formData.append('capacityAdults', inputs.capacityAdults)
            formData.append('capacityChildren', inputs.capacityChildren)

            const selectedAmenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
            // Store as valid JSON string of array
            formData.append('amenities', JSON.stringify(selectedAmenities))

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key])
            })

            const { data } = await axios.post('/api/rooms', formData, { 
                headers: { Authorization: `Bearer ${await getToken()}` } 
            })

            if (data.success) {
                toast.success("Oda basariyla eklendi!")
                setInputs({
                    roomType: "",
                    pricePerNight: "",
                    description: "",
                    capacityAdults: 2,
                    capacityChildren: 0,
                    amenities: initialAmenities
                })
                setImages({ 1: null, 2: null, 3: null, 4: null })
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    const removeImage = (key) => {
        setImages(prev => ({ ...prev, [key]: null }));
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mb-8 border-b pb-4">
                <Title align='left' font='outfit' title='Yeni Oda Ekle' subTitle='Oteliniz icin yeni bir oda olusturun' />
            </div>

            <form onSubmit={onSubmitHandler} className='space-y-8'>
                
                {/* Image Upload Section */}
                <div className='space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Oda Fotograflari</label>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                        {Object.keys(images).map((key) => (
                            <div key={key} className="relative group aspect-square">
                                <label htmlFor={`roomImage${key}`} className="cursor-pointer w-full h-full block">
                                    {images[key] ? (
                                        <>
                                            <img
                                                className='w-full h-full object-cover rounded-lg border-2 border-orange-100'
                                                src={URL.createObjectURL(images[key])}
                                                alt={`Preview ${key}`}
                                            />
                                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                 onClick={(e) => { e.preventDefault(); removeImage(key); }}>
                                                <img src={assets.cross_icon || "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"} className="w-4 h-4" alt="remove" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition-colors">
                                            <div className="text-gray-400 text-3xl mb-2">+</div>
                                            <span className="text-xs text-gray-500 font-medium">Fotograf {key}</span>
                                        </div>
                                    )}
                                    <input
                                        type='file'
                                        accept='image/*'
                                        id={`roomImage${key}`}
                                        hidden
                                        onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Basic Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Oda Tipi</label>
                        <select 
                            value={inputs.roomType} 
                            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })} 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all'
                        >
                            <option value="">Seciniz...</option>
                            {roomTypeOptions.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Gecelik Fiyat (TL)</label>
                        <div className="relative">
                            <input
                                type='number'
                                placeholder='Orn: 2500'
                                value={inputs.pricePerNight}
                                onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pl-8'
                            />
                            <span className="absolute left-3 top-2 text-gray-400">TL</span>
                        </div>
                    </div>
                </div>

                 {/* Capacity Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Yetiskin Kapasitesi</label>
                        <input
                            type='number'
                            min="1"
                            value={inputs.capacityAdults}
                            onChange={(e) => setInputs({ ...inputs, capacityAdults: e.target.value })}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Cocuk Kapasitesi</label>
                        <input
                            type='number'
                            min="0"
                            value={inputs.capacityChildren}
                            onChange={(e) => setInputs({ ...inputs, capacityChildren: e.target.value })}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all'
                        />
                    </div>
                </div>

                {/* Description */}
                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Aciklama</label>
                    <textarea
                        rows="3"
                        placeholder="Oda hakkinda kisa bir aciklama..."
                        value={inputs.description}
                        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none'
                    />
                </div>

                {/* Amenities Section */}
                <div className='space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Olanaklar</label>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        {Object.keys(inputs.amenities).map((amenity, index) => (
                            <label 
                                key={index} 
                                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    inputs.amenities[amenity] 
                                    ? 'bg-orange-50 border-orange-500 text-orange-700' 
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-orange-200'
                                }`}
                            >
                                <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={inputs.amenities[amenity]}
                                    onChange={() =>
                                        setInputs({
                                            ...inputs,
                                            amenities: {
                                                ...inputs.amenities,
                                                [amenity]: !inputs.amenities[amenity],
                                            },
                                        })
                                    }
                                />
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                    inputs.amenities[amenity] ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                                }`}>
                                    {inputs.amenities[amenity] && (
                                        <svg className="w-3 h-3 text-white" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm font-medium select-none truncate" title={amenity}>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <button 
                        type="submit"
                        disabled={loading}
                        className='w-full md:w-auto md:px-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                <span>Ekleniyor...</span>
                            </div>
                        ) : 'Odayi Kaydet'}
                    </button>
                </div>

            </form>
        </div>
    )
}
export default AddRoom
