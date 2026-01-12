import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { registerHotel, getHotels, getPendingHotels, approveHotel, getAllHotelsAdmin, rejectHotel, deleteHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/', getHotels);
hotelRouter.get('/all-admin', protect, isAdmin, getAllHotelsAdmin);
hotelRouter.get('/pending', protect, isAdmin, getPendingHotels);
hotelRouter.post('/approve', protect, isAdmin, approveHotel);
hotelRouter.post('/reject', protect, isAdmin, rejectHotel);

// Otel Sil (Admin veya Otel Sahibi)
hotelRouter.delete('/:id', protect, isAdmin, deleteHotel);

export default hotelRouter;