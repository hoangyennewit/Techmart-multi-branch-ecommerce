import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
  onRejectClick: () => void;
}

export const DispatchRequestTab = ({ onRejectClick }: Props) => {
  // Tạo mảng 5 phần tử ảo để hiển thị
  const requests = [1, 2, 3, 4, 5];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {requests.map((item) => (
        <div key={item} className="bg-white border border-gray-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-gray-800 text-base">
              <span className="text-purple-700">[NHẬP KHO]</span> 50 iPhone 16 Pro Max
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Inventory . Lý do: Tồn kho hiện tại &lt; 5 | Tốc độ: 10 máy/ngày
            </p>
            <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors pt-1">
              <FileText size={14} /> BaoCaoTonKho.pdf
            </button>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={onRejectClick}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm transition-all shadow-sm hover:-translate-y-0.5"
            >
              Từ chối
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm transition-all shadow-sm hover:-translate-y-0.5">
              Xác nhận
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};