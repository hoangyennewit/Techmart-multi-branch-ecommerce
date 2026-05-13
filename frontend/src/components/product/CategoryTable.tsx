import React from 'react';
import { Edit, FileText, ArrowUpDown } from 'lucide-react';

interface Props {
  onEditClick: () => void;
}

export const CategoryTable = ({ onEditClick }: Props) => {
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm flex flex-col min-h-[500px]">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b text-center">Hãng</th>
              <th className="p-4 border-b text-center">Logo</th>
              <th className="p-4 border-b text-center">Danh mục <ArrowUpDown size={12} className="inline"/></th>
              <th className="p-4 border-b text-center">Số lượng SP <ArrowUpDown size={12} className="inline"/></th>
              <th className="p-4 border-b text-right">Tổng giá trị <ArrowUpDown size={12} className="inline"/></th>
              <th className="p-4 border-b text-center">Lần điều phối gần nhất</th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Dòng dữ liệu mẫu */}
            <tr className="hover:bg-purple-50/30 transition-colors">
              <td className="p-4 font-bold text-gray-700 text-center">Apple</td>
              <td className="p-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                  {/* Icon Apple giả lập */}
                  <span className="text-2xl">🍎</span> 
                </div>
              </td>
              <td className="p-4 text-gray-600 text-center">Điện thoại</td>
              <td className="p-4 font-bold text-gray-800 text-center">5000</td>
              <td className="p-4 font-bold text-purple-700 text-right">5.000.000đ</td>
              <td className="p-4 text-gray-500 text-center">Nhập: 13/3/2026</td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                    <FileText size={14}/> Xem
                  </button>
                  <button onClick={onEditClick} className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                    <Edit size={14}/> Sửa
                  </button>
                </div>
              </td>
            </tr>
            {/* Thêm các dòng trống cho giống thiết kế */}
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i}><td colSpan={7} className="p-6"></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};