import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { getRevenueByTimeframe } from "../../src/services/statisticService";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeRevenueRow = (period: string, revenue: number | string) => ({
  period,
  revenue,
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("getRevenueByTimeframe", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  // ── Cấu trúc SQL ─────────────────────────────────────────────────────────────

  /**
   * Luôn chỉ lấy đơn da_giao (đã hoàn thành) — không tính đơn hủy hay đang xử lý.
   * Đây là điều kiện nền tảng của mọi timeframe.
   */
  it("always filters only 'da_giao' orders regardless of timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("year");

    const [queryStr] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(queryStr).toContain("trang_thai = 'da_giao'");
  });

  /**
   * Kết quả luôn dùng QueryTypes.SELECT.
   */
  it("uses QueryTypes.SELECT for all timeframes", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("month", 2024);

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.type).toBe(QueryTypes.SELECT);
  });

  // ── timeframe='year' ─────────────────────────────────────────────────────────

  /**
   * timeframe='year' — DATE_TRUNC('year'), không có filter năm cụ thể.
   */
  it("uses DATE_TRUNC year and no date filter for 'year' timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("year");

    const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(queryStr).toContain("DATE_TRUNC('year'");
    expect(options.replacements).not.toHaveProperty("startDate");
    expect(options.replacements).not.toHaveProperty("endDate");
  });

  // ── timeframe='month' ────────────────────────────────────────────────────────

  /**
   * timeframe='month' với year — DATE_TRUNC('month'), filter từ đầu đến cuối năm đó.
   */
  it("uses DATE_TRUNC month and year range filter for 'month' timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("month", 2024);

    const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(queryStr).toContain("DATE_TRUNC('month'");
    expect(options.replacements.startDate).toBe("2024-01-01 00:00:00");
    expect(options.replacements.endDate).toBe("2024-12-31 23:59:59");
  });

  /**
   * year được truyền dạng string (từ req.query) vẫn xử lý đúng.
   * req.query luôn là string, nên service phải chịu được "2024" thay vì 2024.
   */
  it("handles year as string (from req.query) for 'month' timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("month", "2023");

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements.startDate).toBe("2023-01-01 00:00:00");
    expect(options.replacements.endDate).toBe("2023-12-31 23:59:59");
  });

  /**
   * timeframe='month' nhưng không có year — không có filter ngày.
   */
  it("skips date filter for 'month' when year is not provided", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("month");

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements).not.toHaveProperty("startDate");
  });

  // ── timeframe='week' ─────────────────────────────────────────────────────────

  /**
   * timeframe='week' với year và month — DATE_TRUNC('week'),
   * filter từ đầu đến cuối tháng đó.
   */
  it("uses DATE_TRUNC week and month range filter for 'week' timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("week", 2024, 3); // tháng 3/2024

    const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(queryStr).toContain("DATE_TRUNC('week'");
    expect(options.replacements.startDate).toBe("2024-03-01 00:00:00");
    expect(options.replacements.endDate).toBe("2024-03-31 23:59:59");
  });

  /**
   * Tháng có số ngày khác nhau — tháng 2 của năm nhuận có 29 ngày.
   */
  it("calculates correct last day for February in leap year (2024)", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("week", 2024, 2);

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements.endDate).toBe("2024-02-29 23:59:59");
  });

  /**
   * Tháng 2 năm thường (không nhuận) có 28 ngày.
   */
  it("calculates correct last day for February in non-leap year (2023)", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("week", 2023, 2);

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements.endDate).toBe("2023-02-28 23:59:59");
  });

  /**
   * Tháng một chữ số phải được zero-pad: tháng 5 → "05", không phải "5".
   * Nếu không pad, SQL WHERE sẽ fail.
   */
  it("zero-pads single-digit month in date strings", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("week", 2024, 5);

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements.startDate).toBe("2024-05-01 00:00:00");
    expect(options.replacements.endDate).toContain("2024-05-");
  });

  /**
   * year và month là string (từ req.query) — vẫn tính ngày đúng.
   */
  it("handles year and month as strings for 'week' timeframe", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    await getRevenueByTimeframe("week", "2024", "6");

    const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
    expect(options.replacements.startDate).toBe("2024-06-01 00:00:00");
    expect(options.replacements.endDate).toBe("2024-06-30 23:59:59");
  });

  // ── Format kết quả trả về ───────────────────────────────────────────────────

  /**
   * revenue từ DB là string (Postgres SUM/COUNT trả string) — phải được ép về Number.
   */
  it("converts revenue string from DB to Number", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([
      makeRevenueRow("2024-01-01T00:00:00.000Z", "5000000"),
    ]);

    const result = await getRevenueByTimeframe("month", 2024);

    expect(typeof result[0].revenue).toBe("number");
    expect(result[0].revenue).toBe(5000000);
  });

  /**
   * revenue = null hoặc undefined từ DB → fallback về 0.
   */
  it("falls back to 0 when DB returns null revenue", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([
      makeRevenueRow("2024-01-01T00:00:00.000Z", null),
    ]);

    const result = await getRevenueByTimeframe("month", 2024);

    expect(result[0].revenue).toBe(0);
  });

  /**
   * Nhiều kết quả trả về — tất cả đều được map đúng.
   */
  it("maps all rows correctly when multiple periods returned", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([
      makeRevenueRow("2024-01-01", "1000000"),
      makeRevenueRow("2024-02-01", "2000000"),
      makeRevenueRow("2024-03-01", "3000000"),
    ]);

    const result = await getRevenueByTimeframe("month", 2024);

    expect(result).toHaveLength(3);
    expect(result[0].revenue).toBe(1000000);
    expect(result[2].revenue).toBe(3000000);
  });

  /**
   * Không có đơn nào trong kỳ — trả [] không throw.
   */
  it("returns empty array when no revenue data found", async () => {
    (sequelize.query as jest.Mock).mockResolvedValue([]);

    const result = await getRevenueByTimeframe("year");

    expect(result).toEqual([]);
  });

  /**
   * period được giữ nguyên từ DB — không được biến đổi.
   */
  it("preserves period value from DB without modification", async () => {
    const periodValue = "2024-06-01T00:00:00.000Z";
    (sequelize.query as jest.Mock).mockResolvedValue([
      makeRevenueRow(periodValue, "1500000"),
    ]);

    const result = await getRevenueByTimeframe("month", 2024);

    expect(result[0].period).toBe(periodValue);
  });

  /**
   * DB lỗi — bubble up exception.
   */
  it("propagates DB error", async () => {
    (sequelize.query as jest.Mock).mockRejectedValue(new Error("query failed"));

    await expect(getRevenueByTimeframe("year")).rejects.toThrow("query failed");
  });
});