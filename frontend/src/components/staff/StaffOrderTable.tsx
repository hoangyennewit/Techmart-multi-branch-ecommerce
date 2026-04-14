import React from 'react';
import { Search, CheckCircle, FileText, Printer, ArrowUpDown } from 'lucide-react';

export const StaffOrderTable = () => {
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-[716px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header & Search */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Xử lý đơn hàng</h2>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Tìm kiếm đơn hàng..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl flex-1">
        <table className="w-full text-left text-sm min-w-[700px]">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã ĐH</th>
              <th className="p-4 border-b">Khách hàng</th>
              <th className="p-4 border-b">Sản phẩm</th>
              <th className="p-4 border-b text-right">Tổng tiền <ArrowUpDown size={12} className="inline"/></th>
              <th className="p-4 border-b text-center">Trạng thái</th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Đã xác nhận */}
            <tr className="hover:bg-purple-50/30 transition-colors">
              <td className="p-4 font-bold text-gray-700">DH-001</td>
              <td className="p-4 font-bold text-gray-900">Anh Long</td>
              <td className="p-4 text-gray-600">iPhone 14 Plus</td>
              <td className="p-4 text-right font-bold text-purple-700">15.000.000đ</td>
              <td className="p-4 text-center">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Đã xác nhận</span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-400 rounded-full font-medium text-xs cursor-not-allowed">
                    <CheckCircle size={14}/> Xác nhận
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                    <FileText size={14}/> Chi tiết
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full font-medium transition-colors text-xs">
                    <Printer size={14}/> In bill
                  </button>
                </div>
              </td>
            </tr>

            {/* Chờ xác nhận */}
            <tr className="hover:bg-purple-50/30 transition-colors">
              <td className="p-4 font-bold text-gray-700">DH-002</td>
              <td className="p-4 font-bold text-gray-900">Chị Mai</td>
              <td className="p-4 text-gray-600">Galaxy S24</td>
              <td className="p-4 text-right font-bold text-purple-700">20.000.000đ</td>
              <td className="p-4 text-center">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Chờ xác nhận</span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm rounded-full font-bold transition-transform hover:-translate-y-0.5 text-xs">
                    <CheckCircle size={14}/> Xác nhận
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                    <FileText size={14}/> Chi tiết
                  </button>
                </div>
              </td>
            </tr>

            {/* Đệm dòng trống */}
            {[1, 2, 3, 4, 5, 6].map(i => <tr key={i}><td colSpan={6} className="p-6"></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};