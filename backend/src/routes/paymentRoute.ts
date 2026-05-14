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

// ==========================================
// 2. MOMO
// ==========================================
router.post(
  "/momo/create",
  authenticateToken,
  paymentController.createMomoPayment
);

// IPN: MoMo server gọi trực tiếp — KHÔNG dùng authenticateToken
router.post(
  "/momo/ipn",
  paymentController.handleMomoIpn
);

router.get(
  "/momo/return",
  paymentController.handleMomoReturn
);

export default router;
