import paymentController from "../controllers/paymentController";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/create-payment-intent",
  authenticateToken,
  paymentController.createPaymentIntent,
);

export default router;
