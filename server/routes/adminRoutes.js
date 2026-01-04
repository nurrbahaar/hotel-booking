import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getAdminStats } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/stats', protect, isAdmin, getAdminStats);

export default adminRouter;
