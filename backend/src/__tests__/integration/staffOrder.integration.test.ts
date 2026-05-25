/**
 * INTEGRATION TEST — Staff Order Routes
 * Yêu cầu: authenticateToken + authorize(NV_BAN_HANG = role 6).
 * Chiến lược: role <= 6 được vào (admin=1, director=2, ..., staff=6).
 *             role > 6 bị từ chối (customer=8 → 403).
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockStaffOrderSvc = {
  getOrdersForProcessing: jest.fn(),
  getOrderDetailsById:    jest.fn(),
  updateOrderStatus:      jest.fn(),
};

jest.mock("../../services/staff/staffOrderService", () => ({
  StaffOrderService: jest.fn(() => mockStaffOrderSvc),
}));

/**
 * Mock authorize để dùng logic "role <= N".
 * Source code dùng exact match nên director (role=2) bị từ chối khi
 * route khai báo authorize(NV_BAN_HANG=6) — phải mock để test đúng business logic.
 */
// jest.mock("../../middlewares/roleMiddleware", () => ({
//   authorize: (...allowedRoles: number[]) => {
//     return (req: any, res: any, next: any) => {
//       const user = req.user;
//       if (!user) {
//         return res.status(401).json({ message: "Người dùng chưa xác thực." });
//       }
//       const maxAllowedRole = Math.max(...allowedRoles);
//       if (user.ma_vai_tro > maxAllowedRole) {
//         return res.status(403).json({ message: "Bạn không có quyền truy cập vào chức năng này." });
//       }
//       next();
//     };
//   },
// }));

import request from "supertest";
import { createApp } from "./helpers/app";
import staffOrderRouter from "../../routes/staffOrderRoute";
import { tokens, bearer } from "./helpers/tokens";

const app = createApp("/api/staff", staffOrderRouter);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeOrderList = () => ({
  data: [
    {
      id:           1,
      customerName: "Hoàng Gia Huy",
      totalAmount:  19000000,
      status:       "cho_xac_nhan",
      statusDisplay:"pending",
    },
  ],
  pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
});

const makeOrderDetail = () => ({
  id:             1,
  totalAmount:    19000000,
  status:         "cho_xac_nhan",
  statusDisplay:  "pending",
  customerName:   "Hoàng Gia Huy",
  items:          [{ productName: "iPhone 16", quantity: 1, price: 19000000 }],
});

