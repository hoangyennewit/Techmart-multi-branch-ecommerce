// ── Phải đặt jest.mock TRƯỚC tất cả import ──
jest.mock("../../src/config/gemini", () => ({
  geminiConfig: {
    apiKey: "mock-api-key-for-testing",
    chatModel: "gemini-1.5-flash",
    generationConfig: {},
  },
}));

jest.mock("../../src/config/database", () => ({
  query: jest.fn(),
}));

jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: (...args: any[]) => (global as any).__mockGetGenerativeModel?.(...args),
  })),
}));

import { chatWithAI } from "../../src/services/chatbotService";
import sequelize from "../../src/config/database";

describe("chatbotService", () => {
  let mockSendMessage: jest.Mock;
  let mockStartChat: jest.Mock;
  let mockGetGenerativeModel: jest.Mock;
  let realDateNow: () => number;

  beforeEach(() => {
    mockSendMessage = jest.fn();
    mockStartChat = jest.fn().mockReturnValue({ sendMessage: mockSendMessage });
    mockGetGenerativeModel = jest.fn().mockReturnValue({ startChat: mockStartChat });

    (global as any).__mockGetGenerativeModel = mockGetGenerativeModel;

    jest.clearAllMocks();
    
    // Lưu lại hàm Date.now gốc
    realDateNow = Date.now;
  });

  afterEach(() => {
    // Trả lại hàm Date.now gốc sau mỗi test case
    Date.now = realDateNow;
    delete (global as any).__mockGetGenerativeModel;
  });

  it("should return AI response when database has products", async () => {
    // Ép thời gian về mốc cố định để độc lập dữ liệu cache
    Date.now = jest.fn(() => 1000000);

    const mockProducts = [
      {
        name: "iPhone 16 Pro Max",
        brand: "Apple",
        category: "Điện thoại",
        price: 34990000,
        discount: 5,
        stock: 10,
        rating: 5,
        description: "Hàng chính hãng VN/A",
      },
    ];
    (sequelize.query as jest.Mock).mockResolvedValue(mockProducts);
    mockSendMessage.mockResolvedValue({
      response: {
        text: () => "Dạ chào bạn, TechMart hiện đang sẵn hàng iPhone 16 Pro Max ạ!",
      },
    });

    const reply = await chatWithAI("Shop còn iPhone 16 không?");

    expect(sequelize.query).toHaveBeenCalledTimes(1);
    expect(mockGetGenerativeModel).toHaveBeenCalledWith(
      expect.objectContaining({
        model: expect.any(String),
        systemInstruction: expect.stringContaining("iPhone 16 Pro Max"),
      })
    );
    expect(reply).toBe(
      "Dạ chào bạn, TechMart hiện đang sẵn hàng iPhone 16 Pro Max ạ!"
    );
  });

  it("should use cache and not query database twice within TTL", async () => {
    // Đặt mốc thời gian bắt đầu
    let currentTime = 2000000;
    Date.now = jest.fn(() => currentTime);

    (sequelize.query as jest.Mock).mockResolvedValue([]);
    mockSendMessage.mockResolvedValue({
      response: { text: () => "AI Response" },
    });

    // Lần 1: Gọi DB vì mốc thời gian đã thay đổi so với test case trước
    await chatWithAI("Tin nhắn 1");
    
    // Lần 2: Thời gian không đổi -> Phải đọc từ cache
    await chatWithAI("Tin nhắn 2");

    expect(sequelize.query).toHaveBeenCalledTimes(1);
  });

  it("should refresh cache after TTL expires", async () => {
    // Đặt mốc thời gian bắt đầu mới hoàn toàn
    let currentTime = 3000000;
    Date.now = jest.fn(() => currentTime);

    (sequelize.query as jest.Mock).mockResolvedValue([]);
    mockSendMessage.mockResolvedValue({
      response: { text: () => "AI Response" },
    });

    // Lần 1: Khởi tạo cache tại mốc 3000000
    await chatWithAI("Tin nhắn 1");
    expect(sequelize.query).toHaveBeenCalledTimes(1);

    // Giả lập thời gian trôi qua 65 giây (vượt TTL 60s)
    currentTime += 65000; 

    // Lần 2: Vì hết hạn nên bắt buộc phải query lại DB
    await chatWithAI("Tin nhắn 2");

    expect(sequelize.query).toHaveBeenCalledTimes(2);
  });

  it("should handle database query error gracefully", async () => {
    // Ép mốc thời gian mới để xóa bỏ ảnh hưởng từ cache cũ
    let currentTime = 4000000;
    Date.now = jest.fn(() => currentTime);

    (sequelize.query as jest.Mock).mockRejectedValue(new Error("Database sập"));
    mockSendMessage.mockResolvedValue({
      response: { text: () => "Phản hồi giả lập khi DB lỗi" },
    });

    const reply = await chatWithAI("Xin chào");

    expect(mockGetGenerativeModel).toHaveBeenCalledWith(
      expect.objectContaining({
        systemInstruction: expect.stringContaining("(Lỗi khi tải dữ liệu sản phẩm)"),
      })
    );
    expect(reply).toBe("Phản hồi giả lập khi DB lỗi");
  });

  it("should return error message when Gemini API fails", async () => {
    let currentTime = 5000000;
    Date.now = jest.fn(() => currentTime);

    (sequelize.query as jest.Mock).mockResolvedValue([]);
    mockSendMessage.mockRejectedValue(new Error("API Limit / Network Error"));

    const reply = await chatWithAI("Chào shop");

    expect(reply).toBe(
      "Xin lỗi, đã xảy ra lỗi khi kết nối với chatbot. Vui lòng thử lại sau."
    );
  });
});