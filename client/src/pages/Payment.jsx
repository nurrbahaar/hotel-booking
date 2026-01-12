import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../conext/AppContext';
import toast from 'react-hot-toast';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { getToken, axios } = useAppContext();
    const { room, checkInDate, checkOutDate, guests, totalPrice, nights } = location.state || {};

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    if (!room) {
        return <div className='py-20 text-center'>Booking details not found. Please try again.</div>;
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data } = await axios.post('/api/bookings/book', {
                room: room._id,
                checkInDate,
                checkOutDate,
                guests,
                paymentMethod: 'credit_card' // Or whatever your backend expects
            }, { headers: { Authorization: `Bearer ${await getToken()}` } });

            if (data?.success) {
                toast.success("\u00D6deme ba\u015Far\u0131l\u0131! Rezervasyonunuz olu\u015Fturuldu.");
                navigate('/my-bookings');
            } else {
                toast.error(data.message || "Rezervasyon olu\u015Fturulamad\u0131.");
            }
        } catch (error) {
            console.error(error);
            toast.error("\u00D6deme s\u0131ras\u0131nda bir hata olu\u015Ftu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen py-20 px-4 md:px-16 lg:px-24 bg-gray-50'>
            <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                
                {/* Booking Summary */}
                <div className='bg-white p-6 rounded-xl shadow-md h-fit'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>Rezervasyon {'\u00D6'}zeti</h2>
                    <div className='flex gap-4 mb-4'>
                        <img src={room.images[0]} alt={room.roomType} className='w-24 h-24 object-cover rounded-lg' />
                        <div>
                            <h3 className='font-semibold text-lg'>{room.hotel?.name}</h3>
                            <p className='text-gray-600'>{room.roomType}</p>
                        </div>
                    </div>
                    
                    <div className='space-y-3 text-sm text-gray-700 border-t pt-4'>
                        <div className='flex justify-between'>
                            <span>Giri{'\u015F'} Tarihi:</span>
                            <span className='font-medium'>{checkInDate}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>{'\u00C7'}{'\u0131'}k{'\u0131'}{'\u015F'} Tarihi:</span>
                            <span className='font-medium'>{checkOutDate}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Misafir:</span>
                            <span className='font-medium'>{guests} Ki{'\u015F'}i</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Toplam Gece:</span>
                            <span className='font-medium'>{nights} Gece</span>
                        </div>
                        <div className='flex justify-between text-lg font-bold text-primary pt-2 border-t mt-2'>
                            <span>Toplam Tutar:</span>
                            <span>{totalPrice} TL</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className='bg-white p-6 rounded-xl shadow-md'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>{'\u00D6'}deme Bilgileri</h2>
                    <form onSubmit={handlePayment} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Kart {'\u00DC'}zerindeki {'\u0130'}sim</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                                placeholder='Ad Soyad'
                            />
                        </div>
                        
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Kart Numaras{'\u0131'}</label>
                            <input 
                                type="text" 
                                required
                                maxLength="19"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                                placeholder='0000 0000 0000 0000'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Son Kullanma (AA/YY)</label>
                                <input 
                                    type="text" 
                                    required
                                    maxLength="5"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                                    placeholder='MM/YY'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>CVC</label>
                                <input 
                                    type="text" 
                                    required
                                    maxLength="3"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                                    placeholder='123'
                                />
                            </div>
                        </div>

                        <button 
                            type='submit' 
                            disabled={loading}
                            className='w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dull transition-colors mt-6 disabled:opacity-70'
                        >
                            {loading ? '\u0130\u015Fleniyor...' : `\u00D6demeyi Tamamla (${totalPrice} TL)`}
                        </button>
                        
                        <p className='text-xs text-gray-500 text-center mt-4'>
                            G{'\u00FC'}venli {'\u00F6'}deme altyap{'\u0131'}s{'\u0131'} ile korunmaktad{'\u0131'}r. Kart bilgileriniz saklanmaz.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;