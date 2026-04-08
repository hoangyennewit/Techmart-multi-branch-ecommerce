import { PaymentController } from '../controllers/paymentController';
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const paymentController = new PaymentController();

router.post('/create-payment-intent', authenticateToken, paymentController.createPaymentIntent);

export default router;