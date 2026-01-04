import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { registerHotel, getHotels, getPendingHotels, approveHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/', getHotels);
hotelRouter.get('/pending', protect, isAdmin, getPendingHotels);
hotelRouter.post('/approve', protect, isAdmin, approveHotel);

export default hotelRouter;