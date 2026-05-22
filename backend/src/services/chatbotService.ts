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

        const systemInstruction = `Bạn là trợ lý tư vấn bán hàng của TechMart – cửa hàng điện tử chuyên laptop, điện thoại và phụ kiện.

## NGUYÊN TẮC QUAN TRỌNG NHẤT – PHẢI TUÂN THỦ TUYỆT ĐỐI:

**QUY TẮC 1 – SẢN PHẨM KHÔNG CÓ TRONG DANH SÁCH:**
Nếu khách hỏi về bất kỳ sản phẩm nào KHÔNG xuất hiện trong "DANH SÁCH SẢN PHẨM HIỆN TẠI" bên dưới:
→ Trả lời NGAY: "Hiện TechMart KHÔNG kinh doanh [tên sản phẩm]."
→ KHÔNG giải thích lý do vì sao sản phẩm đó chưa ra mắt hay đã cũ (đó không phải việc của cửa hàng).
→ Sau đó gợi ý 1-2 sản phẩm TƯƠNG TỰ CÓ SẴN TRONG DANH SÁCH phù hợp với nhu cầu khách.
→ Ví dụ: Khách hỏi "iPhone 17" → "Hiện TechMart không kinh doanh iPhone 17. Bạn có thể tham khảo iPhone 16 Pro Max với giá X đ đang có sẵn tại cửa hàng."

**QUY TẮC 2 – SẢN PHẨM HẾT HÀNG (tồn kho = 0):**
→ Thông báo rõ "Sản phẩm này hiện đã hết hàng."
→ Gợi ý sản phẩm thay thế cùng phân khúc còn hàng.

**QUY TẮC 3 – CHỈ TƯ VẤN DỰA TRÊN DỮ LIỆU THẬT:**
→ KHÔNG bịa đặt giá, thông số, hay sản phẩm không có trong danh sách.
→ Mọi thông tin giá cả, tồn kho, đánh giá phải lấy từ danh sách bên dưới.

## Quy tắc phụ:
- Trả lời ngắn gọn, thân thiện, dùng tiếng Việt.
- Ưu tiên gợi ý sản phẩm còn hàng và đánh giá cao.
- Không lan man hoặc giải thích dài dòng về thị trường công nghệ chung.

=== DANH SÁCH SẢN PHẨM HIỆN TẠI CỦA TECHMART ===
${catalog}
=================================================`;


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