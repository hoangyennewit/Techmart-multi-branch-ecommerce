import React from 'react';
import { Search, ArrowUpDown, Image as ImageIcon } from 'lucide-react';

export const InventoryProductTable = () => {
  const products = [
    { id: 'SP01', name: 'Samsung S26 Ultra', qty: 89 },
    { id: 'SP02', name: 'iPhone 15 Pro Max', qty: 234 },
    { id: 'SP03', name: 'iPhone 14', qty: 12 },
    { id: 'SP04', name: 'iPhone 13', qty: 2 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 flex-1 shadow-sm flex flex-col min-h-[600px]">
      
      {/* Thanh công cụ: Tìm kiếm & Sắp xếp */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-500 focus:bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white font-bold rounded-full text-sm hover:bg-gray-900 shadow-md transition-all">
          Sắp xếp <ArrowUpDown size={14} />
        </button>
      </div>

      {/* Bảng Danh sách sản phẩm */}
      <div className="overflow-x-auto flex-1 border border-gray-100 rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã SP</th>
              <th className="p-4 border-b">Tên sản phẩm</th>
              <th className="p-4 border-b text-center">Ảnh</th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
                  Số lượng <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((item, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                <td className="p-4 font-bold text-gray-700">{item.id}</td>
                <td className="p-4 font-bold text-gray-900">{item.name}</td>
                <td className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-400 mx-auto border border-purple-200">
                    <ImageIcon size={20} />
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-700">{item.qty}</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-xs shadow-sm transition-colors">
                      Xuất
                    </button>
                    <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-xs shadow-sm transition-colors">
                      Nhập
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};