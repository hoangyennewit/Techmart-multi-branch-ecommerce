import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho cảnh báo
export interface WarningItem {
  id: number;
  text: string;
}

interface Props {
  warnings: WarningItem[];
}

export const TechSecurityWarnings = ({ warnings }: Props) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-red-100 flex-1">
      <div className="flex items-center gap-3 justify-center mb-8 bg-red-50 w-max mx-auto px-6 py-2 rounded-full border border-red-100">
        <AlertTriangle className="text-red-500" size={20} />
        <h2 className="text-xl font-bold text-red-600">Cảnh báo đăng nhập</h2>
      </div>

      <div className="space-y-4">
        {warnings.map(warn => (
          <p key={warn.id} className="text-red-500 font-medium text-center bg-red-50/50 py-2 rounded-lg">
            {warn.text}
          </p>
        ))}
        {warnings.length === 0 && (
          <p className="text-gray-400 text-center italic">Không có cảnh báo nào.</p>
        )}
      </div>
    </div>
  );
};