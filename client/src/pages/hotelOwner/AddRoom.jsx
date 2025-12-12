import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {

    const [images, setImages] = useState({
        '1': null,
        '2': null,
        '3': null,
        '4': null
    })

    // 'imputs' yazım hatasını 'inputs' olarak düzelttim
    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: "",
        amenities: {
            'WiFi': false,
            'Air Conditioning': false,
            'TV': false,
            'Mini Bar': false,
            'Room Service': false,
            'Balcony': false,
            'Sea View': false,
            'Kitchenette': false
        }
    })

    return (
        <form className='flex flex-col w-full'>
            <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details to add a new room' />

            {/* Fotoğraf Yükleme Alanı */}
            <p className='text-gray-800 mt-10'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label htmlFor={`roomImage${key}`} key={key}>
                        <img
                            className='w-24 h-24 object-cover cursor-pointer opacity-80 border rounded'
                            src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                            alt=''
                        />
                        <input
                            type='file'
                            accept='image/*'
                            id={`roomImage${key}`}
                            hidden
                            onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
                        />
                    </label>
                ))}
            </div>

            <div className='flex flex-col gap-4 my-4'>

                <div className='flex-1 max-w-48' >
                    <p className='text-gray-800 mt-4'>Room Type</p>
                    <select value={inputs.roomType} onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full '>
                        <option value="" >Select Room Type</option>
                        <option value="Single bed" >Single bed</option>
                        <option value="double bed" >Double bed</option>
                        <option value="luxury room" >Luxury room</option>
                        <option value="family suite" >Family suite</option>
                    </select>
                </div>
                <div >
                    <p className='mt-4 text-gray-800'>
                        Price <span className='text-xs'>/gece</span>
                    </p>
                    <input
                        type='number'
                        placeholder='0'
                        value={inputs.pricePerNight}
                        onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })}
                        className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full '
                    />
                </div>
            </div>
            <p className='text-gray-800 flex-wrap mt-1 text-gray-400 max-w-sm'>
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <div key={index}>
                        <input
                            type='checkbox'
                            id={`amenities${index + 1}`}
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
                        <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
                    </div>
                ))}
            </p>
            <button className='bg-primary text-white  px-8 py-2 rounded mt-8 cursor-pointer' >
                Add Room

            </button>

        </form>
    )
}

export default AddRoom