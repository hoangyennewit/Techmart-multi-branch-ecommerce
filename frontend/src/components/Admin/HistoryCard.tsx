import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface HistoryCardProps {
  title: string;
  department: string;
  reason: string;
  speed: string;
  fileName: string;
  status: 'approved' | 'rejected_self' | 'rejected_other';
  // Thêm 2 trường dữ liệu mới cho phần popup lí do
  rejectReasonText?: string;
  rejectReasonFile?: string;
}

export const HistoryCard = ({ 
  title, department, reason, speed, fileName, status, rejectReasonText, rejectReasonFile 
}: HistoryCardProps) => {
  
  // State để quản lý việc ẩn/hiện popup lí do
  const [showReason, setShowReason] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow gap-3 h-full">
      <div>
        <h4 className="font-bold text-gray-800 mb-1 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mb-2">{department} . Lý do: {reason} | Tốc độ: {speed}</p>
        <button className="flex items-center gap-1.5 text-blue-600 text-xs hover:underline w-fit">
          <FileText size={14} /><span>{fileName}</span>
        </button>
      </div>

      <div className="flex justify-end mt-2">
        {/* TRẠNG THÁI: ĐÃ PHÊ DUYỆT */}
        {status === 'approved' && (
          <div className="text-purple-700 font-bold uppercase text-sm py-1.5">
            ĐÃ PHÊ DUYỆT!
          </div>
        )}

        {/* TRẠNG THÁI: ĐÃ TỪ CHỐI (Mình từ chối) */}
        {status === 'rejected_self' && (
          <div className="flex flex-col items-end relative">
            <span className="px-5 py-1.5 bg-red-500 text-white text-xs rounded-full">Đã từ chối</span>
            <button 
              onClick={() => setShowReason(!showReason)}
              className="text-blue-500 text-[10px] mt-1 mr-3 cursor-pointer hover:underline outline-none"
            >
              Lí do
            </button>
            
            {/* Popup Bong bóng màu tím */}
            {showReason && (
              <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-purple-600 text-white text-xs rounded-xl shadow-lg z-10">
                <p>{rejectReasonText}</p>
                {rejectReasonFile && (
                  <div className="flex items-center gap-1.5 mt-2 text-purple-200 hover:text-white cursor-pointer">
                    <FileText size={12} /><span>{rejectReasonFile}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TRẠNG THÁI: BỊ TỪ CHỐI (Người khác từ chối) */}
        {status === 'rejected_other' && (
          <div className="flex flex-col items-end relative">
            <span className="px-5 py-1.5 bg-[#9CB019] text-white text-xs rounded-full">Bị từ chối</span>
            <button 
              onClick={() => setShowReason(!showReason)}
              className="text-blue-500 text-[10px] mt-1 mr-3 cursor-pointer hover:underline outline-none"
            >
              Lí do
            </button>

            {/* Popup Bong bóng màu tím */}
            {showReason && (
              <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-purple-600 text-white text-xs rounded-xl shadow-lg z-10">
                <p>{rejectReasonText}</p>
                {rejectReasonFile && (
                  <div className="flex items-center gap-1.5 mt-2 text-purple-200 hover:text-white cursor-pointer">
                    <FileText size={12} /><span>{rejectReasonFile}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};