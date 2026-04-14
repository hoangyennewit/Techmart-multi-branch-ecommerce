import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export const HistoryTable = () => {
  // Dữ liệu mô phỏng theo đúng thiết kế của bạn
  const historyData = [
    { id: 1, type: 'Thông tin sản phẩm', action: 'Cập nhật', details: 'Nhập thêm 15 điện thoại ...', time: '00:00:00 1/3/2026' },
    { id: 2, type: 'Thông tin danh mục', action: 'Tạo mới', details: 'Tạo Hãng Apple trong danh mục Điện thoại', time: '00:00:00 1/3/2026' },
    { id: 3, type: 'Chương trình khuyến mãi', action: 'Tạo mới', details: '', time: '00:00:00 1/3/2026' },
    { id: 4, type: 'Điều phối', action: 'Cập nhật', details: 'Nhập kho tới chi nhánh', time: '' },
    { id: 5, type: 'Điều phối', action: 'Cập nhật', details: 'Xuất kho tới chi nhánh', time: '' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Thanh Tìm kiếm */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm kiếm lịch sử..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 transition-colors shadow-sm" 
          />
        </div>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl flex-1">
        <table className="w-full text-left text-sm min-w-[800px]">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b w-1/4">Loại</th>
              <th className="p-4 border-b w-1/6">
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
                  Hành động <ArrowUpDown size={12}/>
                </div>
              </th>
              <th className="p-4 border-b w-2/5">Chi tiết</th>
              <th className="p-4 border-b w-1/4">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historyData.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="p-4 font-bold text-gray-800">{item.type}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.action === 'Tạo mới' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.action}
                  </span>
                </td>
                <td className="p-4 text-gray-600 italic">{item.details}</td>
                <td className="p-4 text-gray-500 font-medium">{item.time}</td>
              </tr>
            ))}
            {/* Các dòng trống đệm thêm cho đẹp */}
            {[1, 2, 3, 4, 5].map(i => <tr key={`empty-${i}`}><td colSpan={4} className="p-6"></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};