import React from 'react';
import { Search, Plus, FileText, Edit, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface ProductTableProps {
  onActionClick: (mode: 'add' | 'view' | 'edit' | 'import', data?: any) => void;
}

export const ProductTable = ({ onActionClick }: ProductTableProps) => {
  // Dữ liệu mô phỏng
  const products = [
    { id: '1', sku: 'DT-001', name: 'iPhone 13', image: true, variant: 'Trắng/256GB', brand: 'Apple', category: 'Điện thoại', importPrice: '5.000.000đ', sellPrice: '15.000.000đ', description: 'Hàng chính hãng VN/A', qty: 50 },
    { id: '2', sku: 'DT-002', name: 'Galaxy S24 Ultra', image: true, variant: 'Đen/512GB', brand: 'Samsung', category: 'Điện thoại', importPrice: '20.000.000đ', sellPrice: '28.000.000đ', description: '', qty: 15 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-[600px] flex flex-col relative">
      
      {/* Bộ lọc và Tìm kiếm */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-gray-50/50 p-2 rounded-full border border-gray-100">
        <button 
          onClick={() => onActionClick('add')}
          className="flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          <Plus size={18} /> Thêm sản phẩm
        </button>

        <div className="flex items-center gap-4 px-4">
          <span className="font-bold text-gray-600 text-sm">Giá:</span>
          <input type="text" className="w-24 px-4 py-2 rounded-full border border-gray-200 text-sm outline-none focus:border-purple-400" placeholder="Từ" />
          <span className="text-gray-400">-</span>
          <input type="text" className="w-24 px-4 py-2 rounded-full border border-gray-200 text-sm outline-none focus:border-purple-400" placeholder="Đến" />
        </div>

        <div className="relative w-64 ml-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 shadow-sm" />
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
              <th className="p-4 border-b">Hãng</th>
              <th className="p-4 border-b">Danh mục</th>
              <th className="p-4 border-b text-right">Giá nhập</th>
              <th className="p-4 border-b text-right">Giá bán</th>
              <th className="p-4 border-b text-center">Số lượng</th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="p-4 font-bold text-gray-700">{item.sku}</td>
                <td className="p-4 font-bold text-gray-900">{item.name}</td>
                <td className="p-4">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                    <ImageIcon size={18} />
                  </div>
                </td>
                <td className="p-4 text-gray-600">{item.variant}</td>
                <td className="p-4 text-gray-600">{item.brand}</td>
                <td className="p-4 text-gray-600">{item.category}</td>
                <td className="p-4 text-right font-medium text-gray-700">{item.importPrice}</td>
                <td className="p-4 text-right font-bold text-purple-700">{item.sellPrice}</td>
                <td className="p-4 text-center font-bold text-gray-800">{item.qty}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => onActionClick('view', item)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                      <FileText size={14}/> Xem
                    </button>
                    <button onClick={() => onActionClick('edit', item)} className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                      <Edit size={14}/> Sửa
                    </button>
                    <button onClick={() => onActionClick('import', item)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 rounded-full font-medium transition-colors text-xs">
                      <ArrowRight size={14}/> Nhập
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