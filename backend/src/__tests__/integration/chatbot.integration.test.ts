/**
 * INTEGRATION TEST — Chatbot Route
 * Route public (không cần auth) — POST /api/chatbot.
 * Kiểm tra: request validation, AI response format, error handling.
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockChatWithAI = jest.fn();

jest.mock("../../services/chatbotService", () => ({
  chatWithAI: (...args: any[]) => mockChatWithAI(...args),
}));

import request from "supertest";
import { createApp } from "./helpers/app";
import chatbotRouter from "../../routes/chatbotRoute";

const app = createApp("/api/chatbot", chatbotRouter);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Chatbot Routes — Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("POST /api/chatbot", () => {
    /**
     * Gửi tin nhắn hợp lệ — nhận được reply từ AI.
     */
    it("200 — returns AI reply for valid message", async () => {
      mockChatWithAI.mockResolvedValue(
        "Dạ chào bạn, TechMart hiện có iPhone 16 với giá 20 triệu ạ!"
      );

      const res = await request(app)
        .post("/api/chatbot")
        .send({ message: "Shop còn iPhone 16 không?" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("reply");
      expect(res.body.reply).toContain("iPhone 16");
    });

    /**
     * message được truyền đúng vào service.
     * Controller hiện tại gọi chatWithAI(message, history || []) — 2 args,
     * nên test dùng expect.arrayContaining để match arg đầu tiên.
     */
    it("200 — passes message exactly to chatWithAI service", async () => {
      mockChatWithAI.mockResolvedValue("Phản hồi từ AI");

      await request(app)
        .post("/api/chatbot")
        .send({ message: "Laptop nào tốt nhất dưới 20 triệu?" });

      expect(mockChatWithAI).toHaveBeenCalledWith(
        "Laptop nào tốt nhất dưới 20 triệu?",
        [] // controller truyền history || [] khi client không gửi history
      );
    });

    /**
     * Thiếu field message → 400, service không được gọi.
     */
    it("400 — rejects request with missing message", async () => {
      const res = await request(app).post("/api/chatbot").send({});

      expect(res.status).toBe(400);
      expect(mockChatWithAI).not.toHaveBeenCalled();
    });

    /**
     * message là chuỗi rỗng → 400.
     */
    it("400 — rejects empty message string", async () => {
      const res = await request(app)
        .post("/api/chatbot")
        .send({ message: "" });

      expect(res.status).toBe(400);
    });

    /**
     * Body không phải JSON — Express parse "plain text message" thành string,
     * req.body = "plain text message" (không phải object) → req.body.message = undefined
     * → controller: message = undefined → !message = true → ... nhưng vì body là string
     * Express có thể throw SyntaxError → error handler trả 500.
     * Behavior thực tế: 500 (Express SyntaxError từ invalid JSON).
     */
    it("500 — returns 500 on non-JSON body (Express parse error)", async () => {
      const res = await request(app)
        .post("/api/chatbot")
        .set("Content-Type", "application/json")
        .send("plain text message"); // invalid JSON → Express SyntaxError → 500

      expect(res.status).toBe(500);
    });

    /**
     * Service trả về message lỗi thân thiện (AI timeout) — vẫn trả 200.
     * Chatbot không nên throw 500 vì trải nghiệm user quan trọng hơn.
     */
    it("200 — returns friendly error message when AI fails gracefully", async () => {
      mockChatWithAI.mockResolvedValue(
        "Xin lỗi, đã xảy ra lỗi khi kết nối với chatbot. Vui lòng thử lại sau."
      );

      const res = await request(app)
        .post("/api/chatbot")
        .send({ message: "Xin chào" });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain("lỗi");
    });

    /**
     * Service throw exception không mong đợi → 500.
     */
    it("500 — returns 500 on unexpected service crash", async () => {
      mockChatWithAI.mockRejectedValue(new Error("Unexpected crash"));

      const res = await request(app)
        .post("/api/chatbot")
        .send({ message: "Xin chào" });

      expect(res.status).toBe(500);
    });

    /**
     * Route chỉ accept POST, không phải GET.
     */
    it("404 — GET method is not allowed on chatbot route", async () => {
      const res = await request(app).get("/api/chatbot");

      expect(res.status).toBe(404);
    });
  });
});