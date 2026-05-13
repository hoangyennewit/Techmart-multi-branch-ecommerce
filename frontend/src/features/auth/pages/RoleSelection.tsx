import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleClick = (rolePath: string) => {
    // Truyền thêm object state chứa vai trò đã chọn
    navigate('/login', { state: { selectedRole: rolePath } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
      <div className="text-center mb-10 flex flex-col items-center animate-in slide-in-from-top-4 duration-500">
        <UserCircle size={80} className="text-purple-300 mb-2" />
        <h1 className="text-6xl font-bold text-purple-800 tracking-wide mb-2">TechStore</h1>
        <p className="text-gray-500 font-medium text-lg">Nâng tầm cuộc sống số</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-[3rem] p-10 shadow-xl w-full max-w-sm flex flex-col gap-4 animate-in zoom-in-95 duration-500">
        <h2 className="text-center text-gray-400 font-bold mb-4 uppercase tracking-widest text-sm">Bạn là ai ?</h2>
        
        {/* Truyền đúng từ khóa role để LoginPage nhận diện */}
        <button onClick={() => handleRoleClick('admin')} className="w-full py-3.5 px-6 rounded-full border-2 border-gray-100 font-bold text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-sm">Giám đốc</button>
        <button onClick={() => handleRoleClick('tech')} className="w-full py-3.5 px-6 rounded-full border-2 border-gray-100 font-bold text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-sm">Bộ phận kỹ thuật</button>
        <button onClick={() => handleRoleClick('manager')} className="w-full py-3.5 px-6 rounded-full border-2 border-gray-100 font-bold text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-sm">Quản lý cửa hàng</button>
        <button onClick={() => handleRoleClick('product')} className="w-full py-3.5 px-6 rounded-full border-2 border-gray-100 font-bold text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-sm">Quản lý sản phẩm</button>
        <button onClick={() => handleRoleClick('staff')} className="w-full py-3.5 px-6 rounded-full border-2 border-gray-100 font-bold text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-sm">Nhân viên</button>
      </div>
    </div>
  );
};