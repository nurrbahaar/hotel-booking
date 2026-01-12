import Review from '../models/Review.js';
import Hotel from '../models/Hotel.js';

export const addReview = async (req, res) => {
    try {
        const { hotelId, rating, comment } = req.body;
        const userId = req.user._id; // Auth middleware sets req.user

        if (!hotelId || !rating || !comment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const review = new Review({
            user: userId,
            hotel: hotelId,
            rating,
            comment
        });

        await review.save();

        // Update Hotel Star Rating and Review Count
        const reviews = await Review.find({ hotel: hotelId });
        const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / reviews.length;

        await Hotel.findByIdAndUpdate(hotelId, { 
            starRating: averageRating,
            numReviews: reviews.length
        });

        res.status(201).json({ success: true, review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getHotelReviews = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const reviews = await Review.find({ hotel: hotelId }).populate('user', 'username image').sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username image') // Ensure user details are populated
            .sort({ createdAt: -1 })
            .limit(6);
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
