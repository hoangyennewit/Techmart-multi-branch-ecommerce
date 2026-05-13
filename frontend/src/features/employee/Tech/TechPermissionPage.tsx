import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TechPermissionCard, RolePermission } from '../../../components/Tech/TechPermissionCard';

export const TechPermissionPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const [roles, setRoles] = useState<RolePermission[]>([
    { id: '1', name: 'Giám đốc', permissions: { create: true, read: true, update: true, delete: true } },
    { id: '2', name: 'Quản lí cửa hàng', permissions: { create: false, read: true, update: false, delete: false } },
    { id: '3', name: 'Quản lí sản phẩm', permissions: { create: false, read: true, update: false, delete: false } },
    { id: '4', name: 'Nhân viên', permissions: { create: false, read: true, update: false, delete: false } },
    { id: '5', name: 'Khách hàng', permissions: { create: false, read: true, update: false, delete: false } },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const handleToggle = (id: string, permKey: keyof RolePermission['permissions']) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, permissions: { ...role.permissions, [permKey]: !role.permissions[permKey] } } : role
    ));
  };

  const handleSaveRole = () => {
    if (!newRoleName.trim()) return;
    const newRole: RolePermission = {
      id: Date.now().toString(),
      name: newRoleName,
      permissions: { create: false, read: false, update: false, delete: false }
    };
    setRoles([...roles, newRole]);
    setIsModalOpen(false);
    setNewRoleName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest">Kỹ thuật</p>
              <p className="text-gray-800 font-bold text-sm">Nguyễn Văn Chín</p>
            </div>
            <UserCircle size={36} className="text-gray-400" />
          </div>
        </div>

        {/* --- THANH MENU TABS CÓ ROUTER --- */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex gap-3">
            <Link to="/tech" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Quản lý tài khoản</Link>
            <Link to="/tech/permissions" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/permissions' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Phân quyền</Link>
            <Link to="/tech/config" className={`relative px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/config' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>
              Cấu hình
              <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">5</span>
            </Link>
            <Link to="/tech/security" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/security' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Bảo mật & Log</Link>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all hover:-translate-y-0.5">
            + Thêm chức vụ
          </button>
        </div>

        <div className="bg-gray-100/60 p-8 rounded-[3rem] border border-gray-200 min-h-[500px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map(role => (
              <TechPermissionCard key={role.id} role={role} onToggle={handleToggle} />
            ))}
          </div>
        </div>

        {/* --- POPUP --- */}
        {isModalOpen && (
          <div className="absolute top-24 right-0 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 w-[380px] relative">
              <div className="absolute -top-3 right-16 w-6 h-6 bg-white rotate-45 border-t border-l border-gray-100"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <label className="text-gray-500 font-bold text-sm whitespace-nowrap">Tên chức vụ:</label>
                <input type="text" placeholder="VD: Kế toán..." value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-4 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all" autoFocus />
              </div>
              <div className="flex gap-3 justify-end relative z-10">
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm transition-colors shadow-sm">Hủy</button>
                <button onClick={handleSaveRole} className="px-8 py-2.5 bg-emerald-400 hover:bg-emerald-500 text-white font-bold rounded-full text-sm transition-colors shadow-sm">Lưu</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};