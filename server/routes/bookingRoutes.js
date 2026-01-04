import express from "express";

import {

    checkAvailabilityAPI,
    createBooking,
    getUserBookings,
    getHotelBookings,
    updateBookingStatus
} from "../controllers/bookingControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', protect, checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
bookingRouter.post('/update-status', protect, updateBookingStatus);

export default bookingRouter;
