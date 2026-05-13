import React from 'react';
import { Search, Plus, FileText, Edit, XCircle, PauseCircle } from 'lucide-react';

interface Props {
  onAddClick: () => void;
}

export const PromoTable = ({ onAddClick }: Props) => {
  const promos = [
    { id: 'DT-001', name: 'Tặng tai nghe khi mua iPhone 13', type: 'Tặng sản phẩm', branch: 'Chi nhánh Quận 1', time: '1/4 - 22/4', status: 'Chờ duyệt' },
    { id: 'DT-002', name: 'Giảm 10% dịp lễ 30/4', type: 'Giảm giá %', branch: 'Tất cả chi nhánh', time: '28/4 - 02/5', status: 'Đang hiệu lực' },
    { id: 'DT-003', name: 'Clear kho giá sốc', type: 'Giảm tiền mặt', branch: 'Chi nhánh Quận 3', time: '1/3 - 15/3', status: 'Đã kết thúc' },
    { id: 'DT-004', name: 'Mừng sinh nhật cửa hàng', type: 'Quà tặng', branch: 'Chi nhánh Quận 1', time: '10/5 - 12/5', status: 'Bị từ chối' },
    { id: 'DT-005', name: 'Flash sale cuối tuần', type: 'Giảm tiền mặt', branch: 'Chi nhánh Tân Bình', time: 'T7 - CN hàng tuần', status: 'Chờ hiệu lực' },
  ];

  // Hàm tô màu trạng thái
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Chờ duyệt': return 'bg-yellow-100 text-yellow-700';
      case 'Đang hiệu lực': return 'bg-emerald-100 text-emerald-700';
      case 'Đã kết thúc': return 'bg-gray-100 text-gray-600';
      case 'Bị từ chối': return 'bg-red-100 text-red-600';
      case 'Chờ hiệu lực': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-[600px] flex flex-col">
      
      {/* Thanh công cụ */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-gray-50/50 p-2 rounded-full border border-gray-100">
        <button onClick={onAddClick} className="flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full shadow-md transition-all hover:-translate-y-0.5">
          <Plus size={18} /> Thêm chương trình
        </button>

        <div className="relative w-80 ml-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 shadow-sm" />
        </div>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl flex-1">
        <table className="w-full text-left text-sm min-w-[1100px]">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã khuyến mãi</th>
              <th className="p-4 border-b">Tên chương trình</th>
              <th className="p-4 border-b">Loại khuyến mãi</th>
              <th className="p-4 border-b">Chi nhánh áp dụng</th>
              <th className="p-4 border-b">Thời gian</th>
              <th className="p-4 border-b">Trạng thái</th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {promos.map((item, idx) => (
              <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                <td className="p-4 font-bold text-gray-700">{item.id}</td>
                <td className="p-4 font-bold text-gray-900 max-w-[200px] truncate">{item.name}</td>
                <td className="p-4 text-gray-600">{item.type}</td>
                <td className="p-4 text-gray-600">{item.branch}</td>
                <td className="p-4 text-gray-600 font-medium">{item.time}</td>
                <td className="p-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-xs">
                      <FileText size={14}/> Chi tiết
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-medium transition-colors text-xs">
                      <Edit size={14}/> Sửa
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full font-medium transition-colors text-xs">
                      <PauseCircle size={14}/> Dừng
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-full font-medium transition-colors text-xs">
                      <XCircle size={14}/> Hủy
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