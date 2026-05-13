import React, { useState } from 'react';
import { Paperclip, Send, FileText } from 'lucide-react';

export const InventorySidebar = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');

  return (
    <div className="w-full lg:w-[400px] bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col min-h-[600px]">
      
      {/* 2 Tabs chuyển đổi */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('request')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${activeTab === 'request' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Danh sách yêu cầu điều phối
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${activeTab === 'history' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Lịch sử
        </button>
      </div>

      {/* --- NỘI DUNG TAB 1: YÊU CẦU ĐIỀU PHỐI --- */}
      {activeTab === 'request' && (
        <div className="flex flex-col flex-1 h-full animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex-1 border border-gray-200 bg-white rounded-2xl overflow-hidden mb-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                <tr>
                  <th className="p-3">Xuất kho</th>
                  <th className="p-3 text-center">SL</th>
                  <th className="p-3">Nhập kho</th>
                  <th className="p-3 text-center">SL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-medium text-gray-700">iPhone X</td>
                  <td className="p-3 text-center font-bold text-red-500">50</td>
                  <td className="p-3 font-medium text-gray-700">Galaxy S26 Ultra</td>
                  <td className="p-3 text-center font-bold text-emerald-500">50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-sm relative h-48 flex flex-col">
            <p className="text-xs font-bold text-purple-700 mb-2">Gửi yêu cầu điều phối tới giám đốc</p>
            <textarea 
              className="w-full flex-1 outline-none text-sm text-gray-600 resize-none"
              placeholder="Nhập nội dung yêu cầu..."
              defaultValue="Chi nhánh Quận 1 cần nhập gấp các sản phẩm... do lượng đặt hàng tăng cao. Cần xuất kho trả về các mặt hàng tiêu thụ kém, tồn đọng quá nhiều qua nhiều thời gian."
            ></textarea>
            <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-2">
              <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors"><Paperclip size={18} /></button>
              <button className="p-2 bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white rounded-full transition-colors"><Send size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {/* --- NỘI DUNG TAB 2: LỊCH SỬ --- */}
      {activeTab === 'history' && (
        <div className="flex flex-col flex-1 h-full animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex-1 border border-gray-200 bg-white rounded-2xl overflow-hidden mb-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                <tr>
                  <th className="p-3">Yêu cầu</th>
                  <th className="p-3 text-center">Ngày</th>
                  <th className="p-3 text-center">Kết quả</th>
                  <th className="p-3 text-center">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-medium text-gray-700">Nhập 200 Samsung</td>
                  <td className="p-3 text-center text-gray-500">03/03/2026</td>
                  <td className="p-3 text-center"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Đã duyệt</span></td>
                  <td className="p-3 text-center"><button className="text-purple-600 hover:text-purple-800"><FileText size={14} className="mx-auto"/></button></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-medium text-gray-700">Nhập 200 Nokia 16</td>
                  <td className="p-3 text-center text-gray-500">03/03/2026</td>
                  <td className="p-3 text-center"><span className="bg-red-100 text-red-600 px-2 py-1 rounded font-bold">Từ chối</span></td>
                  <td className="p-3 text-center"><button className="text-purple-600 hover:text-purple-800"><FileText size={14} className="mx-auto"/></button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm h-48 overflow-y-auto">
            <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Lời nhắn được nhận</p>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-bold text-purple-800">Từ giám đốc: </span>
                <span className="text-gray-700">Ngừng kinh doanh mặt hàng Nokia 16</span>
              </div>
              <div className="text-sm">
                <span className="font-bold text-purple-800">Từ Quản lí sản phẩm: </span>
                <span className="text-gray-700">Sản phẩm ... đã hết hàng và ngừng sản xuất.</span>
                <a href="#" className="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"><FileText size={12}/> vanbanngungsanxuat.pdf</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};