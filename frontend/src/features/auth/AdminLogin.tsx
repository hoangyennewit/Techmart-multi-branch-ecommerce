import React, { useState } from 'react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Đang thử đăng nhập với:', { email, password });
  };

  return (
    // Nền xám nhạt/trắng để tạo cảm giác sạch sẽ, đồng bộ với Admin Dashboard
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
      
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Cột trái: Logo và Slogan */}
        <div className="flex flex-col items-center text-center md:items-center">
          
          {/* Vẽ lại icon Avatar với tông màu tím nhạt phù hợp nền sáng */}
          <div className="mb-4 flex flex-col items-center">
            {/* Cái đầu */}
            <div className="w-20 h-20 bg-purple-100 rounded-full mb-2 border border-purple-200"></div>
            {/* Cái vai */}
            <div className="w-32 h-10 bg-purple-100 rounded-t-[2rem] rounded-b-xl border border-purple-200"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-3 tracking-wide">
            TechStore
          </h1>
          <p className="text-lg text-gray-500 font-medium tracking-wider">
            Nâng tầm cuộc sống số
          </p>
        </div>

        {/* Cột phải: Form Đăng nhập */}
        <div className="flex flex-col items-center justify-center">
          <form 
            onSubmit={handleLogin}
            className="w-full max-w-sm flex flex-col items-center"
          >
            {/* Khung form nền trắng, có bóng mờ 3D */}
            <div className="w-full bg-white border border-gray-200 p-8 rounded-[2rem] shadow-xl flex flex-col gap-5">
              
              <input
                type="text"
                placeholder="Tên đăng nhập/ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 px-6 py-3.5 rounded-full outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                required
              />
              
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 px-6 py-3.5 rounded-full outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                required
              />

            </div>

            {/* Nút đăng nhập nổi bật với màu tím */}
            <button 
              type="submit"
              className="mt-8 px-12 py-3 bg-purple-700 text-white font-medium text-sm rounded-full hover:bg-purple-800 hover:shadow-lg transition-all shadow-md"
            >
              Đăng nhập
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};