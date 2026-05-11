// src/routes/statisticRoute.ts
import { Router } from 'express';
import { getRevenueStats } from '../controllers/statisticController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

// Route lấy thống kê doanh thu (Chỉ cho phép Giám đốc - Role 2)
router.get('/revenue', authenticateToken, authorize(2), getRevenueStats);

export default router;