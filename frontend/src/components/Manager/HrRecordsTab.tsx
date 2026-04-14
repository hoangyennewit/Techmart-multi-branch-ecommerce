import React from 'react';
import { Search, FileText, Edit, Ban } from 'lucide-react';

export const HrRecordsTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Khung tìm kiếm */}
      <div className="flex justify-end">
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhân viên..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm outline-none focus:border-purple-500 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Bảng danh sách nhân sự */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã NV</th>
              <th className="p-4 border-b">Họ và Tên</th>
              <th className="p-4 border-b">Ảnh</th>
              <th className="p-4 border-b">Ngày sinh</th>
              <th className="p-4 border-b">Ngày vào làm</th>
              <th className="p-4 border-b">Hợp đồng</th>
              <th className="p-4 border-b">Trạng thái</th>
              <th className="p-4 border-b text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 'NV01', status: 'Đang làm việc', statusColor: 'text-emerald-600 bg-emerald-50' },
              { id: 'NV02', status: 'Đã nghỉ', statusColor: 'text-gray-500 bg-gray-100' },
              { id: 'NV03', status: 'Đã sa thải', statusColor: 'text-red-600 bg-red-50' },
            ].map((item, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                <td className="p-4 font-bold text-gray-700">{item.id}</td>
                <td className="p-4 font-bold text-gray-900">Nguyễn Văn A</td>
                <td className="p-4">
                  {/* Avatar ảo */}
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
                    A
                  </div>
                </td>
                <td className="p-4 text-gray-500">01/01/2001</td>
                <td className="p-4 text-gray-500">20/04/2025</td>
                <td className="p-4 font-medium text-gray-700">Chính thức</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                      <FileText size={14}/> Xem
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                      <Edit size={14}/> Sửa
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-full font-medium transition-colors text-xs">
                      <Ban size={14}/> Sa thải
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