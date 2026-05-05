import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const chatWithAI = async (userMessage: string, history: any[] = [])  => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            systemInstruction: "Bạn là chuyên gia tư vấn kỹ thuật tại Techmart. Bạn thân thiện, am hiểu về laptop, điện thoại và phụ kiện. Hãy tư vấn sản phẩm dựa trên nhu cầu khách hàng và luôn khuyến khích họ mua hàng tại website.",
        });

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });

        const result = await chat.sendMessage(userMessage);
        const reponse = await result.response;

        return reponse.text();
    } catch (error) {
        console.error("Lỗi Gemini ChatBot:", error);
        return "Xin lỗi, đã xảy ra lỗi khi kết nối với chatbot. Vui lòng thử lại sau.";
    }
}