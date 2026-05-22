import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export const HrSalaryTab = () => {
  const [viewMode, setViewMode] = useState<'personal' | 'all'>('personal');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Nút chuyển chế độ Cá nhân / Tất cả */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-600">Chế độ xem:</span>
          <div className="flex bg-gray-100 p-1 rounded-full">
            <button onClick={() => setViewMode('personal')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'personal' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Cá nhân</button>
            <button onClick={() => setViewMode('all')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Tất cả</button>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-2 rounded-full text-sm font-bold text-gray-700">mm/yy: <span className="text-purple-700">04/2026</span></div>
      </div>

      {/* HIỂN THỊ: CÁ NHÂN (Hình 3) */}
      {viewMode === 'personal' && (
        <div className="flex gap-6">
          {/* Cột user (Mô phỏng thu gọn) */}
          <div className="w-48 bg-gray-50 border border-gray-200 rounded-3xl p-4 space-y-2">
             <div className="bg-white border border-purple-200 p-3 rounded-xl text-xs font-bold text-purple-700 shadow-sm">Nguyễn Văn A</div>
             <div className="p-3 text-xs font-bold text-gray-500">Nguyễn Văn B...</div>
          </div>
          
          {/* Lưới lịch chấm công */}
          <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-center text-center text-gray-400 italic">
            {/* Đã sửa dấu > thành chữ "đến" ở dòng dưới đây */}
            [Khu vực Lưới chấm công cá nhân với chữ 'V' hiển thị theo từng ngày 1 đến 31]
          </div>

          {/* Cột Tổng kết lương (Bên phải) */}
          <div className="w-64 bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">Tổng kết (VND)</h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center"><span className="text-gray-500">Lương cứng:</span> <span className="bg-white px-3 py-1 rounded-full font-bold text-purple-700">12.625.000đ</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Số buổi:</span> <span className="font-bold text-gray-800">29/30</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Ngày lễ:</span> <span className="bg-white px-3 py-1 rounded-full font-bold text-purple-700">500.000đ</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Thưởng:</span> <span className="bg-white px-3 py-1 rounded-full font-bold text-purple-700">500.000đ</span></div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center"><span className="text-gray-800 font-bold">TỔNG LÃNH:</span> <span className="bg-purple-700 text-white px-3 py-1.5 rounded-full font-black">13.625.000đ</span></div>
            </div>
          </div>
        </div>
      )}

      {/* HIỂN THỊ: TẤT CẢ (Hình 4) */}
      {viewMode === 'all' && (
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
              <tr>
                <th className="p-4 border-b">Mã NV</th>
                <th className="p-4 border-b">Họ và Tên</th>
                <th className="p-4 border-b">Vị trí</th>
                <th className="p-4 border-b text-center">Sáng</th>
                <th className="p-4 border-b text-center">Chiều</th>
                <th className="p-4 border-b text-center">Tối</th>
                <th className="p-4 border-b text-right">Lương</th>
                <th className="p-4 border-b text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-purple-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-700">NV0{item}</td>
                  <td className="p-4 font-bold text-gray-900">Nguyễn Văn A</td>
                  <td className="p-4 text-gray-500">CSKH</td>
                  <td className="p-4 text-center font-medium">29/30</td>
                  <td className="p-4 text-center font-medium">29/30</td>
                  <td className="p-4 text-center font-medium">29/30</td>
                  <td className="p-4 text-right font-bold text-purple-700">12.625.000đ</td>
                  <td className="p-4 text-center">
                    <button className="flex items-center gap-1 mx-auto px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                      <Eye size={14}/> Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};