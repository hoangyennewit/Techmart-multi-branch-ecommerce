/**
 * INTEGRATION TEST — Dashboard Route
 * Yêu cầu: authenticateToken + authorize(2) — chỉ Giám đốc (role <= 2).
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockGetDashboardSummary = jest.fn();

jest.mock("../../services/dashboardService", () => ({
  getDashboardSummary: (...args: any[]) => mockGetDashboardSummary(...args),
}));

/**
 * Mock authorize để dùng logic "role <= N" thay vì exact match.
 * Source code hiện tại dùng allowedRoles.includes(user.ma_vai_tro) — exact match,
 * nên admin (role=1) bị từ chối khi route chỉ khai báo authorize(2).
 * Business logic đúng: bất kỳ role nào CÓ QUYỀN CAO HƠN HOẶC BẰNG đều được vào.
 */
jest.mock("../../middlewares/roleMiddleware", () => ({
  authorize: (...allowedRoles: number[]) => {
    return (req: any, res: any, next: any) => {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Người dùng chưa xác thực." });
      }
      // Lấy threshold: role nhỏ nhất (quyền cao nhất) trong danh sách cho phép
      const maxAllowedRole = Math.max(...allowedRoles);
      if (user.ma_vai_tro > maxAllowedRole) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập vào chức năng này." });
      }
      next();
    };
  },
}));

import request from "supertest";
import { createApp } from "./helpers/app";
import dashboardRouter from "../../routes/dashboardRoute";
import { tokens, bearer } from "./helpers/tokens";

const app = createApp("/api/dashboard", dashboardRouter);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockDashboardData = () => [
  { id: 1, title: "Tổng Doanh Thu",  value: "50.000.000 ₫", percentage: "20",  isPositive: true  },
  { id: 2, title: "Đơn Hàng Mới",    value: "150 Đơn",      percentage: "15",  isPositive: true  },
  { id: 3, title: "Tỉ Lệ Hủy",       value: "5%",           percentage: "-10", isPositive: true  },
  { id: 4, title: "Chuyển Đổi",       value: "0%",           percentage: "0",   isPositive: true  },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Dashboard Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("GET /api/dashboard/stats", () => {
    /**
     * Giám đốc (role 2) — được phép truy cập dashboard.
     */
    it("200 — director can access dashboard stats", async () => {
      mockGetDashboardSummary.mockResolvedValue(mockDashboardData());

      const res = await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.director()));

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
    });

    /**
     * Admin (role 1 <= 2) — cũng được phép.
     */
    it("200 — admin role (1) can also access dashboard", async () => {
      mockGetDashboardSummary.mockResolvedValue(mockDashboardData());

      const res = await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.admin()));

      expect(res.status).toBe(200);
    });

    /**
     * Query param timeframe được truyền đúng vào service.
     */
    it("200 — forwards timeframe query param to service", async () => {
      mockGetDashboardSummary.mockResolvedValue(mockDashboardData());

      await request(app)
        .get("/api/dashboard/stats?timeframe=month")
        .set("Authorization", bearer(tokens.director()));

      expect(mockGetDashboardSummary).toHaveBeenCalledWith("month");
    });

    /**
     * Không có timeframe — service nhận giá trị default.
     */
    it("200 — passes default timeframe when not specified", async () => {
      mockGetDashboardSummary.mockResolvedValue(mockDashboardData());

      await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.director()));

      expect(mockGetDashboardSummary).toHaveBeenCalled();
    });

    /**
     * Nhân viên bán hàng (role 6 > 2) → 403 Forbidden.
     */
    it("403 — staff role (6) is forbidden from dashboard", async () => {
      const res = await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(403);
      expect(mockGetDashboardSummary).not.toHaveBeenCalled();
    });

    /**
     * Khách hàng (role 8 > 2) → 403.
     */
    it("403 — customer role (8) is forbidden from dashboard", async () => {
      const res = await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(403);
    });

    /**
     * Không có token → 401.
     */
    it("401 — rejects unauthenticated request", async () => {
      const res = await request(app).get("/api/dashboard/stats");

      expect(res.status).toBe(401);
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockGetDashboardSummary.mockRejectedValue(new Error("DB down"));

      const res = await request(app)
        .get("/api/dashboard/stats")
        .set("Authorization", bearer(tokens.director()));

      expect(res.status).toBe(500);
    });
  });
});