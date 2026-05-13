import paymentController from "../controllers/paymentController";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// ==========================================
// 1. ZALOPAY
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

router.get(
  "/zalopay/return",
  paymentController.zaloPayReturn
);

export default router;
