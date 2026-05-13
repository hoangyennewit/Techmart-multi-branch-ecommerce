import React from 'react';
import { Calendar } from 'lucide-react';

export interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromoModal = ({ isOpen, onClose }: PromoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-purple-800">Thêm chương trình</h2>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Tên chương trình:</label>
            <input type="text" className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Mã khuyến mãi:</label>
            <input type="text" className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Loại khuyến mãi:</label>
            <select className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400 appearance-none cursor-pointer">
              <option>Tặng sản phẩm</option>
              <option>Giảm giá %</option>
              <option>Giảm tiền mặt</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Giá trị giảm:</label>
            <input type="text" className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Thời gian:</label>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3 py-2">
                <input type="text" placeholder="Từ ngày" className="w-full text-sm outline-none" />
                <Calendar size={14} className="text-purple-400" />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3 py-2">
                <input type="text" placeholder="Đến ngày" className="w-full text-sm outline-none" />
                <Calendar size={14} className="text-purple-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-36 text-sm font-bold text-gray-600">Chi nhánh áp dụng:</label>
            <select className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400 appearance-none cursor-pointer">
              <option>Chi nhánh Quận 1</option>
              <option>Tất cả chi nhánh</option>
            </select>
          </div>

          <div className="flex items-start gap-4 pt-2">
            <label className="w-36 text-sm font-bold text-gray-600 mt-2">Mô tả:</label>
            <textarea rows={3} className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-purple-400 resize-none"></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-center gap-4">
          <button onClick={onClose} className="px-8 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold rounded-full text-sm transition-all shadow-sm">
            Hủy
          </button>
          <button className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm transition-all shadow-md">
            Lưu
          </button>
        </div>

      </div>
    </div>
  );
};