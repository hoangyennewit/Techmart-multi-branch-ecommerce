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
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-400">TechStore</h1>
        <p className="text-sm text-gray-600 opacity-70 italic">Nâng tầm cuộc sống số</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-xl hover:bg-gray-100"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="text-right hidden sm:block">
            {/* ✅ Lấy từ token thay vì hardcode */}
            <p className="text-sm text-gray-600">{userInfo.role}</p>
            <p className="font-semibold text-gray-900">{userInfo.name}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded-full flex items-center justify-center transition-transform hover:scale-105">
            <User className="text-blue-600 w-5 h-5" />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg py-2 z-50 overflow-hidden backdrop-blur-xl">
            <div className="px-4 py-3 border-b border-gray-200 sm:hidden">
              <p className="text-xs text-gray-600">{userInfo.role}</p>
              <p className="text-sm font-bold text-gray-900 truncate">{userInfo.name}</p>
            </div>

            <Link
              to="/admin/profile"
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              Thông tin cá nhân
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
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