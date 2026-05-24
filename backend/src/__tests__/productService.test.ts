import { QueryTypes } from "sequelize";
import sequelize from "../../src/config/database";
import { ProductService } from "../../src/services/productService";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/config/database", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockDbProduct = (overrides = {}) => ({
  id: 1,
  categoryId: 1,
  brandId: 1,
  name: "iPhone 16 128GB",
  description: "Chip A17, bản tiêu chuẩn",
  price: 20000000,
  originalPrice: 22000000,
  discount: 10,
  stock: 50,
  rating: 4.8,
  sold: 500,
  createdAt: new Date("2024-01-01").toISOString(),
  image: "https://example.com/iphone16.jpg",
  ...overrides,
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
    jest.clearAllMocks();
  });

  // ── getAllProducts ──────────────────────────────────────────────────────────

  describe("getAllProducts", () => {
    /**
     * Happy path không filter — query phải có WHERE trang_thai = 1,
     * output phải được format đúng cấu trúc frontend cần.
     */
    it("returns formatted products without category filter", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([mockDbProduct()]);

      const result = await service.getAllProducts();

      expect(sequelize.query).toHaveBeenCalledWith(
        expect.stringContaining("WHERE trang_thai = 1"),
        expect.objectContaining({ type: QueryTypes.SELECT })
      );
      expect(result[0]).toMatchObject({
        id: 1,
        name: "iPhone 16 128GB",
        price: 20000000,
        discount: 10,
        images: [{ id: 1, url: "https://example.com/iphone16.jpg" }],
        colors: [],
        variants: [],
        specs: [],
      });
    });

    /**
     * Trả nhiều sản phẩm — kiểm tra tất cả được map, không chỉ phần tử đầu.
     * Bug phổ biến: xử lý đúng phần tử đầu nhưng drop phần còn lại.
     */
    it("maps all products when DB returns multiple rows", async () => {
      const raw = [
        mockDbProduct({ id: 1, name: "iPhone 16" }),
        mockDbProduct({ id: 2, name: "Samsung S24", brandId: 2 }),
        mockDbProduct({ id: 3, name: "Xiaomi 15", brandId: 3 }),
      ];
      (sequelize.query as jest.Mock).mockResolvedValue(raw);

      const result = await service.getAllProducts();

      expect(result).toHaveLength(3);
      expect(result.map((p: any) => p.name)).toEqual([
        "iPhone 16",
        "Samsung S24",
        "Xiaomi 15",
      ]);
    });

    /**
     * Có categoryId — query phải thêm AND ma_danh_muc và truyền đúng bind param.
     * Nếu thiếu sẽ trả hết sản phẩm thay vì filter theo danh mục.
     */
    it("appends category filter and bind param when categoryId is provided", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.getAllProducts(2);

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("AND ma_danh_muc = $1");
      expect(options.bind).toEqual([2]);
    });

    /**
     * categoryId = 0 là falsy trong JS — không được thêm filter.
     * Trường hợp này hay xảy ra khi FE gửi 0 thay vì undefined.
     */
    it("does NOT add category filter when categoryId is 0 (falsy)", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.getAllProducts(0);

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).not.toContain("AND ma_danh_muc");
      expect(options.bind).toEqual([]);
    });

    /**
     * DB trả về rỗng — trả về [] thay vì undefined hay throw.
     */
    it("returns empty array when no products found", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.getAllProducts();

      expect(result).toEqual([]);
    });

    /**
     * createdAt = null từ DB — dùng fallback new Date() thay vì crash.
     * Đảm bảo giá trị fallback vẫn là ISO string hợp lệ.
     */
    it("uses current date as fallback when createdAt is null", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([
        mockDbProduct({ createdAt: null }),
      ]);

      const result = await service.getAllProducts();

      expect(result[0].createdAt).toBeDefined();
      expect(() => new Date(result[0].createdAt)).not.toThrow();
    });

    /**
     * Ảnh đại diện được đặt vào mảng images với đúng id và url.
     * Frontend dùng images[0].url để render — sai là ảnh trắng.
     */
    it("wraps hinh_anh_dai_dien into images array with correct id and url", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([
        mockDbProduct({ id: 7, image: "https://cdn.example.com/sp7.jpg" }),
      ]);

      const result = await service.getAllProducts();

      expect(result[0].images).toEqual([
        { id: 7, url: "https://cdn.example.com/sp7.jpg" },
      ]);
    });

    /**
     * DB ném lỗi — phải throw với message cụ thể, không crash toàn app.
     */
    it("throws 'Error fetching products' when DB fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("connection timeout"));

      await expect(service.getAllProducts()).rejects.toThrow("Error fetching products");
    });
  });

  // ── getProductsByCategory ───────────────────────────────────────────────────

  describe("getProductsByCategory", () => {
    /**
     * Query phải filter đúng slug, chỉ lấy sản phẩm đang active (trang_thai = 1),
     * và có ORDER BY ngay_tao DESC để mới nhất lên đầu.
     */
    it("queries with correct slug, active filter, and descending order", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([mockDbProduct()]);

      await service.getProductsByCategory("dien-thoai");

      const [queryStr, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(queryStr).toContain("dm.slug = $1");
      expect(queryStr).toContain("sp.trang_thai = 1");
      expect(queryStr).toContain("ORDER BY sp.ngay_tao DESC");
      expect(options.bind).toEqual(["dien-thoai"]);
    });

    /**
     * Danh mục có nhiều sản phẩm — tất cả được trả về, images đúng cho từng sp.
     */
    it("returns all products for the given slug with correct images", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([
        mockDbProduct({ id: 10, image: "https://cdn.example.com/a.jpg" }),
        mockDbProduct({ id: 11, image: "https://cdn.example.com/b.jpg" }),
      ]);

      const result = await service.getProductsByCategory("laptop");

      expect(result).toHaveLength(2);
      expect(result[0].images[0].url).toBe("https://cdn.example.com/a.jpg");
      expect(result[1].images[0].url).toBe("https://cdn.example.com/b.jpg");
    });

    /**
     * Slug không tồn tại hoặc danh mục rỗng — trả [] không throw.
     */
    it("returns empty array when no products match the slug", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.getProductsByCategory("slug-khong-ton-tai");

      expect(result).toEqual([]);
    });

    /**
     * Lỗi DB — bubble up với message đúng.
     */
    it("throws when DB query fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(
        service.getProductsByCategory("dien-thoai")
      ).rejects.toThrow("Error fetching products by category");
    });
  });

  // ── getProductById ──────────────────────────────────────────────────────────

  describe("getProductById", () => {
    /**
     * Tìm thấy — phải trả đủ các mảng (images, colors, variants, specs, comments)
     * dù DB chưa có data, FE cần các field này để không crash.
     */
    it("returns product with all required array fields initialized", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue(mockDbProduct());

      const result = await service.getProductById(1);

      expect(result).toMatchObject({
        id: 1,
        images: [{ id: 1, url: "https://example.com/iphone16.jpg" }],
        colors: [],
        variants: [],
        specs: [],
        comments: [],
      });
    });

    /**
     * plain: true phải được truyền vào query options — nếu thiếu,
     * Sequelize trả về mảng thay vì object đơn, gây bug.
     */
    it("uses plain: true option to get single object from Sequelize", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue(mockDbProduct());

      await service.getProductById(5);

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.plain).toBe(true);
      expect(options.bind).toEqual([5]);
    });

    /**
     * Sản phẩm không tồn tại hoặc bị ẩn (trang_thai = 0) — trả về null.
     * Không được throw, caller xử lý null để trả 404.
     */
    it("returns null when product is not found", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue(null);

      const result = await service.getProductById(9999);

      expect(result).toBeNull();
    });

    /**
     * Lỗi DB — throw với message chứa tên service để dễ trace log.
     */
    it("throws with service name in message when DB fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB crash"));

      await expect(service.getProductById(1)).rejects.toThrow(
        "Lỗi ở ProductService - getProductById"
      );
    });
  });

  // ── searchProducts ──────────────────────────────────────────────────────────

  describe("searchProducts", () => {
    /**
     * Chuỗi rỗng — không gọi DB, trả [] ngay.
     * Tránh query dư thừa và có thể trả hàng nghìn sp.
     */
    it("returns empty array without querying DB for empty string", async () => {
      const result = await service.searchProducts("");

      expect(sequelize.query).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    /**
     * Chuỗi chỉ có khoảng trắng — cũng không được query.
     * trim() phải được gọi trước khi kiểm tra length.
     */
    it("returns empty array without querying DB for whitespace-only input", async () => {
      const result = await service.searchProducts("   ");

      expect(sequelize.query).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    /**
     * Keyword được trim() rồi mới gắn % — "  iPhone  " → "iPhone%",
     * không phải "  iPhone  %" (sẽ không match gì).
     */
    it("trims whitespace from keyword before building LIKE pattern", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.searchProducts("  Samsung  ");

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.bind[0]).toBe("Samsung%");
    });

    /**
     * Pattern phải là prefix match (keyword%) không phải contains (%keyword%).
     * Prefix match nhanh hơn nhờ B-tree index, phù hợp autocomplete.
     */
    it("builds prefix LIKE pattern (keyword%) not contains (%keyword%)", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.searchProducts("iPhone");

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.bind[0]).toBe("iPhone%");
      expect(options.bind[0]).not.toBe("%iPhone%");
    });

    /**
     * Nhiều kết quả — tất cả được format đúng, không chỉ phần tử đầu.
     */
    it("returns all matching products formatted correctly", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([
        mockDbProduct({ id: 1, name: "iPhone 16 128GB" }),
        mockDbProduct({ id: 2, name: "iPhone 16 256GB" }),
      ]);

      const result = await service.searchProducts("iPhone");

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("iPhone 16 128GB");
      expect(result[1].name).toBe("iPhone 16 256GB");
      // Mỗi kết quả phải có mảng images
      expect(result[0].images).toBeDefined();
      expect(result[1].images).toBeDefined();
    });

    /**
     * Tìm không thấy — trả [] không throw.
     */
    it("returns empty array when no products match", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.searchProducts("SanPhamKhongTonTai");

      expect(result).toEqual([]);
    });

    /**
     * Lỗi DB — throw với message đúng.
     */
    it("throws 'Error searching products' when DB fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(service.searchProducts("iPhone")).rejects.toThrow(
        "Error searching products"
      );
    });
  });

  // ── uploadProductImage ──────────────────────────────────────────────────────

  describe("uploadProductImage", () => {
    /**
     * INSERT thành công — trả về message xác nhận và imageUrl gốc.
     * Kiểm tra bind params đúng thứ tự: [ma_san_pham, url, thu_tu].
     */
    it("inserts image and returns success message with imageUrl", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      const result = await service.uploadProductImage(
        3,
        "https://cdn.example.com/sp3.jpg",
        2
      );

      expect(sequelize.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO hinh_anh_san_pham"),
        expect.objectContaining({
          bind: [3, "https://cdn.example.com/sp3.jpg", 2],
        })
      );
      expect(result).toMatchObject({
        message: "Upload thành công!",
        imageUrl: "https://cdn.example.com/sp3.jpg",
      });
    });

    /**
     * thu_tu khác nhau — đảm bảo giá trị được truyền đúng, không bị hardcode.
     * Ảnh thứ 1 (cover) khác ảnh thứ 5 (chi tiết) về thứ tự hiển thị.
     */
    it("passes the correct thu_tu order to the INSERT query", async () => {
      (sequelize.query as jest.Mock).mockResolvedValue([]);

      await service.uploadProductImage(1, "https://cdn.example.com/x.jpg", 5);

      const [, options] = (sequelize.query as jest.Mock).mock.calls[0];
      expect(options.bind[2]).toBe(5);
    });

    /**
     * INSERT lỗi — throw với message đúng.
     */
    it("throws when DB insert fails", async () => {
      (sequelize.query as jest.Mock).mockRejectedValue(new Error("insert error"));

      await expect(
        service.uploadProductImage(1, "https://cdn.example.com/x.jpg", 1)
      ).rejects.toThrow("Error uploading product image");
    });
  });
});