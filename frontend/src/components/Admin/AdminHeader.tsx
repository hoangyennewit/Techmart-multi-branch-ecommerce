import { useState, useRef, useEffect } from 'react';
import { User, LogOut, UserCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', role: '' });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const token = localStorage.getItem('techmart_token');
    if (token) {
      try {
        // Decode JWT payload (phần giữa)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserInfo({
          name: payload.ho_ten || payload.name || 'Admin',
          role: payload.ten_hien_thi || payload.role || 'Quản trị'
        });
      } catch (e) {
        console.error('Lỗi decode token:', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('techmart_token');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8 relative">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-purple-200">TechStore</h1>
        <p className="text-sm text-purple-300 opacity-70 italic">Nâng tầm cuộc sống số</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-xl hover:bg-white/5"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="text-right hidden sm:block">
            {/* ✅ Lấy từ token thay vì hardcode */}
            <p className="text-sm text-gray-400">{userInfo.role}</p>
            <p className="font-semibold text-gray-100">{userInfo.name}</p>
          </div>
          <div className="w-10 h-10 bg-[#2A1B3D] border border-[#3B2556] rounded-full flex items-center justify-center transition-transform hover:scale-105">
            <User className="text-purple-400 w-5 h-5" />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-[#1D0C33] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl">
            <div className="px-4 py-3 border-b border-white/10 sm:hidden">
              <p className="text-xs text-gray-400">{userInfo.role}</p>
              <p className="text-sm font-bold text-white truncate">{userInfo.name}</p>
            </div>

            <Link
              to="/admin/profile"
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              Thông tin cá nhân
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};