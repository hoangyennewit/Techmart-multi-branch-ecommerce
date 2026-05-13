import React, { useEffect, useState, useCallback } from 'react';
import { Search, CheckCircle, FileText, Printer, ArrowUpDown, Loader2 } from 'lucide-react';
import { orderApi } from '../api/orderApi';

// 1. Helper: Định nghĩa cấu hình Badge trạng thái (Để ngoài component để tránh khởi tạo lại)
const STATUS_CONFIG: any = {
  'cho_xac_nhan': { text: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-700' },
  'da_xac_nhan': { text: 'Đã xác nhận', class: 'bg-emerald-100 text-emerald-700' },
  'dang_giao': { text: 'Đang giao', class: 'bg-blue-100 text-blue-700' },
  'hoan_thanh': { text: 'Hoàn thành', class: 'bg-gray-100 text-gray-700' },
  'da_huy': { text: 'Đã hủy', class: 'bg-red-100 text-red-700' },
};

export const OrderProcessing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 2. Logic: Lấy danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderApi.getOrders({
        keyword: searchTerm,
        status: statusFilter,
        page: 1,
        limit: 10
      });
      
      // ĐÃ SỬA LỖI Ở ĐÂY: 
      // Dùng response?.rows để phòng trường hợp backend dùng phân trang trả về { rows, count }
      setOrders(response?.rows || response?.data || response || []);
      
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  // Debounce tìm kiếm
  useEffect(() => {
    const timer = setTimeout(fetchOrders, 500);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  // 3. Logic: Xác nhận đơn hàng
  const handleConfirmOrder = async (orderId: number) => {
    if (!window.confirm("Xác nhận đơn hàng này?")) return;

    try {
      await orderApi.updateOrderStatus(orderId, 'da_xac_nhan');
      fetchOrders(); // Tải lại bảng
    } catch (error) {
      alert("Lỗi khi xác nhận đơn hàng");
    }
  };

  // 4. Utils: Format tiền tệ
  const formatVND = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-179 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header & Bộ lọc */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Xử lý đơn hàng</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="cho_xac_nhan">Chờ xác nhận</option>
            <option value="da_xac_nhan">Đã xác nhận</option>
            <option value="dang_giao">Đang giao</option>
          </select>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Mã ĐH, khách hàng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm" 
            />
          </div>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl flex-1 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-purple-600" size={32} />
          </div>
        )}

        <table className="w-full text-left text-sm min-w-175">
          <thead className="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Mã ĐH</th>
              <th className="p-4 border-b">Khách hàng</th>
              <th className="p-4 border-b text-right">Tổng tiền <ArrowUpDown size={12} className="inline"/></th>
              <th className="p-4 border-b text-center">Trạng thái</th>
              <th className="p-4 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="p-4 font-bold text-gray-900">{order.customerName}</td>
                  <td className="p-4 text-right font-bold text-purple-700">{formatVND(order.totalAmount)}</td>
                  
                  <td className="p-4 text-center">
                    <span className={`${STATUS_CONFIG[order.status]?.class} px-3 py-1 rounded-full text-xs font-bold`}>
                      {STATUS_CONFIG[order.status]?.text || order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      {order.status === 'cho_xac_nhan' ? (
                        <button 
                          onClick={() => handleConfirmOrder(order.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm rounded-full font-bold transition-all text-xs"
                        >
                          <CheckCircle size={14}/> Xác nhận
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-400 rounded-full font-medium text-xs cursor-not-allowed">
                          <CheckCircle size={14}/> Xác nhận
                        </button>
                      )}
                      
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-medium text-xs">
                        <FileText size={14}/> Chi tiết
                      </button>

                      {order.status !== 'cho_xac_nhan' && (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full font-medium text-xs">
                          <Printer size={14}/> In bill
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : !loading && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 italic">Không có đơn hàng nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};