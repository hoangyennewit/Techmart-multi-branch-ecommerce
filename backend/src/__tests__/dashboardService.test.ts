import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { getDashboardSummary } from "../../src/services/dashboardService";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * getDashboardSummary thực hiện đúng 6 query theo thứ tự:
 * 1. revenue current   2. revenue previous
 * 3. orders  current   4. orders  previous
 * 5. cancels current   6. cancels previous
 */
const mockSixQueries = (
  revC: string,
  revP: string,
  ordC: string,
  ordP: string,
  canC: string,
  canP: string
) => {
  (sequelize.query as jest.Mock)
    .mockResolvedValueOnce([{ total: revC }])
    .mockResolvedValueOnce([{ total: revP }])
    .mockResolvedValueOnce([{ total: ordC }])
    .mockResolvedValueOnce([{ total: ordP }])
    .mockResolvedValueOnce([{ total: canC }])
    .mockResolvedValueOnce([{ total: canP }]);
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("getDashboardSummary", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  // ── Cấu trúc kết quả trả về ─────────────────────────────────────────────────

  /**
   * Luôn trả về đúng 4 card metrics với id 1-4.
   */
  it("always returns exactly 4 metric cards with ids 1-4", async () => {
    mockSixQueries("1000000", "800000", "50", "40", "5", "4");

    const result = await getDashboardSummary("month");

    expect(result).toHaveLength(4);
    expect(result.map((r: any) => r.id)).toEqual([1, 2, 3, 4]);
  });

  /**
   * 4 card phải có đúng tiêu đề tiếng Việt.
   */
  it("returns cards with correct Vietnamese titles", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    const result = await getDashboardSummary("year");

    const titles = result.map((r: any) => r.title);
    expect(titles).toContain("Tổng Doanh Thu");
    expect(titles).toContain("Đơn Hàng Mới");
    expect(titles).toContain("Tỉ Lệ Hủy");
    expect(titles).toContain("Chuyển Đổi");
  });

  // ── Tính toán doanh thu ──────────────────────────────────────────────────────

  /**
   * Doanh thu được format theo locale vi-VN với ký hiệu ₫.
   * 1.000.000 ₫ không phải 1,000,000 ₫ hay 1000000₫.
   */
  it("formats revenue in Vietnamese locale with ₫ symbol", async () => {
    mockSixQueries("1000000", "800000", "10", "8", "1", "1");

    const result = await getDashboardSummary("month");
    const revenueCard = result[0];

    expect(revenueCard.value).toContain("₫");
    expect(revenueCard.value).toContain("1.000.000");
  });

  /**
   * isPositive = true khi doanh thu hiện tại >= kỳ trước.
   */
  it("sets isPositive=true for revenue when current >= previous", async () => {
    mockSixQueries("1200000", "1000000", "10", "8", "1", "1");

    const result = await getDashboardSummary("month");

    expect(result[0].isPositive).toBe(true);
  });

  /**
   * isPositive = false khi doanh thu hiện tại < kỳ trước.
   */
  it("sets isPositive=false for revenue when current < previous", async () => {
    mockSixQueries("800000", "1000000", "10", "10", "1", "1");

    const result = await getDashboardSummary("month");

    expect(result[0].isPositive).toBe(false);
  });

  // ── calcPercent logic ────────────────────────────────────────────────────────

  /**
   * Kỳ trước = 0, kỳ hiện tại > 0 → 100% tăng trưởng (không thể chia cho 0).
   */
  it("returns 100% when previous is 0 and current > 0", async () => {
    mockSixQueries("1000000", "0", "10", "0", "0", "0");

    const result = await getDashboardSummary("month");

    expect(result[0].percentage).toBe("100");
  });

  /**
   * Cả hai kỳ = 0 → 0% (không chia cho 0).
   */
  it("returns 0% when both current and previous are 0", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    const result = await getDashboardSummary("month");

    expect(result[0].percentage).toBe("0");
    expect(result[1].percentage).toBe("0");
  });

  /**
   * Tăng trưởng dương: current=150, previous=100 → +50%.
   */
  it("calculates positive growth percentage correctly", async () => {
    mockSixQueries("0", "0", "150", "100", "0", "0");

    const result = await getDashboardSummary("month");
    const ordersCard = result[1];

    expect(ordersCard.percentage).toBe("50");
  });

  /**
   * Tăng trưởng âm: current=80, previous=100 → -20%.
   */
  it("calculates negative growth percentage correctly", async () => {
    mockSixQueries("0", "0", "80", "100", "0", "0");

    const result = await getDashboardSummary("month");

    expect(result[1].percentage).toBe("-20");
  });

  // ── Tỉ lệ hủy ───────────────────────────────────────────────────────────────

  /**
   * cancelRate = round(canC / (ordC + canC) * 100).
   * 5 hủy / (45 + 5) tổng = 10%.
   */
  it("calculates cancel rate correctly", async () => {
    mockSixQueries("0", "0", "45", "40", "5", "4");

    const result = await getDashboardSummary("month");
    const cancelCard = result[2];

    expect(cancelCard.value).toBe("10%");
  });

  /**
   * Không có đơn nào → tỉ lệ hủy = 0%, không chia cho 0.
   */
  it("returns 0% cancel rate when there are no orders", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    const result = await getDashboardSummary("month");

    expect(result[2].value).toBe("0%");
  });

  /**
   * isPositive cho tỉ lệ hủy NGƯỢC chiều — tỉ lệ hủy THẤP HƠN là tốt.
   * cancelRateC=5 <= cancelRateP=10 → isPositive=true.
   */
  it("sets isPositive=true for cancel rate when rate decreased (lower is better)", async () => {
    // kỳ này: 5/(95+5)=5%,  kỳ trước: 10/(90+10)=10%
    mockSixQueries("0", "0", "95", "90", "5", "10");

    const result = await getDashboardSummary("month");

    expect(result[2].isPositive).toBe(true);
  });

  /**
   * Tỉ lệ hủy tăng lên → isPositive=false (xấu đi).
   */
  it("sets isPositive=false for cancel rate when rate increased", async () => {
    // kỳ này: 20/(80+20)=20%, kỳ trước: 5/(95+5)=5%
    mockSixQueries("0", "0", "80", "95", "20", "5");

    const result = await getDashboardSummary("month");

    expect(result[2].isPositive).toBe(false);
  });

  // ── Timeframe ────────────────────────────────────────────────────────────────

  /**
   * timeframe='month' — dùng đầu tháng hiện tại làm startCurrent.
   */
  it("queries DB 6 times for 'month' timeframe", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    await getDashboardSummary("month");

    expect(sequelize.query).toHaveBeenCalledTimes(6);
  });

  /**
   * timeframe='last_year' — cũng thực hiện đủ 6 query.
   */
  it("queries DB 6 times for 'last_year' timeframe", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    await getDashboardSummary("last_year");

    expect(sequelize.query).toHaveBeenCalledTimes(6);
  });

  /**
   * timeframe không hợp lệ → fallback về 'year', vẫn chạy được.
   */
  it("falls back to 'year' logic for unknown timeframe", async () => {
    mockSixQueries("0", "0", "0", "0", "0", "0");

    await expect(getDashboardSummary("invalid_value")).resolves.toHaveLength(4);
  });

  /**
   * DB lỗi — bubble up exception.
   */
  it("propagates DB error", async () => {
    (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB down"));

    await expect(getDashboardSummary("month")).rejects.toThrow("DB down");
  });

  /**
   * Card "Chuyển Đổi" luôn là 0% vì chưa có bảng lượt truy cập.
   */
  it("always returns 0% for Chuyển Đổi card (id=4)", async () => {
    mockSixQueries("500000", "400000", "30", "20", "3", "2");

    const result = await getDashboardSummary("month");
    const conversionCard = result[3];

    expect(conversionCard.id).toBe(4);
    expect(conversionCard.value).toBe("0%");
    expect(conversionCard.percentage).toBe("0");
    expect(conversionCard.isPositive).toBe(true);
  });
});