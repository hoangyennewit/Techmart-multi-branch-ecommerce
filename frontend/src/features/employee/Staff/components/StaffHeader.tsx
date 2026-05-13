import { UserCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StaffHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ 
        name: '', 
        role: '',
        branch: '',
        shift: ''
    });
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
                    name: payload.ho_ten || payload.name || 'Staff',
                    role: payload.ten_hien_thi || payload.role || 'Nhân viên',
                    // Bổ sung lấy dữ liệu thật từ payload (thay đổi key nếu backend của bạn dùng tên khác)
                    branch: payload.chi_nhanh || payload.branch || 'Chưa xác định',
                    shift: payload.ca_lam_viec || payload.shift || 'Đang cập nhật'
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
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
            </div>
          
            <div className="flex items-center gap-4 bg-white px-6 py-2.5 rounded-full shadow-sm border border-gray-100">
                <div className="text-right flex flex-col justify-center">
                    <p className="text-purple-600 text-[11px] font-bold uppercase tracking-widest leading-tight">{userInfo.role}</p>
                    <p className="text-gray-800 font-bold text-sm leading-tight">{userInfo.name}</p>
                </div>
                
                <div className="h-8 w-px bg-gray-200 mx-1"></div>
                
                <div className="text-left flex flex-col justify-center">
                    {/* Đã thay thế bằng dữ liệu thật */}
                    <p className="text-gray-500 text-xs font-bold leading-tight">{userInfo.branch}</p>
                    <p className="text-emerald-600 text-xs font-bold leading-tight">{userInfo.shift}</p>
                </div>

                {/* Bọc thêm ref và onClick để xài được hàm handleLogout bạn đã viết */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center focus:outline-none"
                    >
                        <UserCircle size={38} className="text-gray-400 ml-2 hover:text-purple-600 transition-colors" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>        
    );
}