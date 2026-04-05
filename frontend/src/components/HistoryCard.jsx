import React from 'react';
import { FileText } from 'lucide-react';

export const HistoryCard = ({ title, department, reason, speed, fileName, status }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow gap-3 h-full">
      
      {/* Phần trên: Thông tin */}
      <div>
        <h4 className="font-bold text-gray-800 mb-1 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mb-2">
          {department} . Lý do: {reason} | Tốc độ: {speed}
        </p>
        <button className="flex items-center gap-1.5 text-blue-600 text-xs hover:text-blue-800 hover:underline transition-colors w-fit">
          <FileText size={14} />
          <span>{fileName}</span>
        </button>
      </div>

      {/* Phần dưới: Render trạng thái tương ứng */}
      <div className="flex justify-end mt-2">
        {status === 'approved' && (
          <div className="text-purple-700 font-bold tracking-wide uppercase text-sm py-1.5">
            ĐÃ PHÊ DUYỆT!
          </div>
        )}

        {status === 'rejected_self' && (
          <div className="flex flex-col items-end">
            <span className="px-5 py-1.5 bg-red-500 text-white text-xs font-medium rounded-full shadow-sm">
              Đã từ chối
            </span>
            <a href="#" className="text-blue-500 text-[10px] hover:underline mt-1 mr-3">Lí do</a>
          </div>
        )}

        {status === 'rejected_other' && (
          <div className="flex flex-col items-end">
            <span className="px-5 py-1.5 bg-[#9CB019] text-white text-xs font-medium rounded-full shadow-sm">
              Bị từ chối
            </span>
            <a href="#" className="text-blue-500 text-[10px] hover:underline mt-1 mr-3">Lí do</a>
          </div>
        )}
      </div>

    </div>
  );
};