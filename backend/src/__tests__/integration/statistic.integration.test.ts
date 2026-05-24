/**
 * INTEGRATION TEST — Statistic Route
 * Yêu cầu: authenticateToken + authorize(2) — chỉ Giám đốc.
 * Tập trung kiểm tra query params (timeframe, year, month) được truyền đúng.
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockGetRevenueByTimeframe = jest.fn();

jest.mock("../../services/statisticService", () => ({
  getRevenueByTimeframe: (...args: any[]) => mockGetRevenueByTimeframe(...args),
}));

/**
 * Mock authorize để dùng logic "role <= N".
 */
jest.mock("../../middlewares/roleMiddleware", () => ({
  authorize: (...allowedRoles: number[]) => {
    return (req: any, res: any, next: any) => {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Người dùng chưa xác thực." });
      }
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
import statisticRouter from "../../routes/statisticRoute";
import { tokens, bearer } from "./helpers/tokens";

const app = createApp("/api/statistics", statisticRouter);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockRevenueData = () => [
  { period: "2024-01-01T00:00:00.000Z", revenue: 15000000 },
  { period: "2024-02-01T00:00:00.000Z", revenue: 22000000 },
  { period: "2024-03-01T00:00:00.000Z", revenue: 18000000 },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Statistic Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("GET /api/statistics/revenue", () => {
    /**
     * Giám đốc truy cập doanh thu theo năm — happy path.
     */
    it("200 — director can access revenue stats", async () => {
      mockGetRevenueByTimeframe.mockResolvedValue(mockRevenueData());

      const res = await request(app)
        .get("/api/statistics/revenue?timeframe=month&year=2024")
        .set("Authorization", bearer(tokens.director()));

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(3);
    });

    /**
     * timeframe=month và year được truyền đúng vào service.
     * Controller dùng parseInt(year) → number, và fallback month về tháng hiện tại.
     * Test kiểm tra year=2024 (number) và month là số nguyên dương.
     */
    it("200 — passes timeframe=month and year to service", async () => {
      mockGetRevenueByTimeframe.mockResolvedValue([]);

      await request(app)
        .get("/api/statistics/revenue?timeframe=month&year=2024")
        .set("Authorization", bearer(tokens.director()));

      expect(mockGetRevenueByTimeframe).toHaveBeenCalledWith(
        "month",
        2024,                        // parseInt("2024") → number
        expect.any(Number)           // fallback: new Date().getMonth() + 1
      );
    });

    /**
     * timeframe=week cần thêm month — cả 3 tham số được truyền đúng.
     */
    it("200 — passes timeframe=week, year, and month to service", async () => {
      mockGetRevenueByTimeframe.mockResolvedValue([]);

      await request(app)
        .get("/api/statistics/revenue?timeframe=week&year=2024&month=6")
        .set("Authorization", bearer(tokens.director()));

      expect(mockGetRevenueByTimeframe).toHaveBeenCalledWith(
        "week",
        2024, // parseInt("2024")
        6     // parseInt("6")
      );
    });

    /**
     * timeframe=year — controller vẫn fallback year/month về giá trị hiện tại.
     */
    it("200 — handles timeframe=year without additional params", async () => {
      mockGetRevenueByTimeframe.mockResolvedValue([]);

      await request(app)
        .get("/api/statistics/revenue?timeframe=year")
        .set("Authorization", bearer(tokens.director()));

      expect(mockGetRevenueByTimeframe).toHaveBeenCalledWith(
        "year",
        expect.any(Number), // fallback: new Date().getFullYear()
        expect.any(Number)  // fallback: new Date().getMonth() + 1
      );
    });

    /**
     * Response trả về array với đúng cấu trúc { period, revenue }.
     */
    it("200 — response has correct period and revenue structure", async () => {
      mockGetRevenueByTimeframe.mockResolvedValue(mockRevenueData());

      const res = await request(app)
        .get("/api/statistics/revenue?timeframe=month&year=2024")
        .set("Authorization", bearer(tokens.director()));

      expect(res.body[0]).toHaveProperty("period");
      expect(res.body[0]).toHaveProperty("revenue");
      expect(typeof res.body[0].revenue).toBe("number");
    });

    /**
     * Nhân viên (role 6 > 2) → 403.
     */
    it("403 — staff cannot access revenue statistics", async () => {
      const res = await request(app)
        .get("/api/statistics/revenue")
        .set("Authorization", bearer(tokens.staff()));

      expect(res.status).toBe(403);
      expect(mockGetRevenueByTimeframe).not.toHaveBeenCalled();
    });

    /**
     * Khách hàng → 403.
     */
    it("403 — customer cannot access revenue statistics", async () => {
      const res = await request(app)
        .get("/api/statistics/revenue")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(403);
    });

    /**
     * Không có token → 401.
     */
    it("401 — rejects unauthenticated request", async () => {
      const res = await request(app).get("/api/statistics/revenue");

      expect(res.status).toBe(401);
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockGetRevenueByTimeframe.mockRejectedValue(new Error("query failed"));

      const res = await request(app)
        .get("/api/statistics/revenue")
        .set("Authorization", bearer(tokens.director()));

      expect(res.status).toBe(500);
    });
  });
});