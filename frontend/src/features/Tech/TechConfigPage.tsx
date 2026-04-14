import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { TechConfigCard, TechConfigItem } from '../../components/Tech/TechConfigCard';

export const TechConfigPage = () => {
  // Dữ liệu mô phỏng giống y hệt như lưới 3x3 trong hình ảnh của bạn
  const [configs, setConfigs] = useState<TechConfigItem[]>([
    { id: '1', title: 'Thanh toán VN Pay', apiKey: 'vnpay_1234567890abcdef', isConnected: true },
    { id: '2', title: 'Thanh toán MOMO', apiKey: 'momo_1234567890abcdef', isConnected: false },
    { id: '3', title: 'Thanh toán MOMO', apiKey: 'momo_0987654321fedcba', isConnected: true },
    { id: '4', title: 'Thanh toán GHN', apiKey: 'ghn_1234567890abcdef', isConnected: true },
    { id: '5', title: 'Thanh toán MOMO', apiKey: 'momo_1122334455667788', isConnected: false },
    { id: '6', title: 'Thanh toán MOMO', apiKey: 'momo_aabbccddeeff1122', isConnected: true },
    { id: '7', title: 'Thanh toán GHN', apiKey: 'ghn_9988776655443322', isConnected: true },
    { id: '8', title: 'Thanh toán MOMO', apiKey: 'momo_5544332211aabbcc', isConnected: true },
    { id: '9', title: 'Thanh toán MOMO', apiKey: 'momo_1029384756abcdef', isConnected: false },
  ]);

  // Hàm xử lý khi bấm nút Connect / Disconnect
  const handleStatusChange = (id: string, isConnected: boolean) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, isConnected } : config
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest">Kỹ thuật</p>
              <p className="text-gray-800 font-bold text-sm">Nguyễn Văn Chín</p>
            </div>
            <UserCircle size={36} className="text-gray-400" />
          </div>
        </div>

        {/* --- THANH MENU TABS --- */}
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4">
          <button className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all border border-transparent">
            Tài khoản
          </button>
          <button className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all border border-transparent">
            Phân quyền
          </button>
          {/* Tab Cấu hình đang Active */}
          <button className="px-6 py-2.5 bg-white text-purple-700 font-bold rounded-full shadow-sm border border-purple-200 relative">
            Cấu hình
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
          </button>
          <button className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all border border-transparent">
            Bảo mật
          </button>
        </div>

        {/* --- GRID HIỂN THỊ CÁC THẺ CẤU HÌNH --- */}
        <div className="bg-gray-100/60 p-8 rounded-[3rem] border border-gray-200 min-h-[500px]">
          {/* Lưới 3 cột giống hệt thiết kế */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs.map(config => (
              <TechConfigCard 
                key={config.id} 
                item={config} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};