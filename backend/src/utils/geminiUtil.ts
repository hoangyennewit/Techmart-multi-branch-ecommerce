import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfig } from "../config/gemini";

const geminiAI = new GoogleGenerativeAI(geminiConfig.apiKey);

export const generateVectorEmbedding = async (text: string): Promise<number[]> => {
    try 
    {
        const model = geminiAI.getGenerativeModel({ model: geminiConfig.embeddingModel });
        const result = await model.embedContent(text);
        return result.embedding.values;
    }
    catch (error) 
    {
        console.error("Lỗi khi gọi Gemini API tạo Vector:", error);
        throw new Error("Lỗi khi tạo Vector embedding từ Gemini API.");
    }
};