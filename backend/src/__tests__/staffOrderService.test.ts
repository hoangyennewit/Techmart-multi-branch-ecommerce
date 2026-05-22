import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { StaffOrderService } from "../../src/services/staff/staffOrderService";


// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeOrder = (overrides = {}) => ({
  id: 1,
  customerName: "Hoàng Gia Huy",
  totalAmount: 19000000,
  status: "cho_xac_nhan",
  createdAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

const makeOrderDetail = (overrides = {}) => ({
  id: 1,
  totalAmount: 19000000,
  status: "cho_xac_nhan",
  createdAt: "2024-01-01T00:00:00.000Z",
  customerName: "Hoàng Gia Huy",
  phone: "0912345678",
  ten_nguoi_nhan: "Hoàng Gia Huy",
  dia_chi_giao_hang: "123 Nguyễn Trãi, TP.HCM",
  ghi_chu: "",
  ...overrides,
});

const makeItem = (overrides = {}) => ({
  productId: 1,
  productName: "iPhone 16 128GB",
  quantity: 1,
  price: 19000000,
  subTotal: 19000000,
  ...overrides,
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("StaffOrderService", () => {
  let service: StaffOrderService;

  beforeEach(() => {
    service = new StaffOrderService();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  // ── getOrdersForProcessing ──────────────────────────────────────────────────

  describe("getOrdersForProcessing", () => {
    /**
     * Không có filter nào — query không có WHERE clause,
     * LIMIT và OFFSET là 2 bind param cuối.
     */
    it("returns all orders with pagination when no filters applied", async () => {
      const orders = [makeOrder()];
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce(orders)               // SELECT orders
        .mockResolvedValueOnce([{ total: "25" }]);   // COUNT

      const result = await service.getOrdersForProcessing({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(result.pagination).toMatchObject({
        total: 25,
        page: 1,
        limit: 10,
        totalPages: 3, // ceil(25/10)
      });
    });

    /**
     * Query không có filter → không được có WHERE clause.
     * Bind params chỉ có [limit, offset].
     */
    it("omits WHERE clause and binds only [limit, offset] when no filters given", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      await service.getOrdersForProcessing({ page: 2, limit: 5 });

      const [orderQuery, orderOptions] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(orderQuery).not.toContain("WHERE");
      // page=2, limit=5 → offset=5
      expect(orderOptions.bind).toEqual([5, 5]); // [limit, offset]
    });

    /**
     * Filter theo status — WHERE dh.trang_thai = $1,
     * bind params = [status, limit, offset].
     */
    it("adds status filter to WHERE clause", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

    //   await service.getOrdersForProcessing({ status: "dang_giao", page: 1, limit: 10 });
      await service.getOrdersForProcessing({ status: "dang_giao" as any, page: 1, limit: 10 });

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("dh.trang_thai = $1");
      expect(options.bind[0]).toBe("dang_giao");
    });

    /**
     * Filter theo keyword — ILIKE với %keyword%.
     * Bind params = [%keyword%, limit, offset].
     */
    it("adds keyword filter with ILIKE pattern", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      await service.getOrdersForProcessing({ keyword: "Huy", page: 1, limit: 10 });

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("ILIKE");
      expect(options.bind[0]).toBe("%Huy%");
    });

    /**
     * Cả status lẫn keyword — WHERE có AND giữa 2 điều kiện.
     * Thứ tự bind: [status, %keyword%, limit, offset].
     */
    it("combines status AND keyword filters correctly", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      await service.getOrdersForProcessing({
        status: "da_giao" as any,
        keyword: "Linh",
        page: 1,
        limit: 10,
      });

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("WHERE");
      expect(queryStr).toContain("AND");
      expect(options.bind[0]).toBe("da_giao");
      expect(options.bind[1]).toBe("%Linh%");
    });

    /**
     * Offset tính đúng: offset = (page - 1) * limit.
     * page=3, limit=10 → offset=20.
     */
    it("calculates offset correctly for page 3", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      await service.getOrdersForProcessing({ page: 3, limit: 10 });

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      const bindParams = options.bind;
      // bind cuối cùng là [limit=10, offset=20]
      expect(bindParams[bindParams.length - 2]).toBe(10);
      expect(bindParams[bindParams.length - 1]).toBe(20);
    });

    /**
     * totalPages = ceil(total / limit).
     * 25 đơn, limit=10 → 3 trang.
     * 20 đơn, limit=10 → 2 trang.
     * 1 đơn, limit=10 → 1 trang.
     */
    it.each([
      [25, 10, 3],
      [20, 10, 2],
      [1,  10, 1],
      [0,  10, 0],
    ])("calculates totalPages correctly: %i items / %i per page = %i pages", async (total, limit, expectedPages) => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: String(total) }]);

      const result = await service.getOrdersForProcessing({ page: 1, limit });

      expect(result.pagination.totalPages).toBe(expectedPages);
    });

    /**
     * Mỗi order được gắn thêm statusDisplay sau khi map.
     * FE dùng statusDisplay để hiển thị badge màu.
     */
    it("maps statusDisplay onto each returned order", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrder({ status: "dang_giao" })])
        .mockResolvedValueOnce([{ total: "1" }]);

      const result = await service.getOrdersForProcessing({ page: 1, limit: 10 });

      expect(result.data[0].statusDisplay).toBe("shipping");
    });

    /**
     * Count query nhận đúng bindParams (không có limit/offset)
     * để tính tổng số đơn đúng.
     */
    it("passes filter-only bind params (without limit/offset) to count query", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      await service.getOrdersForProcessing({ status: "da_giao" as any, page: 1, limit: 10 });

      const [, countOptions] = (sequelize.query as jest.Mock).mock.calls[1];
      // Count query chỉ nhận [status], không có limit/offset
      expect(countOptions.bind).toEqual(["da_giao"]);
    });

    /**
     * Không có đơn nào — data=[], total=0, pagination đúng.
     */
    it("returns empty data with correct pagination when no orders found", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ total: "0" }]);

      const result = await service.getOrdersForProcessing({ page: 1, limit: 10 });

      expect(result.data).toEqual([]);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    /**
     * DB lỗi — bubble up.
     */
    it("propagates DB error", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB crash"));

      await expect(
        service.getOrdersForProcessing({ page: 1, limit: 10 })
      ).rejects.toThrow("DB crash");
    });
  });

  // ── getOrderDetailsById ─────────────────────────────────────────────────────

  describe("getOrderDetailsById", () => {
    /**
     * Happy path — trả đơn hàng kèm items và statusDisplay.
     */
    it("returns order detail with items and statusDisplay", async () => {
      const items = [makeItem(), makeItem({ productId: 2, productName: "Ốp lưng" })];
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrderDetail()])  // [order] destructure
        .mockResolvedValueOnce(items);               // items array

      const result = await service.getOrderDetailsById(1);

      expect(result.id).toBe(1);
      expect(result.items).toHaveLength(2);
      expect(result.statusDisplay).toBe("pending");
    });

    /**
     * Query đơn hàng phải filter đúng orderId qua bind param.
     * Sai orderId → trả thông tin của đơn khác.
     */
    it("queries order with the exact orderId as bind param", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrderDetail({ id: 99 })])
        .mockResolvedValueOnce([]);

      await service.getOrderDetailsById(99);

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.bind).toEqual([99]);
    });

    /**
     * Đơn không tồn tại — query trả [] nên [order] = undefined → throw.
     * Controller bắt lỗi này để trả 404.
     */
    it("throws 'Không tìm thấy đơn hàng' when order does not exist", async () => {
      (sequelize.query as jest.Mock).mockResolvedValueOnce([]); // empty → order=undefined

      await expect(service.getOrderDetailsById(9999)).rejects.toThrow(
        "Không tìm thấy đơn hàng"
      );
    });

    /**
     * Đơn không có sản phẩm — items = [].
     */
    it("returns empty items array when order has no products", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrderDetail()])
        .mockResolvedValueOnce([]);

      const result = await service.getOrderDetailsById(1);

      expect(result.items).toEqual([]);
    });

    /**
     * statusDisplay được tính đúng từ status của đơn.
     */
    it.each([
      ["cho_xac_nhan", "pending"],
      ["da_xac_nhan",  "processing"],
      ["dang_giao",    "shipping"],
      ["da_giao",      "delivered"],
      ["da_huy",       "cancelled"],
    ])("sets statusDisplay='%s' for status='%s'", async (status, display) => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrderDetail({ status })])
        .mockResolvedValueOnce([]);

      const result = await service.getOrderDetailsById(1);

      expect(result.statusDisplay).toBe(display);
    });

    /**
     * DB lỗi — bubble up.
     */
    it("propagates DB error", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("timeout"));

      await expect(service.getOrderDetailsById(1)).rejects.toThrow("timeout");
    });
  });

  // ── updateOrderStatus ───────────────────────────────────────────────────────

  describe("updateOrderStatus", () => {
    /**
     * Happy path — UPDATE thành công, trả message xác nhận.
     */
    it("returns success message after updating status", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.updateOrderStatus(1, { status: "da_xac_nhan" as any });

      expect(result).toEqual({ message: "Cập nhật trạng thái thành công" });
    });

    /**
     * Bind params đúng thứ tự: [$1=status, $2=orderId].
     * Sai thứ tự → UPDATE nhầm đơn hoặc set sai trạng thái.
     */
    it("binds [status, orderId] in correct order", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.updateOrderStatus(42, { status: "dang_giao" as any });

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("UPDATE don_hang");
      expect(queryStr).toContain("trang_thai = $1");
      expect(queryStr).toContain("ma_don_hang = $2");
      expect(options.bind).toEqual(["dang_giao", 42]);
    });

    /**
     * Dùng QueryTypes.UPDATE — nếu dùng SELECT sẽ không chạy được UPDATE.
     */
    it("uses QueryTypes.UPDATE", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.updateOrderStatus(1, { status: "da_giao" as any });

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.type).toBe(QueryTypes.UPDATE);
    });

    /**
     * DB lỗi — bubble up.
     */
    it("propagates DB error", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("lock timeout"));

      await expect(
        service.updateOrderStatus(1, { status: "da_giao" as any })
      ).rejects.toThrow("lock timeout");
    });
  });
});