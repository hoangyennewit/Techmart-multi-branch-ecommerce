import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfig } from "../config/gemini";

const genAI = new GoogleGenerativeAI(geminiConfig.apiKey);

export const chatWithAI = async (userMessage: string, history: Content[] = [])  => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: geminiConfig.chatModel,
            systemInstruction: geminiConfig.systemInstruction
        });

        const chat = model.startChat({
            history: history,
            generationConfig: geminiConfig.generationConfig
        });

        const result = await chat.sendMessage(userMessage);
        const response  = result.response;
        return response.text();
    } catch (error) {
        console.error("Lỗi Gemini ChatBot:", error);
        return "Xin lỗi, đã xảy ra lỗi khi kết nối với chatbot. Vui lòng thử lại sau.";
    }
}