import express from 'express';
import { addReview, getHotelReviews, getAllReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addReview);
router.get('/all', getAllReviews);
router.get('/:hotelId', getHotelReviews);

export default router;