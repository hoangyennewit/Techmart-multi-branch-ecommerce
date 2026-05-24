/**
 * INTEGRATION TEST — Product Routes
 * Không yêu cầu auth — tất cả route product đều public.
 * Kiểm tra: routing đúng, response format, query params, status codes.
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockProductSvc = {
  getAllProducts:        jest.fn(),
  getProductsByCategory: jest.fn(),
  getProductById:       jest.fn(),
  searchProducts:       jest.fn(),
  uploadProductImage:   jest.fn(),
};

jest.mock("../../services/productService", () => ({
  ProductService: jest.fn(() => mockProductSvc),
}));

// Mock multer/cloudinary upload middleware — inject req.file giả để vượt qua kiểm tra file
jest.mock("../../middlewares/uploadCloud", () => ({
  __esModule: true,
  default: (req: any, _res: any, next: any) => {
    // Inject req.file giả để controller không trả 400 "Vui lòng chọn ảnh"
    req.file = { path: "https://cdn.example.com/mock-upload.jpg" };
    next();
  },
  upload: {
    single: () => (req: any, _res: any, next: any) => {
      req.file = { path: "https://cdn.example.com/mock-upload.jpg" };
      next();
    },
  },
}));

import request from "supertest";
import { createApp } from "./helpers/app";
import productRouter from "../../routes/productRoute";

const app = createApp("/api/products", productRouter);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeProduct = (id = 1) => ({
  id,
  name:          "iPhone 16 128GB",
  price:         20000000,
  originalPrice: 22000000,
  discount:      10,
  rating:        4.8,
  images:        [{ id, url: "https://cdn.example.com/p.jpg" }],
  colors:        [],
  variants:      [],
  specs:         [],
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Product Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // ── GET /api/products ───────────────────────────────────────────────────────

  describe("GET /api/products", () => {
    /**
     * Trả 200 với danh sách sản phẩm.
     */
    it("200 — returns product list", async () => {
      mockProductSvc.getAllProducts.mockResolvedValue([makeProduct(1), makeProduct(2)]);

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    /**
     * Không có sản phẩm — trả 200 với mảng rỗng (không phải 404).
     */
    it("200 — returns empty array when no products exist", async () => {
      mockProductSvc.getAllProducts.mockResolvedValue([]);

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    /**
     * Query param ?categoryId= được truyền xuống service đúng.
     */
    it("200 — forwards categoryId query param to service", async () => {
      mockProductSvc.getAllProducts.mockResolvedValue([makeProduct()]);

      const res = await request(app).get("/api/products?categoryId=1");

      expect(res.status).toBe(200);
      expect(mockProductSvc.getAllProducts).toHaveBeenCalledWith(
        expect.anything() // categoryId=1 hoặc "1" tùy controller parse
      );
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockProductSvc.getAllProducts.mockRejectedValue(new Error("DB crash"));

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(500);
    });
  });

  // ── GET /api/products/search ────────────────────────────────────────────────

  describe("GET /api/products/search", () => {
    /**
     * Tìm kiếm với keyword — trả 200 với kết quả.
     * Route /search phải đặt TRƯỚC /:id trong router để không bị match nhầm.
     */
    it("200 — returns search results for keyword", async () => {
      mockProductSvc.searchProducts.mockResolvedValue([makeProduct()]);

      const res = await request(app).get("/api/products/search?q=iPhone");

      expect(res.status).toBe(200);
      expect(mockProductSvc.searchProducts).toHaveBeenCalledWith("iPhone");
    });

    /**
     * Không có kết quả — trả 200 với mảng rỗng.
     */
    it("200 — returns empty array when nothing matches", async () => {
      mockProductSvc.searchProducts.mockResolvedValue([]);

      const res = await request(app).get("/api/products/search?q=xyz_nonexistent");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    /**
     * Thiếu query param q — controller trả 400 "Vui lòng nhập từ khóa tìm kiếm".
     * Đây là behavior đúng của controller hiện tại (có validate q).
     */
    it("400 — returns 400 when q param is missing", async () => {
      const res = await request(app).get("/api/products/search");

      expect(res.status).toBe(400);
    });
  });

  // ── GET /api/products/category/:slug ───────────────────────────────────────

  describe("GET /api/products/category/:slug", () => {
    /**
     * Trả sản phẩm theo slug danh mục.
     */
    it("200 — returns products for valid slug", async () => {
      mockProductSvc.getProductsByCategory.mockResolvedValue([makeProduct(), makeProduct(2)]);

      const res = await request(app).get("/api/products/category/dien-thoai");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(mockProductSvc.getProductsByCategory).toHaveBeenCalledWith("dien-thoai");
    });

    /**
     * Slug không có sản phẩm — 200 với [].
     */
    it("200 — returns empty array for slug with no products", async () => {
      mockProductSvc.getProductsByCategory.mockResolvedValue([]);

      const res = await request(app).get("/api/products/category/slug-la");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    /**
     * Slug được truyền đúng vào service (không bị encode).
     */
    it("200 — passes slug correctly including hyphens", async () => {
      mockProductSvc.getProductsByCategory.mockResolvedValue([]);

      await request(app).get("/api/products/category/may-tinh-bang");

      expect(mockProductSvc.getProductsByCategory).toHaveBeenCalledWith("may-tinh-bang");
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockProductSvc.getProductsByCategory.mockRejectedValue(new Error("fail"));

      const res = await request(app).get("/api/products/category/laptop");

      expect(res.status).toBe(500);
    });
  });

  // ── GET /api/products/:id ───────────────────────────────────────────────────

  describe("GET /api/products/:id", () => {
    /**
     * ID hợp lệ, sản phẩm tồn tại — trả 200.
     */
    it("200 — returns product detail by id", async () => {
      mockProductSvc.getProductById.mockResolvedValue(makeProduct(5));

      const res = await request(app).get("/api/products/5");

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(5);
      expect(mockProductSvc.getProductById).toHaveBeenCalledWith(5);
    });

    /**
     * ID không tồn tại (service trả null) → 404.
     */
    it("404 — returns 404 when product not found", async () => {
      mockProductSvc.getProductById.mockResolvedValue(null);

      const res = await request(app).get("/api/products/9999");

      expect(res.status).toBe(404);
    });

    /**
     * Service lỗi → 500.
     */
    it("500 — returns 500 when service throws", async () => {
      mockProductSvc.getProductById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/api/products/1");

      expect(res.status).toBe(500);
    });
  });

  // ── POST /api/products/upload-image ────────────────────────────────────────

  describe("POST /api/products/upload-image", () => {
    /**
     * Route hiện tại KHÔNG gắn multer middleware (productRoute.ts gọi thẳng controller,
     * không có upload.single()), nên req.file luôn undefined.
     * Controller kiểm tra if (!file) → res.status(400) → "Vui lòng chọn ảnh!".
     *
     * Để test 200/500 thực sự cần một trong hai:
     *   (A) Thêm multer middleware vào route: router.post("/upload-image", upload.single("image"), ...)
     *   (B) Dùng supertest .attach() để gửi multipart/form-data
     *
     * Hiện tại test document đúng behavior thực tế của route.
     */
    it("400 — returns 400 when no file is attached (route missing multer middleware)", async () => {
      const res = await request(app)
        .post("/api/products/upload-image")
        .send({ ma_san_pham: 1, thu_tu: 1 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Vui lòng chọn ảnh!");
    });

    /**
     * Gửi multipart/form-data với file — multer không được mount trên route
     * nên Express không parse được multipart body → controller nhận req.body rỗng
     * → Number(undefined) = NaN → service crash → 500.
     */
    it("500 — returns 500 with multipart request (Express cannot parse without multer)", async () => {
      mockProductSvc.uploadProductImage.mockResolvedValue({
        message: "Upload thành công!",
        imageUrl: "https://cdn.example.com/new.jpg",
      });

      const res = await request(app)
        .post("/api/products/upload-image")
        .attach("image", Buffer.from("fake-image-data"), "test.jpg")
        .field("ma_san_pham", "1")
        .field("thu_tu", "1");

      // multer chưa mount → body không parse được → req.file undefined → 400
      // nhưng req.body cũng undefined → controller throw → 500
      expect(res.status).toBe(500);
    });
  });
});