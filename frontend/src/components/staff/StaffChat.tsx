import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

export const StaffChat = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [msgInput, setMsgInput] = useState('');
  
  // Dữ liệu mô phỏng
  const chatList = [
    { id: 0, name: 'Anh Long', preview: 'Hỏi về iPhone 14 Plus...' },
    { id: 1, name: 'Chị Mai', preview: 'Cho mình hỏi còn hàng không?' },
    { id: 2, name: 'Em Tuấn', preview: 'Bảo hành màn hình thế nào ạ?' },
    { id: 3, name: 'Anh Tuấn Anh', preview: 'Ship về Quận 7 bao lâu?' },
  ];

  return (
    <div className="w-full xl:w-80 flex flex-col gap-4">
      {/* Khung danh sách Chat */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-4 shadow-sm h-[300px] flex flex-col">
        <h3 className="font-bold text-purple-800 text-center mb-4 pb-2 border-b border-gray-100">Chat & Tư vấn</h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {chatList.map((chat, idx) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(idx)}
              className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                activeChat === idx 
                  ? 'bg-purple-50 border-purple-200 shadow-sm' 
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <p className={`text-sm font-bold ${activeChat === idx ? 'text-purple-700' : 'text-gray-700'}`}>
                {chat.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Khung cửa sổ Chat */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-4 shadow-sm h-[400px] flex flex-col">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <User size={16} />
          </div>
          <span className="font-bold text-gray-700 text-sm">{chatList[activeChat].name}</span>
        </div>

        {/* Khung tin nhắn */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          <div className="flex gap-2 items-end">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500"><User size={12}/></div>
            <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl rounded-bl-none text-sm w-3/4">
              Dạ shop cho mình hỏi iPhone 14 Plus còn màu tím không ạ?
            </div>
          </div>
          <div className="flex gap-2 items-end justify-end">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-br-none text-sm w-3/4">
              Chào anh ạ, sản phẩm này hiện tại bên em vẫn còn hàng sẵn ở chi nhánh Quận 1 nhé!
            </div>
          </div>
        </div>

        {/* Ô nhập chat */}
        <div className="relative">
          <input 
            type="text" 
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setMsgInput('')}
            placeholder="Nhập tin nhắn..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
          <button 
            onClick={() => setMsgInput('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};