// src/features/chatbot/api/chatbotApi.ts
export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export const sendChatMessage = async (message: string, history: ChatMessage[]) => {
    try {
        const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/chatbot';
        const formattedHistory = history.map((m) => ({
            role: m.role,
            parts: [{text: m.content}],
        }));

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                history: formattedHistory,
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.reply;
    }
    catch (error) {
        console.error("Lỗi ở sendChatMessage thuộc Chatbot API:", error);
        throw error;
    }
};