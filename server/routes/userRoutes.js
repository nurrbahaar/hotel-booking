import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getUserData, storeRecentSearchedCities, getAllUsers, makeMeAdmin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.get('/all', protect, isAdmin, getAllUsers);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);
userRouter.post('/make-me-admin', protect, makeMeAdmin);

export default userRouter;