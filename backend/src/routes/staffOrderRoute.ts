import { Router } from "express";
import staffOrderController from "../controllers/staffOrderController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { UserRole } from "../interfaces/roleInterface";
const router = Router();

// Cho phép tất cả các role nhân viên truy cập: CSKH (5), Bán hàng (6), Kho (7)
const staffRoles = [UserRole.NV_CSKH, UserRole.NV_BAN_HANG, UserRole.NV_KHO];

// 1. Lấy danh sách: GET /api/staff/orders
router.get(
  "/orders", 
  authenticateToken, 
  authorize(...staffRoles),
  staffOrderController.getOrders
);

// 2. Chi tiết: GET /api/staff/orders/:id
router.get(
  "/orders/:id", 
  authenticateToken, 
  authorize(...staffRoles),
  staffOrderController.getOrderDetailsById
);

// 3. Cập nhật: PATCH /api/staff/orders/:id/status
router.patch(
  "/orders/:id/status", 
  authenticateToken, 
  authorize(...staffRoles),
  staffOrderController.updateOrderStatus
);

export default router;