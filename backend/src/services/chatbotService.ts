import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfig } from "../config/gemini";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

const genAI = new GoogleGenerativeAI(geminiConfig.apiKey);

// ── Simple in-memory cache (60 s TTL) để tránh query DB mỗi tin nhắn ──
let cachedCatalog: string | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60_000;

async function getProductCatalog(): Promise<string> {
    const now = Date.now();
    if (cachedCatalog && now - cacheTime < CACHE_TTL_MS) {
        return cachedCatalog;
    }

    try {
        const rows: any[] = await sequelize.query(
            `SELECT
                sp.ten_san_pham        AS name,
                h.ten_hang             AS brand,
                dm.ten_danh_muc        AS category,
                sp.gia_ban             AS price,
                sp.phan_tram_giam      AS discount,
                sp.so_luong_ton        AS stock,
                sp.diem_danh_gia       AS rating,
                sp.mo_ta_ngan          AS description
             FROM san_pham sp
             LEFT JOIN hang          h  ON sp.ma_hang     = h.ma_hang
             LEFT JOIN danh_muc      dm ON sp.ma_danh_muc = dm.ma_danh_muc
             WHERE sp.trang_thai = 1
             ORDER BY sp.so_luot_xem DESC
             LIMIT 80`,
            { type: QueryTypes.SELECT }
        );

        if (rows.length === 0) {
            cachedCatalog = "(Chưa có dữ liệu sản phẩm)";
        } else {
            cachedCatalog = rows.map(r =>
                `- ${r.name} | Hãng: ${r.brand ?? "?"} | Danh mục: ${r.category ?? "?"} | Giá: ${Number(r.price).toLocaleString("vi-VN")}đ${r.discount ? ` (giảm ${r.discount}%)` : ""} | Tồn kho: ${r.stock} | Đánh giá: ${r.rating}/5 | Mô tả: ${r.description ?? ""}`
            ).join("\n");
        }
    } catch (err) {
        console.error("Chatbot: không lấy được danh sách sản phẩm:", err);
        cachedCatalog = "(Lỗi khi tải dữ liệu sản phẩm)";
    }

    cacheTime = Date.now();
    return cachedCatalog!;
}

export const chatWithAI = async (userMessage: string, history: Content[] = []) => {
    try {
        const catalog = await getProductCatalog();

        const systemInstruction = `Bạn là trợ lý tư vấn bán hàng của TechMart – một cửa hàng điện tử uy tín.
Nhiệm vụ của bạn:
1. Tư vấn sản phẩm dựa trên DỮ LIỆU THỰC TẾ bên dưới (không bịa đặt giá hoặc sản phẩm không có trong danh sách).
2. Nếu khách hỏi một sản phẩm không có trong danh sách, hãy trả lời thật thà "hiện TechMart chưa có sản phẩm đó" và gợi ý thay thế phù hợp.
3. Trả lời ngắn gọn, thân thiện, dùng tiếng Việt.
4. Khi tư vấn, ưu tiên sản phẩm còn hàng (tồn kho > 0) và có đánh giá cao.

=== DANH SÁCH SẢN PHẨM HIỆN TẠI ===
${catalog}
=====================================`;

        const model = genAI.getGenerativeModel({
            model: geminiConfig.chatModel,
            systemInstruction,
        });

        const chat = model.startChat({
            history,
            generationConfig: geminiConfig.generationConfig,
        });

        const result = await chat.sendMessage(userMessage);
        return result.response.text();
    } catch (error) {
        console.error("Lỗi Gemini ChatBot:", error);
        return "Xin lỗi, đã xảy ra lỗi khi kết nối với chatbot. Vui lòng thử lại sau.";
    }
};