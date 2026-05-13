import React from 'react';

// Cấu trúc dữ liệu của 1 thẻ
export interface TechAccount {
  id: string;
  roleTitle: string; 
  username: string;  
  password: string;
  role: string;      
  isLocked: boolean;
}

interface Props {
  account: TechAccount;
  onEdit: (acc: TechAccount) => void;
  onToggleLock: (id: string) => void;
}

export const TechAccountCard = ({ account, onEdit, onToggleLock }: Props) => {
  return (
    <div className={`p-5 rounded-[2rem] border transition-all duration-300 flex justify-between items-center ${
      account.isLocked 
        ? 'bg-gray-100/80 border-gray-200 opacity-60 grayscale-[0.5]' // Trạng thái ĐÃ KHÓA: Mờ đi, nền xám
        : 'bg-white border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300' // Trạng thái BÌNH THƯỜNG: Sáng, có bóng mờ
    }`}>
      
      {/* Thông tin Text */}
      <div>
        <h3 className={`text-lg font-bold mb-1.5 ${account.isLocked ? 'text-gray-600' : 'text-purple-800'}`}>
          {account.roleTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-0.5">
          Tài khoản: <span className={`font-medium ${account.isLocked ? 'text-gray-500' : 'text-purple-600'}`}>{account.username}</span>
        </p>
        <p className="text-sm text-gray-500">
          Mật khẩu: <span className="font-medium text-gray-700">{account.password}</span>
        </p>
      </div>

      {/* Cụm Nút Bấm Tương Tác */}
      <div className="flex gap-2.5">
        <button 
          onClick={() => onEdit(account)} // Kích hoạt sự kiện Sửa
          className="px-6 py-2.5 text-sm font-bold rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all shadow-sm"
        >
          Sửa
        </button>
        <button 
          onClick={() => onToggleLock(account.id)} // Kích hoạt sự kiện Khóa/Mở
          className={`px-6 py-2.5 text-sm font-bold rounded-full border transition-all w-28 shadow-sm ${
            account.isLocked 
              ? 'bg-gray-800 text-white border-gray-800 hover:bg-gray-900' // Nút khi đã khóa biến thành nút "Mở" tối màu
              : 'bg-white border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
          }`}
        >
          {account.isLocked ? 'Mở' : 'Khóa'}
        </button>
      </div>

    </div>
  );
};