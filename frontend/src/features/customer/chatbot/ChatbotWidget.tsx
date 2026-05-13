// src/features/chatbot/ChatbotWidget.tsx
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { sendChatMessage, ChatMessage } from "./api/chatbotApi";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await sendChatMessage(input, messages);
      setMessages((prevMessages) => [...prevMessages, { role: "model", content: reply }]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="mb-4 w-87.5 h-112.5 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-100 transition-all duration-300 transform origin-bottom-right">
          {/* Header với hiệu ứng Gradient */}
          <div className="bg-linear-to-r from-purple-700 to-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold tracking-wide">TechStore AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-200 transition-colors bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Khu vực nội dung tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-70 mt-4">
                <span className="text-4xl">👋</span>
                <p className="text-gray-500 text-sm font-medium">
                  Xin chào! Mình là chuyên gia tư vấn của TechStore.<br/>Mình có thể giúp gì cho bạn hôm nay?
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-linear-to-br from-purple-600 to-indigo-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "user" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    /* Dịch Markdown cho tin nhắn của AI với Tailwind Typography thu gọn */
                    <div className="markdown-body space-y-2">
                      <ReactMarkdown 
                        components={{
                          h3: ({node, ...props}) => <h3 className="text-base font-bold text-purple-700 mt-3 mb-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-purple-900" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Hiệu ứng đang gõ phím (Typing Indicator) */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            {/* Điểm neo để tự động cuộn xuống */}
            <div ref={messagesEndRef} />
          </div>

          {/* Khu vực nhập tin nhắn */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
            <input
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all"
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="bg-purple-600 text-white p-2.5 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-11 h-11"
            >
              {/* Icon Gửi */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Nút Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-2xl transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatbotWidget;