import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

// GET /api/dashboard/stats?timeframe=year
router.get('/stats', authenticateToken, authorize(2), getDashboardStats);

export default router;