import React, { useEffect, useState, useCallback } from 'react';
import { Search, CheckCircle, FileText, Printer, ArrowUpDown, Loader2, Truck, PackageCheck, X } from 'lucide-react';
import { orderApi } from '../api/orderApi';

// 1. Helper: Định nghĩa cấu hình Badge trạng thái
const STATUS_CONFIG: any = {
  'cho_xac_nhan': { text: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-700' },
  'da_xac_nhan':  { text: 'Đã xác nhận',  class: 'bg-emerald-100 text-emerald-700' },
  'dang_giao':    { text: 'Đang giao',     class: 'bg-blue-100 text-blue-700' },
  'da_giao':      { text: 'Đã giao',       class: 'bg-green-100 text-green-700' },
  'hoan_thanh':   { text: 'Hoàn thành',    class: 'bg-gray-100 text-gray-700' },
  'da_huy':       { text: 'Đã hủy',        class: 'bg-red-100 text-red-700' },
};

// Modal chi tiết đơn hàng
const OrderDetailModal = ({ order, isOpen, onClose }: any) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !order) return null;

  const formatVND = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{order.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thông tin khách hàng */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">📋 Thông tin khách hàng</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tên khách hàng</p>
                <p className="font-semibold text-gray-800">{order.User?.fullName || order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-semibold text-gray-800">{order.User?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{order.User?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày đặt</p>
                <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>

          {/* Địa chỉ giao hàng */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">🏠 Địa chỉ giao hàng</h3>
            <p className="text-gray-800">
              {order.shippingAddress || 'Không có thông tin'}
            </p>
            {order.note && (
              <p className="text-sm text-gray-600 mt-2">
                <strong>Ghi chú:</strong> {order.note}
              </p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">📦 Trạng thái đơn hàng</h3>
            <div className="flex items-center gap-3">
              <span className={`${STATUS_CONFIG[order.status]?.class} px-4 py-2 rounded-full font-bold`}>
                {STATUS_CONFIG[order.status]?.text || order.status}
              </span>
              <span className="text-sm text-gray-500">Cập nhật: {new Date(order.updatedAt).toLocaleString('vi-VN')}</span>
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">🛍️ Chi tiết sản phẩm</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {order.OrderItems && order.OrderItems.length > 0 ? (
                order.OrderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start p-3 bg-white rounded border border-green-200">
                    <div>
                      <p className="font-semibold text-gray-800">{item.productName}</p>
                      <p className="text-sm text-gray-500">SKU: {item.productId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Số lượng: <strong>{item.quantity}</strong></p>
                      <p className="font-semibold text-purple-700">{formatVND(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">Không có sản phẩm</p>
              )}
            </div>
          </div>

          {/* Tóm tắt chi phí */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">💰 Tóm tắt chi phí</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Tổng sản phẩm:</span>
                <span className="font-semibold">{formatVND(order.totalAmount - (order.shippingFee || 0))}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold">{formatVND(order.shippingFee || 0)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-purple-700">
                <span>Tổng cộng:</span>
                <span>{formatVND(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">💳 Thanh toán</h3>
            <p className="text-gray-800">
              Phương thức: <strong>{order.paymentMethod?.toUpperCase() || 'COD'}</strong>
            </p>
            {order.Payment && (
              <p className="text-sm text-gray-600 mt-1">
                Trạng thái: <strong>{order.Payment.status}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-white rounded-lg font-semibold transition"
          >
            Đóng
          </button>
          <button className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
            <Printer size={16} /> In đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS width cố định cho từng loại nút — tất cả dùng chung để cột thẳng hàng
const BTN_ACTION = "inline-flex items-center justify-center gap-1 w-32 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm";
const BTN_DETAIL = "inline-flex items-center justify-center gap-1 w-24 py-1.5 rounded-full font-medium text-xs transition-all";
const BTN_PRINT  = "inline-flex items-center justify-center gap-1 w-20 py-1.5 rounded-full font-medium text-xs transition-all";

export const OrderProcessing = () => {
  const [orders, setOrders]           = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [searchTerm, setSearchTerm]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // 2. Logic: Lấy danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderApi.getOrders({
        keyword: searchTerm,
        status: statusFilter,
        page: 1,
        limit: 10,
      });
      setOrders(response?.rows || response?.data || response || []);
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 500);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  // 3. Logic: Xem chi tiết đơn hàng
  const handleViewDetail = async (orderId: number) => {
    try {
      setDetailLoading(true);
      const response = await orderApi.getOrderDetails(orderId);
      setSelectedOrder(response?.data || response);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Lỗi khi tải chi tiết đơn hàng:', error);
      alert('Không thể tải chi tiết đơn hàng');
    } finally {
      setDetailLoading(false);
    }
  };

  // 4. Logic: Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: number, nextStatus: string, actionName: string) => {
    if (!window.confirm(`Xác nhận ${actionName.toLowerCase()} đơn hàng này?`)) return;
    try {
      await orderApi.updateOrderStatus(orderId, nextStatus);
      fetchOrders();
    } catch {
      alert(`Lỗi khi ${actionName.toLowerCase()} đơn hàng`);
    }
  };

  // 4. Utils: Format tiền tệ
  const formatVND = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  // 5. Render nút thao tác — luôn trả về div cùng w-32 để cột thẳng hàng
  const renderActionButton = (order: any) => {
    switch (order.status) {
      case 'cho_xac_nhan':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'da_xac_nhan', 'Xác nhận')}
            className={`${BTN_ACTION} bg-emerald-500 hover:bg-emerald-600 text-white`}
          >
            <CheckCircle size={13} /> Xác nhận
          </button>
        );
      case 'da_xac_nhan':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'dang_giao', 'Giao hàng')}
            className={`${BTN_ACTION} bg-blue-500 hover:bg-blue-600 text-white`}
          >
            <Truck size={13} /> Giao hàng
          </button>
        );
      case 'dang_giao':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'da_giao', 'Hoàn tất giao')}
            className={`${BTN_ACTION} bg-green-500 hover:bg-green-600 text-white`}
          >
            <PackageCheck size={13} /> Giao thành công
          </button>
        );
      default:
        // Giữ chỗ để các cột khác không bị lệch
        return <div className="w-32" />;
    }
  };

  return (
    <>
      <OrderDetailModal 
        order={selectedOrder} 
        isOpen={showDetailModal} 
        onClose={() => setShowDetailModal(false)} 
      />
      <div className="flex-1 bg-white border border-gray-200 rounded-[3rem] p-8 shadow-sm min-h-179 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header & Bộ lọc */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Xử lý đơn hàng</h2>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="cho_xac_nhan">Chờ xác nhận</option>
            <option value="da_xac_nhan">Đã xác nhận</option>
            <option value="dang_giao">Đang giao</option>
            <option value="da_giao">Đã giao</option>
            <option value="da_huy">Đã hủy</option>
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
              <th className="p-4 border-b text-right">
                Tổng tiền <ArrowUpDown size={12} className="inline" />
              </th>
              <th className="p-4 border-b text-center">Trạng thái</th>
              {/* Cố định width cột thao tác để không co giãn */}
              <th className="p-4 border-b text-center w-px whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="p-4 font-bold text-gray-900">{order.customerName}</td>
                  <td className="p-4 text-right font-bold text-purple-700">
                    {formatVND(order.totalAmount)}
                  </td>

                  <td className="p-4 text-center">
                    <span className={`${STATUS_CONFIG[order.status]?.class} px-3 py-1 rounded-full text-xs font-bold`}>
                      {STATUS_CONFIG[order.status]?.text || order.status}
                    </span>
                  </td>

                  <td className="p-4 w-px whitespace-nowrap">
                    <div className="flex gap-2 items-center justify-center">

                      {renderActionButton(order)}

                      <button 
                        onClick={() => handleViewDetail(order.id)}
                        className={`${BTN_DETAIL} bg-purple-50 hover:bg-purple-100 text-purple-700`}
                      >
                        <FileText size={13} /> Chi tiết
                      </button>

                      {order.status !== 'cho_xac_nhan' && order.status !== 'da_huy' ? (
                        <button className={`${BTN_PRINT} bg-blue-50 hover:bg-blue-100 text-blue-700`}>
                          <Printer size={13} /> In bill
                        </button>
                      ) : (
                        <div className="w-20" />
                      )}

                    </div>
                  </td>
                </tr>
              ))
            ) : !loading && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 italic">
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
