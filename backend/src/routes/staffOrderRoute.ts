import { Router } from "express";
import staffOrderController from "../controllers/staffOrderController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { UserRole } from "../interfaces/roleInterface";
const router = Router();

// 1. Lấy danh sách: GET /api/staff/orders
router.get(
  "/orders", 
  authenticateToken, 
  authorize(UserRole.NV_BAN_HANG), // Cho phép tất cả các role nhân viên
  staffOrderController.getOrders
);

// 2. Chi tiết: GET /api/staff/orders/:id
router.get(
  "/orders/:id", 
  authenticateToken, 
  authorize(UserRole.NV_BAN_HANG), 
  staffOrderController.getOrderDetailsById
);

// 3. Cập nhật: PATCH /api/staff/orders/:id/status (Đổi từ PUT sang PATCH)
router.patch(
  "/orders/:id/status", 
  authenticateToken, 
  authorize(UserRole.NV_BAN_HANG), 
  staffOrderController.updateOrderStatus // Đảm bảo tên hàm trong Controller là updateStatus
);

export default router;