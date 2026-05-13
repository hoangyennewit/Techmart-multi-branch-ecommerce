import React from 'react';
import { User } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Cột trái: Logo */}
      <div>
        <h1 className="text-3xl font-bold text-purple-700">TechStore</h1>
        <p className="text-sm text-gray-500 italic">Nâng tầm cuộc sống số</p>
      </div>

      {/* Cột phải: User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-gray-500">Giám đốc</p>
          <p className="font-semibold text-gray-800">Nguyễn Văn Mười</p>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};