import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TechConfigCard, TechConfigItem } from '../../../components/Tech/TechConfigCard';
import { TechHeader } from '../../../components/Tech/TechHeader';

export const TechConfigPage = () => {
  const location = useLocation();
  const path = location.pathname;

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

  const handleStatusChange = (id: string, isConnected: boolean) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, isConnected } : config
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <TechHeader />

        {/* --- THANH MENU TABS CÓ ROUTER --- */}
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4">
          <Link to="/tech" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Quản lý tài khoản</Link>
          <Link to="/tech/permissions" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/permissions' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Phân quyền</Link>
          <Link to="/tech/config" className={`relative px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/config' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>
            Cấu hình
            <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">5</span>
          </Link>
          <Link to="/tech/security" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/security' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Bảo mật & Log</Link>
        </div>

        <div className="bg-gray-100/60 p-8 rounded-[3rem] border border-gray-200 min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs.map(config => (
              <TechConfigCard key={config.id} item={config} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};