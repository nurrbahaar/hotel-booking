import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { roomsDummyData, assets, roomCommonData , facilityIcons} from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../conext/AppContext';
import toast from 'react-hot-toast';
import RoomDetailsSkeleton from '../components/RoomDetailsSkeleton';

const RoomDetails = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams();
    const { rooms, getToken, axios, navigate, loading } = useAppContext();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(searchParams.get('checkIn') || '');
    const [checkOutDate, setCheckOutDate] = useState(searchParams.get('checkOut') || '');
    const [guests, setGuests] = useState(searchParams.get('guests') || 1);

    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
        try {
            if (checkInDate >= checkOutDate) {
                toast.error("Cikis tarihi giris tarihinden sonra olmalidir")
                return;
            }
            const token = await getToken();
            const { data } = await axios.post('/api/bookings/check-availability', {
                room: id,
                checkInDate,
                checkOutDate,
            }, { headers: { Authorization: `Bearer ${token}` } })
            
            if (data?.success) {
                if (data.isAvailable) {
                    setIsAvailable(true)
                    toast.success("Oda secilen tarihler icin musait");
                }
                else {
                    setIsAvailable(false);
                    toast.error("Oda secilen tarihler icin musait degil");
                }
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error("Musaitlik kontrolu sirasinda bir hata olustu");
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            if (!isAvailable) {
                await checkAvailability();
            }
            else {
                const { data } = await axios.post('/api/bookings/book', {
                    room: id,
                    checkInDate,
                    checkOutDate,
                    guests,
                    paymentMethod: 'pay at hotel'
                }, { headers: { Authorization: `Bearer ${await getToken()}` } })

                if (data?.success) {
                    toast.success(data.message);
                    navigate('/my-bookings')
                    scrollTo(0, 0);
                }
                else {
                    toast.success(data.message);
                }
            }
        }
        catch (error) {
            toast.error("Rezervasyon sirasinda bir hata olustu");
        }
    }
    useEffect(() => {
        const room = rooms.find(room => room._id === id);
       
            if (room) {
                setRoom(room);
                setMainImage(room.images?.[0]);
            }
        
    }, [rooms, id]);

    if (loading) {
        return <RoomDetailsSkeleton />;
    }

    return room ? (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* �st Ba�l�k ve Bilgiler */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair' >
                    {room.hotel?.name} <span className='font-inter text-sm' >({room.roomType}) </span>
                </h1>
            </div>

            {/* Yıldız ve Yorumlar */}
            <div className='flex items-center gap-4 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
            </div>

            {/* Konum */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span> {(() => {
                    const address = room.hotel?.address;
                    const addressText = address?.city || address?.line || (typeof address === 'string' ? address : '') || 'No Address';
                    return addressText.replace(/^\?stanbul/i, '�stanbul').replace(/^stanbul/i, '�stanbul');
                })()}</span>
            </div>

            {/* Resim Galerisi Alanı */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                {/* Sol taraf: Büyük Resim */}
                <div className='lg:w-1/2 w-full'>
                    {mainImage && <img src={mainImage} alt="room Image" className='w-full rounded-xl shadow-lg object-cover h-full' />}
                </div>

                {/* Sağ taraf: Küçük Resimler Grid */}
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room.images.length > 1 && room.images.map((image, index) => (
                        <img
                            onClick={() => setMainImage(image)}
                            key={index}
                            src={image}
                            alt='room image'
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer h-[200px] ${mainImage === image && 'outline-3 outline-orange-500 '}`}
                        />
                    ))}
                </div>
            </div>

            {/* Oda Açıklaması ve Özellikler */}
            {/* Not: Bu kısım loop dışına taşındı ve eksik olan map yapısı düzeltildi */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10' >
                <div className='flex flex-col '>
                    <h1 className='text-3xl md:text-4xl font-playfair '>Experience Luxury Like Never Before</h1>

                    {/* Eğer room.facilities varsa haritala, yoksa hata vermesin diye kontrol eklendi */}
                    {room.facilities && room.facilities.map((item, index) => (
                        <div key={index} >
                            {/* facilityIcons import edilmemiş olabilir, bu yüzden hata almamak için kontrol eklendi */}
                            {/* <img src={facilityIcons[item]} alt={item} className='w-5 h-5' /> */}
                            <p className='text-xs'>{item} </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className='text-2xl font-medium' >{room.pricePerNight} TL/night</p>

            </div>
            {/*  check in check out */}
            <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl' >
                <div className='flex flex-col md:flex-row gap-4 w-full' >
                    <div className='flex flex-col w-full' >
                        <label htmlFor='checkInDate' className='font-medium'>Giris Tarihi</label>
                        <input value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} type='date' id="checkInDate" placeholder="check-In" className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>

                    <div className='flex flex-col w-full' >
                        <label htmlFor='checkOutDate' className='font-medium'>Cikis Tarihi</label>
                        <input value={checkOutDate} onChange={(e)=> setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} type='date' id="checkOutDate" placeholder="check-Out" className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden' >

                    </div>
                    <div className='flex flex-col w-full' >
                        <label htmlFor='guests' className='font-medium'>Misafir Sayisi</label>
                        <input onChange={(e) => setGuests(e.target.value)} value={guests} type='number' id="guests" placeholder="0" className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>

                </div>
                <button type='submit' className='bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-300' >
{isAvailable ? 'Rezervasyon Yap' : 'Musaitlik Kontrolu'}
                </button>

            </form>
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-2'>
                        <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                        <div>
                            <p className="text-base" >{spec.title}</p>
                            <p className="text-gray-500" >{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500' >
                <p className='mb-4'>
                    {room.description}
                </p>
                <p>
                    Konuklarimiz icin ozenle tasarlanmis bu odada konfor ve sikligi bir arada bulacaksiniz. 
                    Modern imkanlar, ferah yasam alanlari ve essiz manzarasi ile unutulmaz bir konaklama deneyimi sizi bekliyor. 
                    Otelimiz, sehrin en gozde noktalarina yakin konumuyla hem is hem de tatil amacli seyahatleriniz icin mukemmel bir tercihtir.
                </p>
            </div>
            {/* hosted by */}
            <div className='flex flex-col items-start  gap-4'>
                <img src={room.hotel?.owner?.image || assets.userIcon} alt="host" className='h-14 w-14 md:h-18 rounded-full' />
                <div>
                    <p className='text-lg md:text-xl '>Hosted By {room.hotel?.name}</p>
                    <div className='flex items-center mt-1'>
                        <StarRating />
                        <p className='ml-2'>200+ reviews</p>
                    </div>


                </div>
            </div>
            <button 
                onClick={() => {
                    if (room.hotel?.phone) {
                        window.location.href = `tel:${room.hotel.phone}`;
                    } else {
                        toast.error("Contact information not available");
                    }
                }}
                className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'
            >
                Contact now
            </button>
        </div >
    ) : null;// Ternary operatörü kapatıldı
}

export default RoomDetails;