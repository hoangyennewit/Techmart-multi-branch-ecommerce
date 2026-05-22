import React from 'react';

interface Props {
  focusForm: 'category' | 'brand' | null;
}

export const CategoryForms = ({ focusForm }: Props) => {
  return (
    <div className="w-80 space-y-6">
      
      {/* Form Danh Mục */}
      <div className={`bg-white border rounded-[2rem] p-6 shadow-sm transition-all duration-300 ${focusForm === 'category' ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200'}`}>
        <h3 className="font-bold text-lg text-purple-800 mb-4">Danh mục</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-500 w-24">Tên danh mục:</label>
            <input type="text" defaultValue="Điện thoại" className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-500 w-24">Danh mục gốc:</label>
            <input type="text" defaultValue="Gốc" className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold rounded-full text-sm transition-all">Hủy</button>
            <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm transition-all shadow-sm">Lưu</button>
          </div>
        </div>
      </div>

      {/* Form Thương Hiệu */}
      <div className={`bg-white border rounded-[2rem] p-6 shadow-sm transition-all duration-300 ${focusForm === 'brand' ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200'}`}>
        <h3 className="font-bold text-lg text-purple-800 mb-4">Thương hiệu</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-500 w-24">Tên thương hiệu:</label>
            <input type="text" defaultValue="Apple" className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-500 w-24">Danh mục:</label>
            <input type="text" defaultValue="Điện thoại" className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold rounded-full text-sm transition-all">Hủy</button>
            <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm transition-all shadow-sm">Lưu</button>
          </div>
        </div>
      </div>

    </div>
  );
};