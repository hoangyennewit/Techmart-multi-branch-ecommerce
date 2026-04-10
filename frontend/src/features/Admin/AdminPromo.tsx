import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { PromoCard } from '../../components/Admin/PromoCard';

interface PromoItem {
  id: number;
  title: string;
  department: string;
  budget: string;
  goal: string;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
}

// 1. Chuẩn bị sẵn dữ liệu giả để phòng hờ Backend chưa chạy
const fallbackData: PromoItem[] = [
  { id: 1, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
  { id: 2, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
  { id: 3, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
];

export const AdminPromo = () => {
  const [promos, setPromos] = useState<PromoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingCount = promos.filter(p => p.status === 'pending').length;

  // 2. GỌI API KHI MỞ TRANG
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/promotions');
        if (!res.ok) throw new Error("Backend chưa sẵn sàng");
        const data = await res.json();
        setPromos(data); 
      } catch (error) {
        console.warn("Lỗi kết nối Backend. Tự động dùng dữ liệu giả lập để test UI!");
        setPromos(fallbackData); // Dùng data giả nếu Backend lỗi
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromos();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/promotions/${id}/approve`, { method: 'PUT' });
    } catch (error) {
      // Dù API lỗi (do chưa có backend) thì UI vẫn đổi trạng thái để test
    }
    setPromos(promos.map(promo => 
      promo.id === id ? { ...promo, status: 'approved' } : promo
    ));
  };

  const handleRejectClick = (id: number) => {
    setSelectedPromoId(id);
    setIsModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (selectedPromoId !== null) {
      try {
        await fetch(`http://localhost:5000/api/promotions/${selectedPromoId}/reject`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: rejectReason }), 
        });
      } catch (error) {
         // Dù API lỗi (do chưa có backend) thì UI vẫn đổi trạng thái để test
      }
      setPromos(promos.map(promo => 
        promo.id === selectedPromoId ? { ...promo, status: 'rejected' } : promo
      ));
    }
    setIsModalOpen(false);
    setRejectReason("");
    setSelectedPromoId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        
        {/* Đã khôi phục thanh Menu đầy đủ */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt điều phối
          </button>
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[300px]">
          {isLoading ? (
            <div className="text-center text-gray-500 py-10">Đang tải dữ liệu từ server...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {promos.map((promo) => (
                <PromoCard 
                  key={promo.id} 
                  id={promo.id}
                  title={promo.title} 
                  department={promo.department} 
                  budget={promo.budget} 
                  goal={promo.goal} 
                  fileName={promo.file} 
                  status={promo.status}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                />
              ))}
            </div>
          )}
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