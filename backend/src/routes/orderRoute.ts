import express from "express";
import orderController from "../controllers/orderController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, (req, res) =>
  orderController.createOrder(req, res),
);
router.get("/my-orders", authenticateToken, (req, res) =>
  orderController.getMyOrdersService(req, res),
);

export default router;
