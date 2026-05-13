import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { getMyOrdersAPI } from '../../customer/orders/api/orderApi';

interface OrderHistoryProps {
  isActive: boolean;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ isActive }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "processing":
        return { label: "Đã xác nhận", color: "text-blue-500", bg: "bg-blue-500", icon: Package, step: 2 };
      case "shipping":
        return { label: "Đang giao hàng", color: "text-purple-500", bg: "bg-purple-500", icon: Truck, step: 3 };
      case "delivered":
        return { label: "Hoàn thành", color: "text-green-500", bg: "bg-green-500", icon: CheckCircle, step: 4 };
      case "cancelled":
        return { label: "Đã hủy", color: "text-red-500", bg: "bg-red-500", icon: Package, step: 5 };
      default: // pending
        return { label: "Chờ xác nhận", color: "text-yellow-500", bg: "bg-yellow-500", icon: Clock, step: 1 };
    }
  };

  // Function để fetch orders
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrderError(null);
      const data = await getMyOrdersAPI();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderError("Không thể tải danh sách đơn hàng");
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch orders when component is active
  useEffect(() => {
    if (isActive) {
      fetchOrders();

      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Đơn hàng của tôi</h2>
        <p className="text-sm text-gray-500 mt-1">Theo dõi và quản lý các đơn hàng của bạn</p>
      </div>

      {ordersLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : orderError ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-semibold">{orderError}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Bạn chưa có đơn hàng nào</h3>
          <p className="text-gray-500">Hãy bắt đầu mua sắm các sản phẩm công nghệ tại TechMart</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Mã đơn hàng</p>
                    <p className="font-black text-gray-900 text-lg">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Ngày đặt hàng</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Tổng tiền</p>
                    <p className="font-black text-purple-600 text-xl">
                      {formatPrice(order.totalAmount + (order.shippingFee || 0))}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${statusInfo.bg}`}>
                    <StatusIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Trạng thái</p>
                    <p className={`font-bold ${statusInfo.color}`}>{statusInfo.label}</p>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="relative mb-6 px-4">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-purple-600 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                    style={{ width: `${statusInfo.step === 5 ? '100%' : ((statusInfo.step - 1) / 4) * 100}%` }}
                  ></div>
                  <div className="relative z-10 flex justify-between">
                    {[
                      { step: 1, label: "Chờ xác nhận" },
                      { step: 2, label: "Xác nhận" },
                      { step: 3, label: "Giao hàng" },
                      { step: 4, label: "Hoàn thành" },
                      { step: 5, label: "Đã hủy", isCancel: true },
                    ].map((s) => (
                      <div
                        key={s.step}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 
                                                    ${
                                                      s.isCancel
                                                        ? statusInfo.step === 5
                                                          ? "bg-red-600 border-red-100 text-white"
                                                          : "bg-white border-gray-100 text-gray-400"
                                                        : statusInfo.step >=
                                                        s.step
                                                        ? "bg-purple-600 border-purple-100 text-white"
                                                        : "bg-white border-gray-100 text-gray-400"
                                                    }`}
                        >
                          {!s.isCancel && statusInfo.step > s.step ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            s.step
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold hidden sm:block ${s.isCancel ? (statusInfo.step === 5 ? "text-red-600" : "text-gray-400") : (statusInfo.step >= s.step ? "text-gray-800" : "text-gray-400")}`}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h4>
                  <div className="space-y-3">
                    {order.items?.map((item: any, index: number) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex gap-4 items-start pb-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                            {item.name}
                          </h5>
                          <p className="text-xs text-gray-500 mb-2">
                            {item.color && `Màu: ${item.color}`} {item.color && item.quantity && "•"} {item.quantity && `SL: ${item.quantity}`}
                          </p>
                          <p className="text-sm font-bold text-purple-600">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-gray-900 whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
