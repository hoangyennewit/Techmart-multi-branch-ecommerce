import React from 'react';
import { FileText } from 'lucide-react';

interface PromoCardProps {
  id: number;
  title: string;
  department: string;
  budget: string;
  goal: string;
  fileName: string;
  status: 'pending' | 'approved' | 'rejected'; // Thêm trạng thái rejected
  onApprove: (id: number) => void; // Hàm xử lý khi bấm Phê duyệt
  onReject: (id: number) => void;  // Hàm xử lý khi bấm Từ chối
}

export const PromoCard = ({ id, title, department, budget, goal, fileName, status, onApprove, onReject }: PromoCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-4">
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">{department} . Ngân sách: {budget} | Mục tiêu: {goal}</p>
        <button className="flex items-center gap-1.5 text-blue-600 text-sm hover:underline w-fit">
          <FileText size={16} /><span>{fileName}</span>
        </button>
      </div>
      
      <div className="flex items-center justify-end min-w-[200px]">
        {/* Nếu đã duyệt -> Hiện chữ màu tím */}
        {status === 'approved' && <div className="text-purple-700 font-bold uppercase text-lg">Đã phê duyệt!</div>}
        
        {/* Nếu đã từ chối -> Hiện chữ màu xám/đỏ nhạt */}
        {status === 'rejected' && <div className="text-gray-500 font-bold uppercase text-lg">Đã từ chối!</div>}
        
        {/* Nếu đang chờ (pending) -> Hiện 2 nút bấm */}
        {status === 'pending' && (
          <div className="flex gap-3">
            <button 
              onClick={() => onReject(id)} 
              className="px-6 py-2 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors"
            >
              Từ chối
            </button>
            <button 
              onClick={() => onApprove(id)} 
              className="px-6 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
            >
              Phê duyệt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};