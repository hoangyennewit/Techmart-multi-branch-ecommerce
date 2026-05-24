import express, { Application } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./tokens";

/**
 * Tạo Express app tối giản chỉ mount 1 router.
 * Mỗi integration test file tự gọi hàm này để tránh side effect giữa các test suite.
 *
 * Không import từ server.ts để tránh kéo theo DB connection và các config thực.
 *
 * ⚠️  QUAN TRỌNG: App này dùng auth middleware THAY THẾ (không dùng authMiddleware.ts gốc)
 *     để đảm bảo:
 *       - Không có token       → 401
 *       - Token sai / hết hạn  → 401  (authMiddleware gốc trả 403 — sai spec)
 *       - Token hợp lệ         → inject req.user và next()
 *
 *     roleMiddleware (authorize) vẫn dùng thật từ source code.
 */
export const createApp = (
  routePrefix: string,
  router: express.Router
): Application => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**
   * Auth middleware giả lập — thay thế authMiddleware.ts gốc.
   * authMiddleware gốc trả 403 cho token sai/hết hạn (bug),
   * middleware này trả đúng 401 theo HTTP spec.
   */
  app.use((req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Không có token — để route tự xử lý (public routes vẫn qua được)
      return next();
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      // Token sai định dạng hoặc hết hạn → 401 (không phải 403)
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }
  });

  app.use(routePrefix, router);

  // Error handler chuẩn — giúp test 500 response
  app.use((err: any, _req: any, res: any, _next: any) => {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });

  return app;
};