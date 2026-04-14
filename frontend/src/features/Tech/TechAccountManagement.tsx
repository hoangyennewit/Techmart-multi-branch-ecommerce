import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // ĐÃ THÊM IMPORT LINK Ở ĐÂY
import { TechAccountCard, TechAccount } from '../../components/Tech/TechAccountCard';

// Đúng 5 chức vụ theo yêu cầu của bạn
const roleOptions = ['Giám đốc', 'Bộ phận kĩ thuật', 'Quản lý cửa hàng', 'Quản lý sản phẩm', 'Nhân viên'];

export const TechAccountManagement = () => {
  // DỮ LIỆU MẪU
  const [accounts, setAccounts] = useState<TechAccount[]>([
    { id: '1', roleTitle: 'Giám đốc 1', username: 'giamdoc01@gmail.com', password: 'giamdoc010203', role: 'Giám đốc', isLocked: false },
    { id: '2', roleTitle: 'Kỹ thuật 1', username: 'kythuat01@gmail.com', password: 'kythuat010203', role: 'Bộ phận kĩ thuật', isLocked: false },
    { id: '3', roleTitle: 'Quản lý 1', username: 'quanly01@gmail.com', password: 'quanly010203', role: 'Quản lý cửa hàng', isLocked: false },
    { id: '4', roleTitle: 'Nhân viên 1', username: 'nhanvien01@gmail.com', password: 'nhanvien010203', role: 'Nhân viên', isLocked: false },
  ]);

  // STATE QUẢN LÝ TƯƠNG TÁC POPUP
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // Lưu ID nếu đang sửa, null nếu thêm mới
  const [formData, setFormData] = useState({ userText: '', username: '', password: '', role: 'Nhân viên' });

  // 1. TƯƠNG TÁC: BẤM NÚT KHÓA / MỞ KHÓA
  const handleToggleLock = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, isLocked: !acc.isLocked } : acc
    ));
  };

  // 2. TƯƠNG TÁC: BẤM NÚT "+ THÊM CHỨC VỤ" (Mở popup trống)
  const handleAddClick = () => {
    setEditId(null);
    setFormData({ userText: '', username: '', password: '', role: 'Nhân viên' });
    setIsModalOpen(true);
  };

  // 3. TƯƠNG TÁC: BẤM NÚT "SỬA" (Đổ thông tin vào popup)
  const handleEditClick = (account: TechAccount) => {
    setEditId(account.id);
    setFormData({
      userText: account.roleTitle,
      username: account.username,
      password: account.password,
      role: account.role
    });
    setIsModalOpen(true);
  };

  // 4. LƯU THÔNG TIN TỪ POPUP
  const handleSave = () => {
    if (editId) {
      // Đang Sửa -> Cập nhật thẻ cũ
      setAccounts(accounts.map(acc => 
        acc.id === editId ? { ...acc, roleTitle: formData.userText, username: formData.username, password: formData.password, role: formData.role } : acc
      ));
    } else {
      // Đang Thêm mới -> Tạo thẻ mới
      const newAcc: TechAccount = {
        id: Date.now().toString(),
        roleTitle: formData.userText,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        isLocked: false
      };
      setAccounts([newAcc, ...accounts]); // Đẩy thẻ mới lên đầu danh sách
    }
    setIsModalOpen(false); // Đóng popup
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

        {/* --- THANH MENU & NÚT THÊM --- */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex gap-3">
            {/* Tab Đang mở (Tài khoản) */}
            <div className="px-6 py-2.5 bg-white text-purple-700 font-bold rounded-full shadow-sm border border-purple-200 cursor-default">
              Tài khoản
            </div>
            
            {/* Các Tab khác sử dụng Link để chuyển trang mượt mà */}
            <Link to="/tech/permissions" className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all">
              Phân quyền
            </Link>
            
            <Link to="/tech/config" className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all relative">
              Cấu hình
              <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">5</span>
            </Link>
            
            <Link to="/tech/security" className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all">
              Bảo mật
            </Link>
          </div>
          
          <button 
            onClick={handleAddClick}
            className="px-8 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all hover:-translate-y-0.5 relative"
          >
            + Thêm chức vụ
          </button>
        </div>

        {/* --- KHU VỰC CHỨA CÁC THẺ --- */}
        <div className="bg-white/50 p-8 rounded-[3rem] border border-gray-200 min-h-[500px] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* --- POPUP (MODAL) ĐIỀN THÔNG TIN --- */}
        {isModalOpen && (
          <div className="absolute top-24 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Hộp bong bóng trắng xám */}
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 w-[500px] relative">
              {/* Mũi tên chĩa lên */}
              <div className="absolute -top-3 right-16 w-6 h-6 bg-white rotate-45 border-t border-l border-gray-100"></div>
              
              <div className="flex gap-6 relative z-10">
                {/* Các ô input bên trái */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">User:</label>
                    <input 
                      type="text" value={formData.userText} onChange={(e) => setFormData({...formData, userText: e.target.value})}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">Tài khoản:</label>
                    <input 
                      type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-500 font-bold text-sm w-20">Mật khẩu:</label>
                    <input 
                      type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-2 outline-none focus:bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Dropdown và Nút bấm bên phải */}
                <div className="w-36 flex flex-col justify-between">
                  {/* Select Chức Vụ */}
                  <div className="relative">
                    <select 
                      value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-purple-100 text-purple-800 border border-purple-200 font-bold rounded-full px-4 py-2 outline-none text-sm appearance-none cursor-pointer hover:bg-purple-200 transition-colors"
                    >
                      {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {/* Hai nút Hủy / Lưu */}
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm transition-colors shadow-sm"
                    >
                      Hủy
                    </button>
                    <button 
                      onClick={handleSave} 
                      className="flex-1 py-2 bg-emerald-400 hover:bg-emerald-500 text-white font-bold rounded-full text-sm transition-colors shadow-sm"
                    >
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