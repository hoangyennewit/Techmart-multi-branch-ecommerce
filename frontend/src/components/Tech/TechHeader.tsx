import { useState, useRef, useEffect } from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/store/AuthContext';

export const TechHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', role: '' });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('techmart_token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserInfo({
                    name: payload.ho_ten || payload.name || 'Kỹ thuật viên',
                    role: payload.ten_hien_thi || payload.role || 'Kỹ thuật'
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
        logout();
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div className="text-right">
                        <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest">{userInfo.role}</p>
                        <p className="text-gray-800 font-bold text-sm">{userInfo.name}</p>
                    </div>
                    <UserCircle size={36} className="text-gray-400" />
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 overflow-hidden">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left font-medium"
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
