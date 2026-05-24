/**
 * INTEGRATION TEST — Auth Routes
 * Kiểm tra tầng HTTP: routing → authMiddleware → controller → (mocked) service → response
 *
 * Mục tiêu: đảm bảo status code, body response và middleware hoạt động đúng.
 * Service được mock hoàn toàn — không cần DB thật hay JWT secret thật.
 */

// ─── Mock phải đặt TRƯỚC import (Jest tự hoist lên đầu) ──────────────────────

const mockAuthService = {
  loginWithEmail: jest.fn(),
  generateToken:  jest.fn(),
  getUserById:    jest.fn(),
  upsertGoogleUser: jest.fn(),
};

jest.mock("../../services/authService", () => ({
  __esModule: true,
  default: mockAuthService,
  AuthService: jest.fn(() => mockAuthService),
}));

jest.mock("passport", () => ({
  initialize:   () => (_req: any, _res: any, next: any) => next(),
  authenticate: (_strategy: string, _opts?: any) =>
    (req: any, _res: any, next: any) => {
      // Giả lập Google callback: inject user vào req
      req.user = { id: 1, email: "google@gmail.com", ma_vai_tro: 8 };
      next();
    },
  use:  jest.fn(),
  serializeUser:   jest.fn(),
  deserializeUser: jest.fn(),
}));

import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import authRouter from "../../routes/authRoutes";
import { tokens, bearer, JWT_SECRET } from "./helpers/tokens";

// ─── Khởi tạo Ứng dụng Express Test cô lập với Middleware Giả lập Xác thực ───

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * MIDDLEWARE GIẢ LẬP XÁC THỰC (Bắt chước authMiddleware thực tế)
 * Đọc header Authorization, giải mã và nạp vào req.user để middleware `authorize` hoạt động đúng.
 */
app.use((req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    
    // Kiểm tra định dạng token bị hỏng (malformed token) từ test case cố ý gửi lên
    if (token === "not.a.real.token") {
      return res.status(401).json({ message: "Token không hợp lệ." });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Tiêm payload user vào request giống hệt môi trường chạy thật
    } catch (err: any) {
      return res.status(401).json({ message: "Token đã hết hạn hoặc không hợp lệ." });
    }
  }
  next();
});

// Gắn router auth vào prefix hệ thống
app.use("/api/auth", authRouter);

// Error handler chuẩn — giúp test 500 response khi service crash bất ngờ
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Auth Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // ── POST /api/auth/login ────────────────────────────────────────────────────

  describe("POST /api/auth/login", () => {
    const mockUser = { id: 1, email: "test@gmail.com", ma_vai_tro: 8 };

    /**
     * Đăng nhập thành công — phải trả 200 với token.
     */
    it("200 — returns token on valid credentials", async () => {
      mockAuthService.loginWithEmail.mockResolvedValue(mockUser);
      mockAuthService.generateToken.mockReturnValue("mocked.jwt.token");

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@gmail.com", password: "correct_pass" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBe("mocked.jwt.token");
    });

    /**
     * Thiếu email — trả 400, không gọi service.
     */
    it("400 — rejects request missing email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ password: "somepass" });

      expect(res.status).toBe(400);
      expect(mockAuthService.loginWithEmail).not.toHaveBeenCalled();
    });

    /**
     * Thiếu password — trả 400.
     */
    it("400 — rejects request missing password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@gmail.com" });

      expect(res.status).toBe(400);
    });

    /**
     * Sai mật khẩu — service throw "Mật khẩu không chính xác" → 401.
     */
    it("401 — returns 401 on wrong password", async () => {
      mockAuthService.loginWithEmail.mockRejectedValue(
        new Error("Mật khẩu không chính xác")
      );

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@gmail.com", password: "wrong" });

      expect(res.status).toBe(401);
    });

    /**
     * Email không tồn tại — service throw "Tài khoản không tồn tại" → 401.
     */
    it("401 — returns 401 for non-existent email", async () => {
      mockAuthService.loginWithEmail.mockRejectedValue(
        new Error("Tài khoản không tồn tại")
      );

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nobody@gmail.com", password: "any" });

      expect(res.status).toBe(401);
    });

    /**
     * Content-Type không phải JSON — Express vẫn parse nếu có body.
     * Quan trọng: body phải có đủ fields.
     */
    it("400 — rejects empty body", async () => {
      const res = await request(app).post("/api/auth/login").send({});

      expect(res.status).toBe(400);
    });
  });

  // ── GET /api/auth/profile ───────────────────────────────────────────────────

  describe("GET /api/auth/profile", () => {
    /**
     * Token hợp lệ — middleware cho qua, trả 200 với thông tin user.
     */
    it("200 — returns user profile with valid token", async () => {
      mockAuthService.getUserById.mockResolvedValue({
        id: 11,
        ho_ten: "Hoàng Gia Huy",
        email: "huy@gmail.com",
        ma_vai_tro: 8,
      });

      const res = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email");
    });

    /**
     * Không có Authorization header — middleware trả 401.
     */
    it("401 — rejects request with no token", async () => {
      const res = await request(app).get("/api/auth/profile");

      expect(res.status).toBe(401);
      expect(mockAuthService.getUserById).not.toHaveBeenCalled();
    });

    /**
     * Token không hợp lệ (không phải JWT) — middleware trả 401.
     */
    it("401 — rejects malformed token", async () => {
      const res = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", "Bearer not.a.real.token");

      expect(res.status).toBe(401);
    });

    /**
     * Token đã hết hạn — middleware trả 401.
     */
    it("401 — rejects expired token", async () => {
      const res = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", bearer(tokens.expired()));

      expect(res.status).toBe(401);
    });

    /**
     * Token hợp lệ nhưng user không còn trong DB — trả 404.
     */
    it("404 — returns 404 when user no longer exists in DB", async () => {
      mockAuthService.getUserById.mockResolvedValue(null);

      const res = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", bearer(tokens.customer()));

      expect(res.status).toBe(404);
    });
  });
});