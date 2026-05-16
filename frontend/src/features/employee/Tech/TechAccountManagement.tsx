import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TechAccountCard, TechAccount } from '../../../components/Tech/TechAccountCard';
import { TechHeader } from '../../../components/Tech/TechHeader';

const roleOptions = ['Giám đốc', 'Bộ phận kĩ thuật', 'Quản lý cửa hàng', 'Quản lý sản phẩm', 'Nhân viên'];

export const TechAccountManagement = () => {
  const location = useLocation();
  const path = location.pathname;

  const [accounts, setAccounts] = useState<TechAccount[]>([
    { id: '1', roleTitle: 'Giám đốc 1', username: 'giamdoc01@gmail.com', password: 'giamdoc010203', role: 'Giám đốc', isLocked: false },
    { id: '2', roleTitle: 'Kỹ thuật 1', username: 'kythuat01@gmail.com', password: 'kythuat010203', role: 'Bộ phận kĩ thuật', isLocked: false },
    { id: '3', roleTitle: 'Quản lý 1', username: 'quanly01@gmail.com', password: 'quanly010203', role: 'Quản lý cửa hàng', isLocked: false },
    { id: '4', roleTitle: 'Nhân viên 1', username: 'nhanvien01@gmail.com', password: 'nhanvien010203', role: 'Nhân viên', isLocked: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ userText: '', username: '', password: '', role: 'Nhân viên' });

  const handleToggleLock = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, isLocked: !acc.isLocked } : acc
    ));
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({ userText: '', username: '', password: '', role: 'Nhân viên' });
    setIsModalOpen(true);
  };

  const handleEditClick = (account: TechAccount) => {
    setEditId(account.id);
    setFormData({ userText: account.roleTitle, username: account.username, password: account.password, role: account.role });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      setAccounts(accounts.map(acc => 
        acc.id === editId ? { ...acc, roleTitle: formData.userText, username: formData.username, password: formData.password, role: formData.role } : acc
      ));
    } else {
      const newAcc: TechAccount = {
        id: Date.now().toString(),
        roleTitle: formData.userText, username: formData.username, password: formData.password, role: formData.role, isLocked: false
      };
      setAccounts([newAcc, ...accounts]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <TechHeader />

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
          
          <button onClick={handleAddClick} className="px-8 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all hover:-translate-y-0.5 relative">
            + Thêm chức vụ
          </button>
        </div>

        {/* --- KHU VỰC CHỨA CÁC THẺ --- */}
        <div className="bg-white/50 p-8 rounded-[3rem] border border-gray-200 min-h-[500px] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accounts.map(acc => (
              <TechAccountCard key={acc.id} account={acc} onEdit={handleEditClick} onToggleLock={handleToggleLock} />
            ))}
          </div>
        </div>

        {/* --- POPUP --- */}
        {isModalOpen && (
          <div className="absolute top-24 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 w-[500px] relative">
              <div className="absolute -top-3 right-16 w-6 h-6 bg-white rotate-45 border-t border-l border-gray-100"></div>
              <div className="flex gap-6 relative z-10">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">User:</label>
                    <input type="text" value={formData.userText} onChange={(e) => setFormData({...formData, userText: e.target.value})} className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">Tài khoản:</label>
                    <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">Mật khẩu:</label>
                    <input type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all" />
                  </div>
                </div>

                <div className="w-36 flex flex-col justify-between">
                  <div className="relative">
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-purple-100 text-purple-800 border border-purple-200 font-bold rounded-full px-4 py-2 outline-none text-sm appearance-none cursor-pointer hover:bg-purple-200 transition-colors">
                      {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm transition-colors shadow-sm">Hủy</button>
                    <button onClick={handleSave} className="flex-1 py-2 bg-emerald-400 hover:bg-emerald-500 text-white font-bold rounded-full text-sm transition-colors shadow-sm">Lưu</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};