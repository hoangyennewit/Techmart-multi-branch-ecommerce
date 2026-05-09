import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../../components/Admin/AdminHeader';
import { HistoryCard } from '../../../components/Admin/HistoryCard';

interface HistoryItem {
  id: number;
  title: string;
  department: string;
  reason: string;
  speed: string;
  file: string;
  status: 'approved' | 'rejected_self' | 'rejected_other';
  rejectReasonText?: string;
  rejectReasonFile?: string;
}

const fallbackHistory: HistoryItem[] = [
  { id: 1, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho < 5", speed: "10 máy/ngày", file: "BaoCao.pdf", status: "approved" },
  { id: 2, title: "[VOUCHER] Giảm 10% Tết", department: "Marketing", reason: "Kích cầu", speed: "Khẩn cấp", file: "Voucher.pdf", status: "rejected_self", rejectReasonText: "Ngân sách tháng này đã hết" },
  { id: 3, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho < 5", speed: "10 máy/ngày", file: "BaoCao.pdf", status: "rejected_other", rejectReasonText: "Sản phẩm hết hàng tồn kho", rejectReasonFile: "vanbanngungxuat.pdf" },
];

export const AdminHistory = () => {
  const location = useLocation();
  const path = location.pathname;

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/history');
        if (!res.ok) throw new Error("Backend lỗi");
        const data = await res.json();
        setHistoryItems(data);
      } catch (error) {
        console.warn("Dùng dữ liệu giả cho Lịch sử");
        setHistoryItems(fallbackHistory);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        
        {/* THANH MENU TABS CÓ ROUTER */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
          <Link to="/admin" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap ${path === '/admin' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>Tổng quan Doanh thu</Link>
          <Link to="/admin/promo" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap flex gap-1 items-center ${path === '/admin/promo' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>
            Phê duyệt Khuyến mãi <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ml-1">4</span>
          </Link>
          <Link to="/admin/dispatch" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap flex gap-1 items-center ${path === '/admin/dispatch' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>
            Phê duyệt điều phối <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ml-1">2</span>
          </Link>
          <Link to="/admin/history" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap ${path === '/admin/history' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>Lịch sử</Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[300px]">
          {isLoading ? (
            <div className="text-center text-gray-500 py-10">Đang tải lịch sử...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historyItems.map((item) => (
                <HistoryCard 
                  key={item.id} title={item.title} department={item.department} reason={item.reason} 
                  speed={item.speed} fileName={item.file} status={item.status} 
                  rejectReasonText={item.rejectReasonText} rejectReasonFile={item.rejectReasonFile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};