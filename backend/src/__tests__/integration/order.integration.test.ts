/**
 * INTEGRATION TEST — Order Routes
 * Tất cả route order đều yêu cầu xác thực (authenticateToken).
 * Kiểm tra: auth middleware, tạo đơn hàng, lấy lịch sử.
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockOrderSvc = {
  createOrder:        jest.fn(),
  getMyOrdersService: jest.fn(),
};

jest.mock("../../services/orderService", () => ({
  OrderService: jest.fn(() => mockOrderSvc),
}));

// Mock payment services được inject vào OrderService
jest.mock("../../services/payment/codService",   () => ({ CODService:   jest.fn(() => ({})) }));
jest.mock("../../services/payment/vnpayService", () => ({ VNPayService: jest.fn(() => ({})) }));

import request from "supertest";
import { createApp } from "./helpers/app";
import orderRouter from "../../routes/orderRoute";
import { tokens, bearer } from "./helpers/tokens";

const app = createApp("/api/orders", orderRouter);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const validOrderBody = () => ({
  items: [
    { id: 1, quantity: 1, price: 20000000 },
    { id: 3, quantity: 2, price: 15000000 },
  ],
  totalAmount: 50000000,
  shippingFee: 30000,
  shippingInfo: {
    fullName: "Hoàng Gia Huy",
    phone:    "0912345678",
    address:  "123 Nguyễn Trãi, TP.HCM",
    note:     "Giao buổi sáng",
  },
});

const makeOrder = (id = 1) => ({
  id,
  totalAmount: 50000000,
  status:      "pending",
  createdAt:   "2024-01-01T00:00:00.000Z",
  items:       [{ productName: "iPhone 16", quantity: 1, price: 20000000 }],
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Order Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // ── POST /api/orders ────────────────────────────────────────────────────────

  describe("POST /api/orders", () => {
    /**
     * Tạo đơn hàng thành công — phải có token, trả 201 với orderId.
     */
    it("201 — creates order successfully with valid auth", async () => {
      mockOrderSvc.createOrder.mockResolvedValue(42);

      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", bearer(tokens.customer()))
        .send(validOrderBody());

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("orderId", 42);
    });

    /**
     * Không có token → authMiddleware trả 401, service không được gọi.
     */
    it("401 — rejects request with no auth token", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send(validOrderBody());

      expect(res.status).toBe(401);
      expect(mockOrderSvc.createOrder).not.toHaveBeenCalled();
    });

    /**
     * Token không hợp lệ → createApp auth middleware trả 401
     * (authMiddleware gốc trả 403 — đây là behavior đúng theo HTTP spec).
     */
    it("401 — rejects invalid token", async () => {
      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", "Bearer invalid.token.here")
        .send(validOrderBody());

      expect(res.status).toBe(401);
    });

    /**
     * Thiếu items trong body → 400.
     */
    it("400 — rejects order with missing items", async () => {
      const { items: _, ...bodyWithoutItems } = validOrderBody();

      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", bearer(tokens.customer()))
        .send(bodyWithoutItems);

      expect(res.status).toBe(400);
    });

    /**
     * Thiếu shippingInfo → controller hiện tại KHÔNG validate shippingInfo,
     * nên order vẫn được tạo thành công (201).
     * Test này document đúng behavior thực tế — nếu muốn 400 thì cần thêm
     * validation vào orderController.ts.
     */
    it("201 — creates order even when shippingInfo is missing (no validation yet)", async () => {
      mockOrderSvc.createOrder.mockResolvedValue(43);
      const { shippingInfo: _, ...bodyWithoutShipping } = validOrderBody();

      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", bearer(tokens.customer()))
        .send(bodyWithoutShipping);

      expect(res.status).toBe(201);
    });

    /**
     * Service throw (VD: transaction fail) → 500.
     */
    it("500 — returns 500 when order creation fails", async () => {
      mockOrderSvc.createOrder.mockRejectedValue(new Error("transaction failed"));

      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", bearer(tokens.customer()))
        .send(validOrderBody());

      expect(res.status).toBe(500);
    });
  });

  // ── GET /api/orders/my-orders ───────────────────────────────────────────────

  describe("GET /api/orders/my-orders", () => {
    /**
     * Trả lịch sử đơn hàng của đúng user trong token.
     */
    it("200 — returns order history for authenticated user", async () => {
      mockOrderSvc.getMyOrdersService.mockResolvedValue([makeOrder(1), makeOrder(2)]);

      const res = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    /**
     * User chưa có đơn hàng — trả 200 với [].
     */
    it("200 — returns empty array when user has no orders", async () => {
      mockOrderSvc.getMyOrdersService.mockResolvedValue([]);

      const res = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    /**
     * userId được lấy từ JWT payload, không phải từ query string.
     * Đảm bảo user không thể xem đơn của người khác bằng cách truyền userId.
     */
    it("200 — uses userId from JWT payload, not from query string", async () => {
      mockOrderSvc.getMyOrdersService.mockResolvedValue([]);

      await request(app)
        .get("/api/orders/my-orders?userId=999") // userId=999 phải bị bỏ qua
        .set("Authorization", bearer(tokens.customer())); // token chứa id=11

      expect(mockOrderSvc.getMyOrdersService).toHaveBeenCalledWith(11);
    });

    /**
     * Không có token → 401.
     */
    it("401 — rejects unauthenticated request", async () => {
      const res = await request(app).get("/api/orders/my-orders");

      expect(res.status).toBe(401);
      expect(mockOrderSvc.getMyOrdersService).not.toHaveBeenCalled();
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockOrderSvc.getMyOrdersService.mockRejectedValue(new Error("DB timeout"));

      const res = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(500);
    });
  });
});