import { Request, Response } from "express";
import { chatWithAI } from "../services/chatbotService";

export const handleChatbot = async (req: Request, res: Response) => {
    try {
        const { message, history } = req.body;
        if(!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }
        const reply = await chatWithAI(message, history || []);
        return res.status(200).json({
            success: true,
            reply: reply
        });
    } catch(error: any) {
        console.error("Lỗi tại chatbotController:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xử lý yêu cầu chatbot."
        });
    }
}