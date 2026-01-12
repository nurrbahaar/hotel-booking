import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { roomsDummyData, assets, roomCommonData , facilityIcons} from '../assets/assets';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
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
                // Calculate total price
                const start = new Date(checkInDate);
                const end = new Date(checkOutDate);
                const timeDiff = end.getTime() - start.getTime();
                const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
                const totalPrice = nights * room.pricePerNight;

                // Navigate to payment page with booking details
                navigate('/payment', { 
                    state: { 
                        room, 
                        checkInDate, 
                        checkOutDate, 
                        guests, 
                        totalPrice,
                        nights
                    } 
                });
            }
        }
        catch (error) {
            toast.error("Bir hata olu�tu");
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

            {/* Y�ld�z ve Yorumlar */}
            <div className='flex items-center gap-4 mt-2'>
                <StarRating rating={room.hotel?.starRating || 0} />
                <p className='ml-2'>{room.hotel?.numReviews || 0} reviews</p>
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

                    {/* E�er room.amenities varsa haritala, yoksa hata vermesin diye kontrol eklendi */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {room.amenities && room.amenities.map((item, index) => {
                            const icon = facilityIcons[item] || 
                                       facilityIcons[item.toUpperCase()] || 
                                       facilityIcons[item.toLocaleUpperCase('tr-TR')] || 
                                       assets.starIconFilled;
                            return (
                                <div key={index} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 shadow-sm">
                                    <img src={icon} alt={item} className='w-5 h-5 opacity-75' />
                                    <p className='text-xs font-medium text-gray-700 uppercase'>{item}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <p className='text-2xl font-medium' >{room.pricePerNight} TL/gece</p>

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
                    {`Konuklar\u0131m\u0131z i\u00E7in \u00F6zenle tasarlanm\u0131\u015F bu odada konfor ve \u015F\u0131kl\u0131\u011F\u0131 bir arada bulacaks\u0131n\u0131z.`}
                    {` Modern imkanlar, ferah ya\u015Fam alanlar\u0131 ve e\u015Fsiz manzaras\u0131 ile unutulmaz bir konaklama deneyimi sizi bekliyor.`}
                    {` Otelimiz, \u015Fehrin en g\u00F6zde noktalar\u0131na yak\u0131n konumuyla hem i\u015F hem de tatil ama\u00E7l\u0131 seyahatleriniz i\u00E7in m\u00FCkemmel bir tercihtir.`}
                </p>
            </div>

            {/* Reviews Section */}
            <div className="max-w-3xl">
                {room.hotel && <Reviews hotelId={room.hotel._id} />}
            </div>


        </div >
    ) : null;// Ternary operatörü kapatıldı
}

export default RoomDetails;