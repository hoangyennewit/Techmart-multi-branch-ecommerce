import React, { useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { DispatchCard } from '../../components/Admin/DispatchCard';

interface DispatchItem {
  id: number;
  title: string;
  department: string;
  reason: string;
  speed: string;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
}

const initialDispatchData: DispatchItem[] = [
  { id: 1, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 2, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 3, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 4, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 5, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
];

export const AdminDispatch = () => {
  const [dispatches, setDispatches] = useState<DispatchItem[]>(initialDispatchData);
  
  // Quản lý Modal Từ chối
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingCount = dispatches.filter(d => d.status === 'pending').length;

  const handleApprove = (id: number) => {
    setDispatches(dispatches.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
  };

  const handleRejectClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedId !== null) {
      setDispatches(dispatches.map(item => 
        item.id === selectedId ? { ...item, status: 'rejected' } : item
      ));
    }
    setIsModalOpen(false);
    setRejectReason("");
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
          </button>
          
          {/* Tab này đang Active nên sẽ có màu tím */}
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md relative whitespace-nowrap">
            Phê duyệt điều phối
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dispatches.map((item) => (
              <DispatchCard 
                key={item.id} 
                id={item.id}
                title={item.title} 
                department={item.department} 
                reason={item.reason} 
                speed={item.speed} 
                fileName={item.file} 
                status={item.status}
                onApprove={handleApprove}
                onReject={handleRejectClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* POPUP TỪ CHỐI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl transform scale-100 transition-transform">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Lý do từ chối</h3>
            <textarea
              placeholder="Nhập lý do từ chối..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-3 rounded-xl outline-none mb-4 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none h-24"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleConfirmReject}
                className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors shadow-sm"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};