import React, { useState } from 'react';
import { UserCircle, Save, Loader2, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TechSecurityWarnings, WarningItem } from '../../../components/Tech/TechSecurityWarnings';
import { TechSecurityLogs, LogItem } from '../../../components/Tech/TechSecurityLogs';

export const TechSecurityPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);

  const warningsData: WarningItem[] = [
    { id: 1, text: "Cảnh báo 5 lần nhập sai từ IP 192.16.1.1" },
    { id: 2, text: "Cảnh báo 3 lần nhập sai từ IP 192.16.1.1" },
  ];

  const logsData: LogItem[] = [
    { id: 1, time: "10:45", action: "Đăng nhập", user: "Nam Nguyễn" },
    { id: 2, time: "10:45", action: "Sửa quyền", user: "Giám đốc" },
    { id: 3, time: "10:45", action: "Backup CSDL", user: "Hệ thống" },
    { id: 4, time: "09:30", action: "Đăng nhập", user: "Trần Minh Quân" },
  ];

  const handleBackupClick = () => {
    setIsBackingUp(true);
    setBackupSuccess(false);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 3000); 
    }, 2000); 
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
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4">
          <Link to="/tech" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Quản lý tài khoản</Link>
          <Link to="/tech/permissions" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/permissions' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Phân quyền</Link>
          <Link to="/tech/config" className={`relative px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/config' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>
            Cấu hình
            <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">5</span>
          </Link>
          <Link to="/tech/security" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/tech/security' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Bảo mật & Log</Link>
        </div>

        <div className="bg-gray-100/60 p-8 rounded-[3rem] border border-gray-200 min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="flex flex-col justify-between min-h-[400px]">
              <TechSecurityWarnings warnings={warningsData} />
              <div className="mt-8">
                <button onClick={handleBackupClick} disabled={isBackingUp} className={`w-full md:w-auto px-10 py-4 flex items-center justify-center gap-3 font-bold rounded-full text-lg transition-all shadow-lg mx-auto ${isBackingUp ? 'bg-purple-300 text-purple-800 cursor-not-allowed' : backupSuccess ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-gray-800 text-white hover:bg-purple-700 hover:-translate-y-1'}`}>
                  {isBackingUp ? <><Loader2 size={24} className="animate-spin" /> Đang sao lưu...</> : backupSuccess ? <><CheckCircle size={24} /> Đã sao lưu thành công!</> : <><Save size={24} /> Sao lưu dữ liệu</>}
                </button>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[400px]">
              <TechSecurityLogs logs={logsData} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};