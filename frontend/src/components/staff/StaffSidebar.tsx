import React from 'react';
import { Search, Send } from 'lucide-react';

export const StaffSidebar = () => {
  return (
    <div className="w-full xl:w-80 flex flex-col gap-6">
      
      {/* Khung Tra cứu tồn kho */}
      <div className="bg-white border border-gray-200 rounded-4xl p-5 shadow-sm h-100 flex flex-col">
        <h3 className="font-bold text-gray-800 mb-1">Tra cứu & Thống kê</h3>
        <p className="text-xs text-gray-500 mb-4 font-medium">Tra cứu tồn kho nhanh</p>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Nhập tên hoặc mã sp..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 transition-all" />
        </div>

        <div className="flex-1 overflow-y-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-purple-800 font-bold text-xs">
              <tr>
                <th className="p-3 border-b border-purple-100">Chi nhánh (4)</th>
                <th className="p-3 border-b border-purple-100 text-right">Số lượng (41)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-600">
              <tr className="hover:bg-gray-50">
                <td className="p-3">CN Quận 1</td>
                <td className="p-3 text-right font-bold text-emerald-600">5 máy (sẵn sàng)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3">CN Quận 3</td>
                <td className="p-3 text-right font-medium">12 máy</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3">CN Quận 5</td>
                <td className="p-3 text-right font-medium">12 máy</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3">CN Quận 8</td>
                <td className="p-3 text-right font-medium">12 máy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Khung Thống kê & Giao ca */}
      <div className="bg-purple-700 text-white rounded-4xl p-5 shadow-lg flex-1 flex flex-col relative overflow-hidden">
        {/* Họa tiết nền mờ mờ cho đẹp */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>

        <div className="flex justify-between items-center border-b border-purple-500/50 pb-3 mb-4 relative z-10">
          <h3 className="font-bold text-lg">Thống kê</h3>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">CA SÁNG</span>
        </div>

        <div className="space-y-2 mb-6 relative z-10 text-purple-50">
          <p className="flex justify-between"><span>Đã tư vấn:</span> <span className="font-bold text-white">15 khách</span></p>
          <p className="flex justify-between"><span>Đơn chốt thành công:</span> <span className="font-bold text-white">5 đơn</span></p>
          <p className="flex justify-between"><span>Doanh thu ca:</span> <span className="font-bold text-yellow-300 text-lg tracking-wide">120.500.000đ</span></p>
        </div>

        <div className="mt-auto relative z-10">
          <textarea 
            placeholder="Ghi chú bàn giao ca..."
            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-purple-200 outline-none focus:bg-white/20 transition-colors resize-none h-20 mb-3"
          ></textarea>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-purple-800 hover:bg-gray-100 font-bold rounded-full transition-transform hover:-translate-y-0.5 shadow-md">
            <Send size={16} /> Gửi báo cáo
          </button>
        </div>
      </div>

    </div>
  );
};