import React from 'react';

// Cấu trúc dữ liệu của 1 thẻ cấu hình
export interface TechConfigItem {
  id: string;
  title: string;
  apiKey: string;
  isConnected: boolean;
}

interface Props {
  item: TechConfigItem;
  onStatusChange: (id: string, isConnected: boolean) => void;
}

export const TechConfigCard = ({ item, onStatusChange }: Props) => {
  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-300 ${
      item.isConnected 
        ? 'bg-white border-green-200 shadow-sm hover:shadow-md' // Trạng thái Connected: Nền trắng, viền xanh lá nhạt
        : 'bg-red-50 border-red-300 shadow-sm' // Trạng thái Disconnected: Nền đỏ nhạt (giống hình gốc của bạn nhưng hợp với Light Theme)
    }`}>
      
      {/* Tiêu đề */}
      <h3 className={`text-xl font-bold mb-5 ${item.isConnected ? 'text-gray-800' : 'text-red-800'}`}>
        {item.title}
      </h3>
      
      {/* Khung nhập API Key (được làm mờ) */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm font-bold text-gray-500 w-[60px]">API Key:</span>
        <input 
          type="password" 
          value={item.apiKey} 
          readOnly
          className={`flex-1 border rounded-full px-5 py-2 text-sm outline-none font-mono tracking-[0.2em] ${
            item.isConnected ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-red-100/50 border-red-200 text-red-500'
          }`}
        />
      </div>

      {/* Cụm nút Kết nối */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-500 w-[60px]">Kết nối:</span>
        <div className="flex gap-2">
          {/* Nút Disconnect */}
          <button 
            onClick={() => onStatusChange(item.id, false)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
              !item.isConnected 
                ? 'bg-red-500 text-white border-red-500 shadow-md scale-105' // Đang active Disconnect
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-red-50' // Chưa active
            }`}
          >
            Disconnect
          </button>
          
          {/* Nút Connect */}
          <button 
            onClick={() => onStatusChange(item.id, true)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
              item.isConnected 
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md scale-105' // Đang active Connect
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-emerald-50' // Chưa active
            }`}
          >
            Connect
          </button>
        </div>
      </div>

    </div>
  );
};