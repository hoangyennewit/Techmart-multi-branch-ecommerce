import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import { UserCircle } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Khai báo location
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy vai trò đã chọn từ state, nếu không có thì mặc định là staff
    const role = location.state?.selectedRole || 'staff';

    // Bản đồ điều hướng: Vai trò -> Đường dẫn tương ứng
    const pathMap: Record<string, string> = {
      admin: '/admin',
      tech: '/tech',
      manager: '/store',      // Quản lý cửa hàng dùng path /store
      product: '/product',
      staff: '/staff'
    };

    // Chuyển hướng đúng trang
    navigate(pathMap[role] || '/staff');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-end animate-in slide-in-from-left-8 duration-700">
          <UserCircle size={100} className="text-purple-300 mb-4" />
          <h1 className="text-7xl font-bold text-purple-800 tracking-wide mb-2">TechStore</h1>
          <p className="text-gray-500 font-medium text-xl">Nâng tầm cuộc sống số</p>
        </div>

        <div className="flex-1 w-full max-w-md animate-in slide-in-from-right-8 duration-700">
          <form onSubmit={handleLogin} className="bg-white border border-gray-200 rounded-[3rem] p-10 shadow-2xl flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="w-full space-y-5 mb-10 mt-4">
              <input 
                type="text" 
                placeholder="Tên đăng nhập/ Email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm"
                required
              />
              <input 
                type="password" 
                placeholder="Mật khẩu" 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            <button type="submit" className="px-12 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-full shadow-xl transition-transform hover:-translate-y-1">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};