import React, { useEffect, useState } from 'react'
import Title from './Title'
import StarRating from './StarRating'
import { useAppContext } from '../conext/AppContext'
import { assets } from '../assets/assets'

const Testimonial = () => {
    const { axios } = useAppContext();
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get('/api/reviews/all');
                if (data.success) {
                    setReviews(data.reviews);
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, [axios]);

    return (
        <div id="testimonials" className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
            <Title Title='Misafir Deneyimleri' />
            
            {loadingReviews ? (
                <div className="mt-20">Yükleniyor...</div>
            ) : (
                <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                    {reviews.length > 0 ? reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-xl shadow w-full md:w-[350px]">
                            <div className="flex items-center gap-3">
                                <img 
                                    className="w-12 h-12 rounded-full object-cover" 
                                    src={review.user?.image || assets.userIcon} 
                                    alt={review.user?.username} 
                                    onError={(e) => { e.target.src = assets.userIcon }}
                                />
                                <div>
                                    <p className="font-playfair text-xl">{review.user?.username || "Misafir"}</p>
                                    <p className="text-gray-500 text-sm truncate w-40">
                                        {review.hotel?.name ? `${review.hotel.name}` : "Konuk"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-4">
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-gray-500 mt-4 line-clamp-4 min-h-[5rem]">"{review.comment}"</p>
                        </div>
                    )) : (
                         <div className="text-gray-500 text-center">Henüz yorum yapýlmamýþ. Ýlk yorumu siz yapýn!</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Testimonial
