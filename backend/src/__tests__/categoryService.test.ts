import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { CategoryService } from "../../src/services/categoryService";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CategoryService", () => {
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  describe("getAllCategories", () => {
    /**
     * Happy path — trả đúng danh sách danh mục đang active.
     * Kiểm tra query có WHERE trang_thai = 1 để không lấy danh mục đã ẩn.
     */
    it("returns list of active categories", async () => {
      const mockCategories = [
        { id: 1, name: "Điện thoại", slug: "dien-thoai", description: "Smartphones" },
        { id: 2, name: "Laptop",     slug: "laptop",     description: "Laptops" },
      ];
      (sequelize.query as jest.Mock).mockResolvedValue(mockCategories);

      const result = await service.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(result).toHaveLength(2);
    });

    /**
     * Query phải có WHERE trang_thai = 1 — không được lấy danh mục đã bị ẩn.
     */
    it("queries only active categories (trang_thai = 1)", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.getAllCategories();

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("WHERE trang_thai = 1");
      expect(options.type).toBe(QueryTypes.SELECT);
    });

    /**
     * Các cột alias phải đúng — FE dùng id/name/slug/description.
     * Nếu alias sai, FE nhận undefined thay vì giá trị thực.
     */
    it("selects correct column aliases (id, name, slug, description)", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.getAllCategories();

      const [queryStr] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("ma_danh_muc AS id");
      expect(queryStr).toContain("ten_danh_muc AS name");
      expect(queryStr).toContain("slug");
      expect(queryStr).toContain("mo_ta AS description");
    });

    /**
     * Không có danh mục nào active — trả [] không throw.
     */
    it("returns empty array when no categories are active", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.getAllCategories();

      expect(result).toEqual([]);
    });

    /**
     * DB lỗi — bubble up exception, không nuốt lỗi.
     */
    it("propagates DB error", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB timeout"));

      await expect(service.getAllCategories()).rejects.toThrow("DB timeout");
    });
  });
});