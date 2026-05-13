import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { TechAccountCard, TechAccount } from '../../components/Tech/TechAccountCard';

const roleOptions = ['Giám đốc', 'Bộ phận kĩ thuật', 'Quản lý cửa hàng', 'Quản lý sản phẩm', 'Nhân viên'];

export const TechAccountManagement = () => {
  // 1. Dữ liệu giả lập ban đầu (Dựa theo ảnh)
  const [accounts, setAccounts] = useState<TechAccount[]>([
    { id: '1', roleTitle: 'Giám đốc 1', username: 'giamdoc01@gmail.com', password: 'giamdoc010203', role: 'Giám đốc', isLocked: false },
    { id: '2', roleTitle: 'Kỹ thuật 1', username: 'kythuat01@gmail.com', password: 'kythuat010203', role: 'Bộ phận kĩ thuật', isLocked: false },
    { id: '3', roleTitle: 'Giám đốc 2', username: 'giamdoc02@gmail.com', password: 'giamdoc010203', role: 'Giám đốc', isLocked: false },
    { id: '4', roleTitle: 'Kỹ thuật 2', username: 'kythuat02@gmail.com', password: 'kythuat010203', role: 'Bộ phận kĩ thuật', isLocked: false },
    { id: '5', roleTitle: 'Quản lý 1', username: 'quanly01@gmail.com', password: 'quanly010203', role: 'Quản lý cửa hàng', isLocked: false },
    { id: '6', roleTitle: 'Nhân viên 1', username: 'nhanvien01@gmail.com', password: 'nhanvien010203', role: 'Nhân viên', isLocked: false },
    { id: '7', roleTitle: 'Quản lý 2', username: 'quanly02@gmail.com', password: 'quanly010203', role: 'Quản lý cửa hàng', isLocked: false },
    { id: '8', roleTitle: 'Nhân viên 2', username: 'nhanvien02@gmail.com', password: 'nhanvien010203', role: 'Nhân viên', isLocked: false },
  ]);

  // State cho Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<TechAccount | null>(null);

  // State form lưu tạm khi gõ
  const [formData, setFormData] = useState({
    userText: '',
    username: '',
    password: '',
    role: 'Nhân viên'
  });

  // 2. Logic Khóa/Mở Khóa
  const handleToggleLock = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, isLocked: !acc.isLocked } : acc
    ));
  };

  // 3. Logic Bấm nút Sửa (Mở Modal & Đổ dữ liệu cũ vào form)
  const handleEditClick = (account: TechAccount) => {
    setEditData(account);
    setFormData({
      userText: account.roleTitle,
      username: account.username,
      password: account.password,
      role: account.role
    });
    setIsModalOpen(true);
  };

  // 4. Logic Bấm nút Thêm (Mở Modal trống)
  const handleAddClick = () => {
    setEditData(null);
    setFormData({ userText: '', username: '', password: '', role: 'Nhân viên' });
    setIsModalOpen(true);
  };

  // 5. Logic Lưu dữ liệu (Submit Modal)
  const handleSave = () => {
    if (editData) {
      // Cập nhật người cũ
      setAccounts(accounts.map(acc => 
        acc.id === editData.id ? { ...acc, roleTitle: formData.userText, username: formData.username, password: formData.password, role: formData.role } : acc
      ));
    } else {
      // Thêm người mới
      const newAcc: TechAccount = {
        id: Date.now().toString(),
        roleTitle: formData.userText,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        isLocked: false
      };
      setAccounts([newAcc, ...accounts]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm">Nâng tầm cuộc sống số</p>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase">Kỹ thuật</p>
              <p className="text-gray-800 font-bold">Nguyễn Văn Chín</p>
            </div>
            <UserCircle size={40} className="text-gray-300" />
          </div>
        </div>

        {/* MENU TABS */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-gray-800 font-medium rounded-full shadow-sm border border-gray-200">
              Tài khoản
            </button>
            <button className="px-6 py-2 bg-transparent text-gray-500 hover:text-gray-800 font-medium rounded-full transition-colors">
              Phân quyền
            </button>
            <button className="px-6 py-2 bg-transparent text-gray-500 hover:text-gray-800 font-medium rounded-full transition-colors relative">
              Cấu hình
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">5</span>
            </button>
            <button className="px-6 py-2 bg-transparent text-gray-500 hover:text-gray-800 font-medium rounded-full transition-colors">
              Bảo mật
            </button>
          </div>
          <button 
            onClick={handleAddClick}
            className="px-6 py-2.5 bg-gray-800 text-white font-medium rounded-full shadow-md hover:bg-gray-900 transition-all text-sm"
          >
            Thêm chức vụ
          </button>
        </div>

        {/* GRID HIỂN THỊ DANH SÁCH (Nền xám nhạt, thẻ trắng) */}
        <div className="bg-gray-100/50 p-6 rounded-[2.5rem] border border-gray-200 min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map(acc => (
              <TechAccountCard 
                key={acc.id} 
                account={acc} 
                onEdit={handleEditClick} 
                onToggleLock={handleToggleLock} 
              />
            ))}
          </div>
        </div>

        {/* MODAL (POPUP) DẠNG BONG BÓNG */}
        {isModalOpen && (
          <div className="absolute top-24 right-0 z-50">
            <div className="bg-purple-100 p-6 rounded-3xl shadow-2xl border border-purple-200 w-[450px] relative">
              {/* Mũi tên trỏ lên (nếu muốn giống y bong bóng tooltip) */}
              <div className="absolute -top-3 right-12 w-6 h-6 bg-purple-100 rotate-45 border-t border-l border-purple-200"></div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-purple-900 ml-2">
                  {editData ? 'Sửa thông tin' : 'Thêm tài khoản'}
                </h3>
              </div>

              <div className="flex gap-4">
                {/* Cột trái: Input text */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-purple-800 font-medium text-sm w-20">User:</label>
                    <input 
                      type="text" value={formData.userText} onChange={(e) => setFormData({...formData, userText: e.target.value})}
                      className="flex-1 bg-purple-200/50 border border-purple-300 text-gray-800 rounded-full px-4 py-1.5 outline-none focus:bg-white text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-purple-800 font-medium text-sm w-20">Tài khoản:</label>
                    <input 
                      type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="flex-1 bg-purple-200/50 border border-purple-300 text-gray-800 rounded-full px-4 py-1.5 outline-none focus:bg-white text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-purple-800 font-medium text-sm w-20">Mật khẩu:</label>
                    <input 
                      type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="flex-1 bg-purple-200/50 border border-purple-300 text-gray-800 rounded-full px-4 py-1.5 outline-none focus:bg-white text-sm"
                    />
                  </div>
                </div>

                {/* Cột phải: Dropdown & Nút bấm */}
                <div className="w-32 flex flex-col justify-between pt-1">
                  <select 
                    value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-purple-300/40 text-purple-900 border border-purple-400 font-medium rounded-full px-3 py-1.5 outline-none text-sm appearance-none cursor-pointer"
                  >
                    {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>

                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm transition-colors">
                      Hủy
                    </button>
                    <button onClick={handleSave} className="px-4 py-1.5 bg-teal-400 hover:bg-teal-500 text-white font-bold rounded-full text-sm transition-colors shadow-sm">
                      Lưu
                    </button>
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