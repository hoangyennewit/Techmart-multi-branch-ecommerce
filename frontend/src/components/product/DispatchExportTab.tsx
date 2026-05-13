import React from 'react';
import { Search, Image as ImageIcon, FileText, ArrowUpDown } from 'lucide-react';

export const DispatchExportTab = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-[500px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 transition-colors" />
        </div>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl flex-1">
        <table className="w-full text-left text-sm min-w-[1000px]">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã SKU</th>
              <th className="p-4 border-b">Tên sản phẩm</th>
              <th className="p-4 border-b text-center">Ảnh</th>
              <th className="p-4 border-b">Màu sắc/Phiên bản</th>
              <th className="p-4 border-b">Hãng <ArrowUpDown size={12} className="inline ml-1"/></th>
              <th className="p-4 border-b">Danh mục <ArrowUpDown size={12} className="inline ml-1"/></th>
              <th className="p-4 border-b text-right">Giá nhập <ArrowUpDown size={12} className="inline ml-1"/></th>
              <th className="p-4 border-b text-right">Giá bán <ArrowUpDown size={12} className="inline ml-1"/></th>
              <th className="p-4 border-b text-center">Mô tả</th>
              <th className="p-4 border-b text-center">Số lượng <ArrowUpDown size={12} className="inline ml-1"/></th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-purple-50/30 transition-colors">
              <td className="p-4 font-bold text-gray-700">DT-001</td>
              <td className="p-4 font-bold text-gray-900">iPhone 16</td>
              <td className="p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                  <ImageIcon size={18} />
                </div>
              </td>
              <td className="p-4 text-gray-600">Trắng/256GB</td>
              <td className="p-4 text-gray-600">Apple</td>
              <td className="p-4 text-gray-600">Điện thoại</td>
              <td className="p-4 text-right font-medium text-gray-700">5.000.000đ</td>
              <td className="p-4 text-right font-bold text-purple-700">15.000.000đ</td>
              <td className="p-4 text-center"></td>
              <td className="p-4 text-center font-bold text-gray-800">10</td>
              <td className="p-4">
                <button className="mx-auto flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                  <FileText size={14}/> Xem
                </button>
              </td>
            </tr>
            {/* Các dòng trống */}
            {[1, 2, 3, 4].map(i => <tr key={i}><td colSpan={11} className="p-6"></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};