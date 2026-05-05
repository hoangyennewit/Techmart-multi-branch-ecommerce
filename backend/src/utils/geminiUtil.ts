import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

if(!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const geminiAI = new GoogleGenerativeAI(apiKey as string);

export const generateVectorEmbedding = async (text: string): Promise<number[]> => {
    try 
    {
        const model = geminiAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(text);
        const embedding = result.embedding;
        return embedding.values;
    }
    catch (error) 
    {
        console.error("Lỗi khi gọi Gemini API tạo Vector:", error);
        throw new Error("Lỗi khi tạo Vector embedding từ Gemini API.");
    }
};