import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../../components/Admin/AdminHeader';
import { DispatchCard } from '../../../components/Admin/DispatchCard';
import { AdminNavTabs } from '../../../components/Admin/AdminNavTabs';

interface DispatchItem {
  id: number;
  title: string;
  department: string;
  reason: string;
  speed: string;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
}

const fallbackDispatch: DispatchItem[] = [
  { id: 1, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 2, title: "[XUẤT KHO] 100 Tai nghe AirPods", department: "Inventory", reason: "Chuyển chi nhánh Q1", speed: "Giao ngay", file: "PhieuXuatKho.pdf", status: "pending" },
  { id: 3, title: "[NHẬP KHO] 20 Macbook Pro M3", department: "Inventory", reason: "Hàng mới về", speed: "Trong ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
];

export const AdminDispatch = () => {
  const location = useLocation();
  const path = location.pathname;

  const [dispatches, setDispatches] = useState<DispatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingCount = dispatches.filter(d => d.status === 'pending').length;

  useEffect(() => {
    const fetchDispatches = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dispatches');
        if (!res.ok) throw new Error("Backend lỗi");
        const data = await res.json();
        setDispatches(data);
      } catch (error) {
        console.warn("Dùng dữ liệu giả cho Điều phối kho");
        setDispatches(fallbackDispatch);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDispatches();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/dispatches/${id}/approve`, { method: 'PUT' });
    } catch (error) {}
    
    setDispatches(dispatches.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
  };

  const handleRejectClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (selectedId !== null) {
      try {
        await fetch(`http://localhost:5000/api/dispatches/${selectedId}/reject`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: rejectReason }),
        });
      } catch (error) {}

      setDispatches(dispatches.map(item => 
        item.id === selectedId ? { ...item, status: 'rejected' } : item
      ));
    }
    setIsModalOpen(false);
    setRejectReason("");
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-[#27034c] p-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        
        {/* THANH MENU TABS CÓ ROUTER */}
        <AdminNavTabs promoCount={4} dispatchCount={pendingCount} />
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[300px]">
          {isLoading ? (
            <div className="text-center text-gray-500 py-10">Đang tải dữ liệu điều phối...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dispatches.map((item) => (
                <DispatchCard 
                  key={item.id} id={item.id} title={item.title} department={item.department} 
                  reason={item.reason} speed={item.speed} fileName={item.file} status={item.status}
                  onApprove={handleApprove} onReject={handleRejectClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* POPUP TỪ CHỐI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Lý do từ chối</h3>
            <textarea
              placeholder="Nhập lý do từ chối..." value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-3 rounded-xl outline-none mb-4 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none h-24"
            />
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-full hover:bg-gray-200">Hủy</button>
              <button onClick={handleConfirmReject} className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 shadow-sm">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};