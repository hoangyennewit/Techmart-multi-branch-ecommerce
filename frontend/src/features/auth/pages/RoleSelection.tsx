import React from 'react';
import { Link } from 'react-router-dom';

const roles = [
  { id: 'director', label: 'Giám đốc', path: '/admin' }, 
  { id: 'tech', label: 'Bộ phận kỹ thuật', path: '/tech' },
  { id: 'store_manager', label: 'Quản lý cửa hàng', path: '/store' },
  { id: 'product_manager', label: 'Quản lý sản phẩm', path: '/product' },
  { id: 'employee', label: 'Nhân viên', path: '/employee' },
];

export const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      
      {/* Khu vực Logo */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="mb-4 flex flex-col items-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full mb-2 border border-purple-200 shadow-sm"></div>
          <div className="w-32 h-10 bg-purple-100 rounded-t-[2rem] rounded-b-xl border border-purple-200 shadow-sm"></div>
        </div>
        
        <h1 className="text-5xl font-bold text-purple-700 mb-2 tracking-wide">
          TechStore
        </h1>
        <p className="text-gray-500 font-medium tracking-wider">
          Nâng tầm cuộc sống số
        </p>
      </div>

      {/* Khung chọn vai trò */}
      <div className="bg-white border border-gray-200 p-8 rounded-[2.5rem] shadow-xl w-full max-w-sm flex flex-col items-center transition-all">
        <h2 className="text-gray-500 font-medium mb-6">Bạn là ai ?</h2>
        
        <div className="w-full flex flex-col gap-3.5">
          {/* Đã xóa dòng comment gây lỗi ở đây */}
          {roles.map((role) => (
            <Link
              key={role.id}
              to={role.path}
              className="w-full py-3.5 px-6 rounded-full border border-purple-200 text-purple-700 bg-purple-50/50 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all font-medium text-sm shadow-sm flex justify-center items-center"
            >
              {role.label}
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
};