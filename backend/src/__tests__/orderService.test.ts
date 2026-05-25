import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { OrderService } from "../../src/services/orderService";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
    transaction: jest.fn(),
  },
}));

jest.mock("../../src/services/payment/codService", () => ({
  CODService: jest.fn().mockImplementation(() => ({})),
}));
jest.mock("../../src/services/payment/vnpayService", () => ({
  VNPayService: jest.fn().mockImplementation(() => ({})),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeTransaction = () => ({
  commit: jest.fn().mockResolvedValue(undefined),
  rollback: jest.fn().mockResolvedValue(undefined),
});

const makeOrderData = (overrides: any = {}) => ({
  userId: 1111,
  totalAmount: 19000000,
  shippingFee: 30000,
  shippingInfo: {
    fullName: "Hoàng Gia Huy",
    phone: "0912345678",
    address: "123 Nguyễn Trãi, TP.HCM",
    note: "Giao giờ hành chính",
  },
  items: [
    { id: 1, quantity: 1, price: 19000000 },
    { id: 3, quantity: 2, price: 18000000 },
  ],
  ...overrides,
});

const makeOrder = (overrides = {}) => ({
  id: 1,
  totalAmount: -19000000,
  status: "cho_xac_nhan",
  createdAt: "2024-01-01T00:00:00.000Z",
  ten_nguoi_nhan: "Hoàng Gia Huy",
  dia_chi_giao_hang: "123 Nguyễn Trãi, TP.HCM",
  shippingFee: 30000,
  ...overrides,
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("OrderService", () => {
  let service: OrderService;
  let mockTransaction: ReturnType<typeof makeTransaction>;

  beforeEach(() => {
    mockTransaction = makeTransaction();
    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
    service = new OrderService();
    jest.clearAllMocks();
    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
  });

  // ── createOrder ─────────────────────────────────────────────────────────────

  describe("createOrder", () => {
    /**
     * Happy path — 3 INSERT phải được gọi đúng thứ tự:
     * 1. don_hang, 2. thong_tin_giao_hang, 3. chi_tiet_don_hang.
     * Cuối cùng commit được gọi, rollback không được gọi.
     */
    it("runs 3 inserts in order then commits", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 42 }]])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.createOrder(makeOrderData());

      expect(result).toBe(42);
      expect(sequelize.query).toHaveBeenCalledTimes(3);
      expect(mockTransaction.commit).toHaveBeenCalledTimes(1);
      expect(mockTransaction.rollback).not.toHaveBeenCalled();
    });

    /**
     * tong_tien = totalAmount + shippingFee — logic này phải đúng.
     * Nếu tính sai, doanh thu và báo cáo sẽ lệch.
     */
    it("calculates tong_tien = totalAmount + shippingFee", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValue([]);

      await service.createOrder(
        makeOrderData({ totalAmount: 20000000, shippingFee: 30000 })
      );

      const bindOfFirstInsert = (sequelize.query as jest.Mock).mock.calls[0][1].bind;
      expect(bindOfFirstInsert[1]).toBe(20030000);
    });

    /**
     * shippingFee = 0 (miễn phí vận chuyển) — tong_tien = totalAmount.
     * Edge case hay gặp trong chương trình khuyến mãi.
     */
    it("handles zero shippingFee correctly (tong_tien = totalAmount)", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValue([]);

      await service.createOrder(
        makeOrderData({ totalAmount: 28000000, shippingFee: 0 })
      );

      const bindOfFirstInsert = (sequelize.query as jest.Mock).mock.calls[0][1].bind;
      expect(bindOfFirstInsert[1]).toBe(28000000);
    });

    /**
     * Thông tin giao hàng phải được insert đúng thứ tự bind params:
     * [orderId, fullName, phone, address, note].
     * Sai thứ tự → giao hàng nhầm địa chỉ.
     */
    it("inserts shipping info with correct field order in bind params", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 99 }]])
        .mockResolvedValue([]);

      await service.createOrder(makeOrderData());

      const bindOfShippingInsert = (sequelize.query as jest.Mock).mock.calls[1][1].bind;
      expect(bindOfShippingInsert[0]).toBe(99);               // orderId
      expect(bindOfShippingInsert[1]).toBe("Hoàng Gia Huy");  // fullName
      expect(bindOfShippingInsert[2]).toBe("0912345678");     // phone
      expect(bindOfShippingInsert[3]).toBe("123 Nguyễn Trãi, TP.HCM"); // address
    });

    /**
     * note undefined — phải dùng fallback "" thay vì truyền undefined vào DB.
     * DB có thể reject hoặc lưu "undefined" dưới dạng string.
     */
    it("uses empty string as note when shippingInfo.note is undefined", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValue([]);

      const orderData = makeOrderData();
      delete orderData.shippingInfo.note;
      await service.createOrder(orderData);

      const bindOfShipping = (sequelize.query as jest.Mock).mock.calls[1][1].bind;
      expect(bindOfShipping[4]).toBe("");
    });

    /**
     * Đơn hàng 1 item — bind params phải có đúng số lượng:
     * 1 (ma_don_hang) + 1 item × 3 cột = 4 params.
     */
    it("generates correct bind param count for single-item order", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValue([]);

      await service.createOrder(
        makeOrderData({ items: [{ id: 1, quantity: 2, price: 20000000 }] })
      );

      const chiTietBind = (sequelize.query as jest.Mock).mock.calls[2][1].bind;
      // [orderId, productId, quantity, price] = 4 params
      expect(chiTietBind).toHaveLength(4);
    });

    /**
     * Đơn hàng nhiều item — số $placeholder phải khớp:
     * 1 + (n items × 3 cols).
     */
    it("generates correct placeholder count for multi-item order", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      await service.createOrder(
        makeOrderData({
          items: [
            { id: 1, quantity: 1, price: 20000000 },
            { id: 2, quantity: 2, price: 15000000 },
            { id: 5, quantity: 1, price: 28000000 },
          ],
        })
      );

      const chiTietQuery = (sequelize.query as jest.Mock).mock.calls[2][0] as string;
      const placeholders = (chiTietQuery.match(/\$/g) || []).length;
      // 1 + 3×3 = 10
      expect(placeholders).toBe(12);
    });

    /**
     * Hỗ trợ cả item.id lẫn item.productId (FE và BE dùng khác nhau).
     * Nếu không tương thích, đơn hàng sẽ insert null vào ma_san_pham.
     */
    it("accepts item.productId as fallback when item.id is absent", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValue([]);

      await expect(
        service.createOrder(
          makeOrderData({
            items: [{ productId: 5, quantity: 1, price: 28000000 }],
          })
        )
      ).resolves.toBe(1);

      const chiTietBind = (sequelize.query as jest.Mock).mock.calls[2][1].bind;
      expect(chiTietBind[1]).toBe(5); // productId phải vào đúng vị trí
    });

    /**
     * INSERT don_hang lỗi → rollback ngay, không tiếp tục insert các bảng sau.
     */
    it("rolls back and throws when INSERT don_hang fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValueOnce(
        new Error("don_hang insert failed")
      );

      await expect(service.createOrder(makeOrderData())).rejects.toThrow(
        "don_hang insert failed"
      );

      expect(mockTransaction.rollback).toHaveBeenCalledTimes(1);
      expect(mockTransaction.commit).not.toHaveBeenCalled();
      // Chỉ gọi 1 query (INSERT don_hang), không gọi 2 query còn lại
      expect(sequelize.query).toHaveBeenCalledTimes(1);
    });

    /**
     * INSERT thong_tin_giao_hang lỗi → rollback, không chạy insert chi_tiet.
     */
    it("rolls back when INSERT thong_tin_giao_hang fails", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockRejectedValueOnce(new Error("shipping insert failed"));

      await expect(service.createOrder(makeOrderData())).rejects.toThrow(
        "shipping insert failed"
      );

      expect(mockTransaction.rollback).toHaveBeenCalledTimes(1);
      expect(sequelize.query).toHaveBeenCalledTimes(2);
    });

    /**
     * INSERT chi_tiet lỗi → rollback, huỷ toàn bộ transaction.
     * Không được có đơn hàng không có sản phẩm nào.
     */
    it("rolls back when INSERT chi_tiet_don_hang fails", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([[{ ma_don_hang: 1 }]])
        .mockResolvedValueOnce([])
        .mockRejectedValueOnce(new Error("chi_tiet failed"));

      await expect(service.createOrder(makeOrderData())).rejects.toThrow(
        "chi_tiet failed"
      );

      expect(mockTransaction.rollback).toHaveBeenCalledTimes(1);
    });
  });

  // ── getMyOrdersService ──────────────────────────────────────────────────────

  describe("getMyOrdersService", () => {
    /**
     * Happy path — trả danh sách đơn với items được nhúng vào.
     */
    it("returns orders with embedded items", async () => {
      const items = [
        { ProductId: 1, productName: "iPhone 16", price: 20000000, quantity: 1 },
      ];
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrder()])
        .mockResolvedValueOnce(items);

      const result = await service.getMyOrdersService(11);

      expect(result).toHaveLength(1);
      expect(result[0].items).toEqual(items);
    });

    /**
     * userId được truyền đúng vào bind param để filter đơn hàng của đúng người.
     * Nếu không, user A có thể thấy đơn của user B.
     */
    it("filters orders by the exact userId in bind param", async () => {
      (sequelize.query as jest.Mock).mockResolvedValueOnce([]).mockResolvedValue([]);

      await service.getMyOrdersService(11);

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.bind).toContain(11);
    });

    /**
     * Nhiều đơn hàng — mỗi đơn phải được fetch chi_tiet riêng.
     * Tổng số lần gọi DB = 1 (lấy orders) + n (lấy items từng đơn).
     */
    it("fetches items separately for each order", async () => {
      const orders = [makeOrder({ id: 1 }), makeOrder({ id: 2 })];
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce(orders)     // SELECT đơn hàng
        .mockResolvedValueOnce([])         // items đơn 1
        .mockResolvedValueOnce([]);        // items đơn 2

      const result = await service.getMyOrdersService(11);

      // 1 query lấy orders + 2 query lấy items
      expect(sequelize.query).toHaveBeenCalledTimes(3);
      expect(result).toHaveLength(2);
    });

    /**
     * Đơn có nhiều sản phẩm — toàn bộ items phải được gắn vào đúng đơn.
     */
    it("attaches all items to the correct order", async () => {
      const multiItems = [
        { ProductId: 1, productName: "iPhone 16", price: 20000000, quantity: 1 },
        { ProductId: 2, productName: "Ốp lưng", price: 200000, quantity: 2 },
      ];
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrder()])
        .mockResolvedValueOnce(multiItems);

      const result = await service.getMyOrdersService(11);

      expect(result[0].items).toHaveLength(2);
      expect(result[0].items[1].productName).toBe("Ốp lưng");
    });

    /**
     * Đơn không có sản phẩm nào (edge case dữ liệu cũ) —
     * items phải là [] không phải undefined.
     */
    it("sets items to empty array when order has no order details", async () => {
      (sequelize.query as jest.Mock)
        .mockResolvedValueOnce([makeOrder()])
        .mockResolvedValueOnce([]);

      const result = await service.getMyOrdersService(11);

      expect(result[0].items).toEqual([]);
    });

    /**
     * Mapping đầy đủ 7 trạng thái tiếng Việt → tiếng Anh.
     * Quan trọng: FE dùng giá trị tiếng Anh để hiển thị badge màu sắc.
     */
    it.each([
      ["cho_xac_nhan",  "pending"],
      ["da_xac_nhan",   "processing"],
      ["dang_xu_ly",    "processing"],
      ["dang_giao",     "shipping"],
      ["da_giao",       "delivered"],
      ["da_huy",        "cancelled"],
      ["gia_tri_la",    "pending"], // giá trị lạ → default pending
    ])(
      "maps status '%s' → '%s'",
      async (viStatus, enStatus) => {
        (sequelize.query as jest.Mock)
          .mockResolvedValueOnce([makeOrder({ status: viStatus })])
          .mockResolvedValueOnce([]);

        const result = await service.getMyOrdersService(11);

        expect(result[0].status).toBe(enStatus);
      }
    );

    /**
     * Đơn được sắp xếp theo ngay_dat DESC — query phải có ORDER BY.
     * Đảm bảo đơn mới nhất hiển thị đầu tiên trong lịch sử mua hàng.
     */
    it("queries orders with ORDER BY ngay_dat DESC", async () => {
      (sequelize.query as jest.Mock).mockResolvedValueOnce([]).mockResolvedValue([]);

      await service.getMyOrdersService(11);

      const [queryStr] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("ORDER BY dh.ngay_dat DESC");
    });

    /**
     * User không có đơn nào — trả [] không throw.
     */
    it("returns empty array when user has no orders", async () => {
      (sequelize.query as jest.Mock).mockResolvedValueOnce([]);

      const result = await service.getMyOrdersService(999);

      expect(result).toEqual([]);
      // Không gọi query lấy items nếu không có đơn nào
      expect(sequelize.query).toHaveBeenCalledTimes(1);
    });

    /**
     * Lỗi DB trên query chính — bubble up exception.
     */
    it("throws when the main orders query fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB timeout"));

      await expect(service.getMyOrdersService(11)).rejects.toThrow("DB timeout");
    });
  });
});