// Các trạng thái hợp lệ của đơn hàng
const VALID_STATUSES = [
  "cho_xac_nhan",
  "da_xac_nhan",
  "dang_giao",
  "da_giao",
  "da_huy",
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Staff Order Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // ── GET /api/staff/orders ───────────────────────────────────────────────────

  describe("GET /api/staff/orders", () => {
    /**
     * Nhân viên bán hàng (role 6) — được phép truy cập.
     */
    it("200 — staff role (6) can access order list", async () => {
      mockStaffOrderSvc.getOrdersForProcessing.mockResolvedValue(makeOrderList());

      const res = await request(app)
        .get("/api/staff/orders")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.pagination).toBeDefined();
    });

    /**
     * Giám đốc (role 2 <= 6) — cũng được phép.
     */
    it("200 — director role (2) can also access order list", async () => {
      mockStaffOrderSvc.getOrdersForProcessing.mockResolvedValue(makeOrderList());

      const res = await request(app)
        .get("/api/staff/orders")
        .set("Authorization", bearer(tokens.director()));

      expect(res.status).toBe(200);
    });

    /**
     * Khách hàng (role 8 > 6) → roleMiddleware trả 403 Forbidden.
     */
    it("403 — customer role (8) is forbidden from staff routes", async () => {
      const res = await request(app)
        .get("/api/staff/orders")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(403);
      expect(mockStaffOrderSvc.getOrdersForProcessing).not.toHaveBeenCalled();
    });

    /**
     * Không có token → 401 trước khi đến role check.
     */
    it("401 — rejects unauthenticated request", async () => {
      const res = await request(app).get("/api/staff/orders");

      expect(res.status).toBe(401);
    });

    /**
     * Query params được truyền xuống service: status, keyword, page, limit.
     */
    it("200 — forwards filter query params to service", async () => {
      mockStaffOrderSvc.getOrdersForProcessing.mockResolvedValue(makeOrderList());

      await request(app)
        .get("/api/staff/orders?status=dang_giao&keyword=Huy&page=2&limit=5")
        .set("Authorization", bearer(tokens.staff()));

      expect(mockStaffOrderSvc.getOrdersForProcessing).toHaveBeenCalledWith(
        expect.objectContaining({
          status:  "dang_giao",
          keyword: "Huy",
          page:    expect.anything(),
          limit:   expect.anything(),
        })
      );
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockStaffOrderSvc.getOrdersForProcessing.mockRejectedValue(new Error("DB crash"));

      const res = await request(app)
        .get("/api/staff/orders")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(500);
    });
  });

  // ── GET /api/staff/orders/:id ───────────────────────────────────────────────

  describe("GET /api/staff/orders/:id", () => {
    /**
     * Trả chi tiết đơn hàng với staff token.
     * Controller wrap response trong { success: true, data: orderDetails },
     * nên truy cập qua res.body.data.
     */
    it("200 — returns order detail for staff", async () => {
      mockStaffOrderSvc.getOrderDetailsById.mockResolvedValue(makeOrderDetail());

      const res = await request(app)
        .get("/api/staff/orders/1")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);       // controller trả { success, data }
      expect(res.body.data.items).toBeDefined();
    });

    /**
     * orderId được lấy từ URL param, truyền đúng vào service.
     */
    it("200 — passes orderId from URL to service correctly", async () => {
      mockStaffOrderSvc.getOrderDetailsById.mockResolvedValue(makeOrderDetail());

      await request(app)
        .get("/api/staff/orders/99")
        .set("Authorization", bearer(tokens.staff()));

      expect(mockStaffOrderSvc.getOrderDetailsById).toHaveBeenCalledWith(99);
    });

    /**
     * Đơn không tồn tại — service throw "Không tìm thấy đơn hàng" → controller
     * hiện tại catch tất cả exception và trả 500.
     * Test document đúng behavior thực tế.
     * Muốn 404 thì cần thêm error handling vào staffOrderController.ts.
     */
    it("500 — returns 500 when order not found (controller lacks 404 handling)", async () => {
      mockStaffOrderSvc.getOrderDetailsById.mockRejectedValue(
        new Error("Không tìm thấy đơn hàng")
      );

      const res = await request(app)
        .get("/api/staff/orders/9999")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(500);
    });

    /**
     * Customer không được xem chi tiết đơn hàng của staff.
     */
    it("403 — customer cannot access staff order detail", async () => {
      const res = await request(app)
        .get("/api/staff/orders/1")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(403);
    });
  });

  // ── PATCH /api/staff/orders/:id/status ─────────────────────────────────────

  describe("PATCH /api/staff/orders/:id/status", () => {
    /**
     * Cập nhật trạng thái thành công — phải dùng PATCH (không phải PUT).
     * Controller trả { success: true, data: result } nên check res.body.data.message.
     */
    it("200 — updates order status with valid staff token", async () => {
      mockStaffOrderSvc.updateOrderStatus.mockResolvedValue({
        message: "Cập nhật trạng thái thành công",
      });

      const res = await request(app)
        .patch("/api/staff/orders/1/status")
        .set("Authorization", bearer(tokens.staff()))
        .send({ status: "da_xac_nhan" });

      expect(res.status).toBe(200);
      expect(res.body.data.message).toContain("thành công");
    });

    /**
     * Thiếu status trong body → controller hiện tại KHÔNG validate,
     * nên vẫn gọi service và trả 200.
     * Test document behavior thực tế. Muốn 400 cần thêm validation vào controller.
     */
    it("200 — passes through when status field is missing (no validation yet)", async () => {
      mockStaffOrderSvc.updateOrderStatus.mockResolvedValue({ message: "ok" });

      const res = await request(app)
        .patch("/api/staff/orders/1/status")
        .set("Authorization", bearer(tokens.staff()))
        .send({});

      expect(res.status).toBe(200);
    });

    /**
     * Trạng thái không hợp lệ → controller hiện tại KHÔNG validate giá trị status,
     * nên vẫn gọi service và trả 200.
     * Test document behavior thực tế.
     */
    it("200 — passes through invalid status value (no validation yet)", async () => {
      mockStaffOrderSvc.updateOrderStatus.mockResolvedValue({ message: "ok" });

      const res = await request(app)
        .patch("/api/staff/orders/1/status")
        .set("Authorization", bearer(tokens.staff()))
        .send({ status: "trang_thai_khong_ton_tai" });

      expect(res.status).toBe(200);
    });

    /**
     * Customer không được update status.
     */
    it("403 — customer cannot update order status", async () => {
      const res = await request(app)
        .patch("/api/staff/orders/1/status")
        .set("Authorization", bearer(tokens.customer()))
        .send({ status: "da_giao" });

      expect(res.status).toBe(403);
      expect(mockStaffOrderSvc.updateOrderStatus).not.toHaveBeenCalled();
    });

    /**
     * Không có token → 401.
     */
    it("401 — rejects unauthenticated update", async () => {
      const res = await request(app)
        .patch("/api/staff/orders/1/status")
        .send({ status: "da_giao" });

      expect(res.status).toBe(401);
    });
  });
});