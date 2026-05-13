import React from 'react';
import { Paperclip, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DispatchRejectModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-8 space-y-6">
          {/* Ô nhập lý do */}
          <div>
            <label className="text-base font-bold text-gray-800 mb-2 block">Lí do:</label>
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none h-32"
              placeholder="Nhập lí do, ví dụ hết sản xuất..."
            ></textarea>
          </div>

          {/* Ô đính kèm văn bản */}
          <div>
            <label className="text-base font-bold text-gray-800 mb-2 block">Văn bản kèm theo:</label>
            <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-purple-600 bg-purple-50 w-max px-3 py-1.5 rounded-lg border border-purple-100">
                <FileText size={16} />
                <span className="text-sm font-bold underline cursor-pointer">vanbanngungsanxuat</span>
              </div>
              <button className="text-gray-400 hover:text-purple-600 transition-colors w-max p-1">
                <Paperclip size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 py-5 flex justify-end gap-3 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold rounded-full text-sm transition-all shadow-sm"
          >
            Hủy
          </button>
          <button className="px-8 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full text-sm transition-all shadow-md">
            Gửi
          </button>
        </div>

      </div>
    </div>
  );
};