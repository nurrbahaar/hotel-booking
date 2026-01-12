import React, { useState, useEffect } from 'react';
import { useAppContext } from '../conext/AppContext';
import { assets } from '../assets/assets';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

const Reviews = ({ hotelId }) => {
    const { axios, user, getToken } = useAppContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`/api/reviews/${hotelId}`);
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hotelId) {
            fetchReviews();
        }
    }, [hotelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Yorum yapmak için giriþ yapmalýsýnýz.");
            return;
        }
        if (newReview.rating === 0) {
            toast.error("Lütfen puan veriniz.");
            return;
        }
        if (!newReview.comment.trim()) {
            toast.error("Lütfen bir yorum yazýn.");
            return;
        }

        setSubmitting(true);
        try {
            const token = await getToken();
            const { data } = await axios.post('/api/reviews/add', {
                hotelId,
                rating: newReview.rating,
                comment: newReview.comment
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                toast.success("Yorumunuz eklendi!");
                setNewReview({ rating: 0, comment: '' });
                fetchReviews(); // Refresh reviews
            } else {
                toast.error(data.message || "Yorum eklenirken bir hata oluþtu.");
            }
        } catch (error) {
            toast.error("Yorum eklenirken bir hata oluþtu.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-playfair mb-6">Yorumlar ({reviews.length})</h2>

            {/* Review Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Yorum Yap</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Puan{'\u0131'}n{'\u0131'}z</label>
                        <div className="bg-white inline-block p-2 rounded-lg border border-gray-200">
                             <StarRating 
                                rating={newReview.rating} 
                                onRatingChange={(rate) => setNewReview({ ...newReview, rating: rate })} 
                             />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Yorumunuz</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={"Deneyiminizi payla\u015F\u0131n..."}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {submitting ? 'G\u00F6nderiliyor...' : 'G\u00F6nder'}
                    </button>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-blue-50 text-blue-700 rounded-lg">
                    Yorum yapmak için lütfen giriþ yapýn.
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <p>Yükleniyor...</p>
            ) : reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={review.user?.image || assets.userIcon}
                                    alt={review.user?.username}
                                    onError={(e) => { e.target.src = assets.userIcon }}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">{review.user?.username || "Anonim"}</p>
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={review.rating} />
                                        <span className="text-xs text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Henüz yorum yapýlmamýþ. Ýlk yorumu siz yapýn!</p>
            )}
        </div>
    );
};

export default Reviews;
