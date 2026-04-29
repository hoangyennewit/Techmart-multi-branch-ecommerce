import paymentController from "../controllers/paymentController";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// ==========================================
// 1. VNPAY
// ==========================================
// router.post(
//   "/create-payment-intent",
//   authenticateToken,
//   paymentController.createPaymentIntent,
// );
router.get(
  "/vnpay_return",
  paymentController.vnpayReturn
);

// ==========================================
// 2. ZALOPAY
// ==========================================
router.post(
  "/create-payment-intent",
  authenticateToken,
  paymentController.createZaloPayPayment 
);

router.post(
  "/zalopay/callback",
  paymentController.handleZaloPayCallback
);

export default router;