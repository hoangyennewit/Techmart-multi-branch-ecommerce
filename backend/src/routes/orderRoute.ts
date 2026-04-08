import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);

export default router;