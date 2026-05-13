import React, { useState } from 'react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // GỌI BACKEND: Đổi URL này thành API thật của team bạn (VD: http://localhost:8080/api/login)
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu token vào localStorage và chuyển hướng
        localStorage.setItem('accessToken', data.token);
        alert('Đăng nhập thành công!');
        // window.location.href = '/admin'; // Chuyển hướng sang trang admin
      } else {
        alert(data.message || 'Sai tài khoản hoặc mật khẩu!');
      }
    } catch (error) {
      console.error('Lỗi kết nối server:', error);
      alert('Không thể kết nối đến Backend!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* ... (Phần Logo giữ nguyên như cũ) ... */}
        <div className="flex flex-col items-center text-center md:items-center">
          <div className="mb-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full mb-2 border border-purple-200"></div>
            <div className="w-32 h-10 bg-purple-100 rounded-t-[2rem] rounded-b-xl border border-purple-200"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-3 tracking-wide">TechStore</h1>
          <p className="text-lg text-gray-500 font-medium tracking-wider">Nâng tầm cuộc sống số</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col items-center">
            <div className="w-full bg-white border border-gray-200 p-8 rounded-[2rem] shadow-xl flex flex-col gap-5">
              <input
                type="text"
                placeholder="Tên đăng nhập/ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 px-6 py-3.5 rounded-full outline-none focus:border-purple-500 transition-all text-sm"
                required
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 px-6 py-3.5 rounded-full outline-none focus:border-purple-500 transition-all text-sm"
                required
              />
            </div>
            
            {/* Hiển thị chữ Loading khi đang gọi API */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`mt-8 px-12 py-3 text-white font-medium text-sm rounded-full transition-all shadow-md ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'}`}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};