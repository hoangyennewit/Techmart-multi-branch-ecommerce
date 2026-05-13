import React, { useState } from 'react';

export const HrScheduleTab = () => {
  const [viewMode, setViewMode] = useState<'person' | 'day'>('person');

  // Dữ liệu giả lập
  const days = ['Thứ 2 01/03', 'Thứ 3 02/03', 'Thứ 4 03/03', 'Thứ 5 04/03', 'Thứ 6 05/03', 'Thứ 7 06/03'];
  const employees = ['Nguyễn Văn A', 'Nguyễn Văn B', 'Trần Thị C', 'Lê Văn D'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Nút chuyển đổi chế độ xem */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-gray-600">Chế độ xem lịch:</span>
        <div className="flex bg-gray-100 p-1 rounded-full">
          <button onClick={() => setViewMode('person')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'person' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Theo người</button>
          <button onClick={() => setViewMode('day')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'day' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Theo ngày</button>
        </div>
      </div>

      {/* HIỂN THỊ: THEO NGƯỜI (Hình 1) */}
      {viewMode === 'person' && (
        <div className="flex gap-6">
          {/* Cột danh sách nhân viên */}
          <div className="w-64 bg-gray-50 border border-gray-200 rounded-3xl p-4 space-y-2 h-[400px] overflow-y-auto">
            {employees.map((emp, i) => (
              <div key={i} className="bg-white border border-gray-200 p-3 rounded-xl text-sm font-bold text-gray-700 shadow-sm cursor-pointer hover:border-purple-300">
                {emp}
              </div>
            ))}
          </div>
          {/* Bảng chấm ca (Mô phỏng) */}
          <div className="flex-1 bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <table className="w-full text-center text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-500 font-bold">
                <tr>
                  <th className="p-4 border-b border-r border-gray-200">Ca \ Ngày</th>
                  {days.map(d => <th key={d} className="p-4 border-b border-gray-200">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {['Sáng', 'Chiều', 'Tối'].map(ca => (
                  <tr key={ca} className="border-b border-gray-100 last:border-0">
                    <td className="p-6 font-bold text-gray-700 bg-gray-50/50 border-r border-gray-200">{ca}</td>
                    {days.map((d, i) => (
                      <td key={d} className="p-6 text-purple-600 font-black text-lg">
                        {/* Hiện dấu X ngẫu nhiên */}
                        {(i + (ca==='Sáng'?1:0)) % 2 === 0 ? 'X' : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HIỂN THỊ: THEO NGÀY (Hình 2) */}
      {viewMode === 'day' && (
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full text-center text-sm border-collapse min-w-[800px]">
            <thead className="bg-gray-50 text-gray-500 font-bold">
              <tr>
                <th className="p-4 border-b border-r border-gray-200">Ca</th>
                {days.map(d => <th key={d} className="p-4 border-b border-gray-200">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {['Sáng', 'Chiều', 'Tối'].map(ca => (
                <tr key={ca} className="border-b border-gray-100 last:border-0">
                  <td className="p-6 font-bold text-gray-700 bg-gray-50/50 border-r border-gray-200">{ca}</td>
                  {days.map((d, i) => (
                    <td key={d} className="p-4 align-top space-y-1">
                      {/* Đổ tên nhân viên vào ca */}
                      {i % 2 === 0 && <div className="text-xs bg-purple-50 text-purple-700 font-bold p-1 rounded">Nguyễn Văn A</div>}
                      {i % 3 === 0 && <div className="text-xs bg-blue-50 text-blue-700 font-bold p-1 rounded">Trần Thị C</div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};