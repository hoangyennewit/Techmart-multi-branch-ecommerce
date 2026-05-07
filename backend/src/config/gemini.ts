import dotenv from 'dotenv';
dotenv.config();

export const geminiConfig = {
    apiKey: process.env.GEMINI_API_KEY || "",
    embeddingModel: "text-embedding-004", // Cấu hình cho tính năng nhúng vector (Tìm kiếm ngữ nghĩa / RAG)
    chatModel: "gemini-flash-latest", // Cấu hình cho Chatbot
    systemInstruction: "Bạn là chuyên gia tư vấn kỹ thuật tại Techmart. Bạn thân thiện, am hiểu về laptop, điện thoại và phụ kiện. Hãy tư vấn sản phẩm dựa trên nhu cầu khách hàng và luôn khuyến khích họ mua hàng tại website.",
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
    }
};

if(!geminiConfig.apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}