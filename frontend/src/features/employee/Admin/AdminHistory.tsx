import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../../components/Admin/AdminHeader';
import { HistoryCard } from '../../../components/Admin/HistoryCard';
import { AdminNavTabs } from '../../../components/Admin/AdminNavTabs';

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
    <div className="min-h-screen bg-[#27034c] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        {/* THANH MENU TABS */}
        <AdminNavTabs promoCount={4} dispatchCount={2} />
        
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