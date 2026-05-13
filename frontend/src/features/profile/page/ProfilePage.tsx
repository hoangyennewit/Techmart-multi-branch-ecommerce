// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Lock, LogOut, Camera, ChevronRight, Loader2, Truck, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/store/AuthContext";
import { Header } from '@/components/Header';
import { getMyOrdersAPI } from '../../customer/orders/api/orderApi';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth(); // Lấy đúng các biến từ AuthContextType
  const [activeTab, setActiveTab] = useState('info');
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders' && orders.length === 0) {
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
      fetchOrders();
    }
  }, [activeTab, orders.length]);

  // Hiển thị màn hình chờ khi đang check auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "cho_xac_nhan":
        return {
          label: "Chờ xác nhận",
          color: "text-yellow-500",
          bg: "bg-yellow-500",
          icon: Clock,
          step: 1,
        };
      case "da_xac_nhan":
        return {
          label: "Đã xác nhận",
          color: "text-blue-500",
          bg: "bg-blue-500",
          icon: Package,
          step: 2,
        };
      case "dang_giao":
        return {
          label: "Đang giao hàng",
          color: "text-purple-500",
          bg: "bg-purple-500",
          icon: Truck,
          step: 3,
        };
      case "hoan_thanh":
        return {
          label: "Hoàn thành",
          color: "text-green-500",
          bg: "bg-green-500",
          icon: CheckCircle,
          step: 4,
        };
      case "da_huy":
        return {
          label: "Đã hủy",
          color: "text-red-500",
          bg: "bg-red-500",
          icon: Package,
          step: 5,
        };
      default:
        return {
          label: "Chờ xác nhận",
          color: "text-yellow-500",
          bg: "bg-yellow-500",
          icon: Clock,
          step: 1,
        };
    }
  };

  const menuItems = [
    { id: 'info', label: 'Thông tin cá nhân', icon: <User size={18} /> },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: <Package size={18} /> },
    { id: 'address', label: 'Địa chỉ nhận hàng', icon: <MapPin size={18} /> },
    { id: 'password', label: 'Bảo mật tài khoản', icon: <Lock size={18} /> },
  ];

  return (
    <div>
        <Header />
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* SIDEBAR */}
          <aside className="w-full md:w-1/3 lg:w-1/4 flex">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1">
              <div className="p-8 text-center border-b border-gray-50 bg-gradient-to-b from-purple-50/30 to-transparent">
                <div className="relative inline-block group">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.ho_ten)}&background=6D28D9&color=fff&size=128`} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-3xl shadow-inner object-cover border-4 border-white"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 text-purple-600 cursor-pointer hover:bg-purple-600 hover:text-white transition-all">
                    <Camera size={16} />
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-gray-900 text-lg leading-tight">{user.ho_ten}</h3>
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded-md tracking-wider">
                    {user.ma_vai_tro === 1 ? "Quản trị viên" : "Thành viên"}
                  </span>
                </div>
              </div>

              <nav className="p-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all mb-1 ${
                      activeTab === item.id 
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-200 translate-x-1" 
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <div className="my-3 border-t border-gray-100 mx-4" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 flex-1">
              
              {activeTab === 'info' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-10">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Hồ sơ cá nhân</h2>
                    <p className="text-sm text-gray-500 mt-1">Quản lý và bảo mật thông tin tài khoản Techmart của bạn</p>
                  </div>
                  
                  <form className="space-y-8 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Họ và tên</label>
                        <input 
                          type="text" 
                          defaultValue={user.ho_ten} 
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-purple-600 focus:bg-white outline-none transition-all shadow-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Số điện thoại</label>
                        <input 
                          type="text" 
                          defaultValue={user.so_dien_thoai || ""} 
                          placeholder="Chưa cập nhật số điện thoại"
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-purple-600 focus:bg-white outline-none transition-all shadow-sm placeholder:text-gray-300" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Địa chỉ Email</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        disabled 
                        className="w-full bg-gray-100 border-2 border-transparent rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-400 cursor-not-allowed" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Địa chỉ giao hàng</label>
                      <textarea 
                        rows={3}
                        defaultValue={user.dia_chi || ""} 
                        placeholder="Nhập địa chỉ của bạn để Techmart giao hàng nhanh nhất"
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-purple-600 focus:bg-white outline-none transition-all shadow-sm placeholder:text-gray-300 resize-none" 
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                      <button 
                        type="button"
                        className="w-full sm:w-auto px-12 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all hover:-translate-y-1 active:translate-y-0"
                      >
                        Cập nhật hồ sơ
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
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
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
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
                                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
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
              )}
            </div>
          </main>
        </div>
    </div>
  );
};