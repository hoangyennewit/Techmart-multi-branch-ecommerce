// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Lock, LogOut, Camera, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/store/AuthContext";
import { Header } from '@/components/Header';
import { OrderHistory } from '../components/OrderHistory';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
                    <p className="text-sm text-gray-500 mt-1">Quản lý và bảo mật thông tin tài khoản TechMart của bạn</p>
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
                        placeholder="Nhập địa chỉ của bạn để TechMart giao hàng nhanh nhất"
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

              <OrderHistory isActive={activeTab === 'orders'} />
            </div>
          </main>
        </div>
    </div>
  );
};