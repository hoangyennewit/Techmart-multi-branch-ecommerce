import React from 'react';
import { X, Image as ImageIcon, Upload } from 'lucide-react';

export interface ProductModalProps {
  isOpen: boolean;
  mode: 'add' | 'view' | 'edit' | 'import' | null;
  productData: any;
  onClose: () => void;
}

export const ProductModal = ({ isOpen, mode, productData, onClose }: ProductModalProps) => {
  if (!isOpen || !mode) return null;

  // Tiêu đề của Popup thay đổi theo mode
  const titleMap = {
    add: 'Thêm sản phẩm mới',
    view: 'Thông tin sản phẩm',
    edit: 'Sửa thông tin sản phẩm',
    import: 'Nhập hàng sản phẩm'
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header của Popup */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-purple-800">{titleMap[mode]}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Nội dung Popup chia 2 cột */}
        <div className="p-8 flex flex-col md:flex-row gap-8">
          
          {/* Cột trái: Ảnh và Tên (Dựa theo thiết kế hình 2,3,4) */}
          <div className="w-full md:w-1/3 flex flex-col items-center border-r border-gray-100 pr-8">
            <div className="w-full aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center mb-6 overflow-hidden">
              {productData?.image ? (
                <div className="text-purple-400 flex flex-col items-center gap-2"><ImageIcon size={48}/> <span>Có ảnh</span></div>
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2"><ImageIcon size={48}/> <span className="text-sm font-medium">Chưa có ảnh</span></div>
              )}
            </div>
            
            <div className="w-full space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Tên sản phẩm:</label>
                <input type="text" readOnly={mode === 'view'} defaultValue={productData?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-center text-purple-700 outline-none focus:border-purple-400" placeholder="VD: iPhone 13" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Mã SKU:</label>
                <input type="text" readOnly={mode === 'view'} defaultValue={productData?.sku || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-center text-gray-700 outline-none focus:border-purple-400" placeholder="VD: DT-001" />
              </div>
            </div>
          </div>

          {/* Cột phải: Form thông tin */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-bold text-gray-600">Hãng:</label>
              <input type="text" readOnly={mode === 'view'} defaultValue={productData?.brand || ''} className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-bold text-gray-600">Danh mục:</label>
              <input type="text" readOnly={mode === 'view'} defaultValue={productData?.category || ''} className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-bold text-gray-600">Màu/Phiên bản:</label>
              <input type="text" readOnly={mode === 'view'} defaultValue={productData?.variant || ''} className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-purple-400" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-bold text-gray-600">Giá nhập:</label>
              <input type="text" readOnly={mode === 'view'} defaultValue={productData?.importPrice || ''} className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-purple-400" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-bold text-gray-600">Giá bán:</label>
              <input type="text" readOnly={mode === 'view'} defaultValue={productData?.sellPrice || ''} className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-bold text-purple-700 outline-none focus:border-purple-400" />
            </div>
            <div className="flex items-start gap-4">
              <label className="w-32 text-sm font-bold text-gray-600 mt-2">Mô tả:</label>
              <textarea readOnly={mode === 'view'} defaultValue={productData?.description || ''} rows={3} className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-purple-400 resize-none"></textarea>
            </div>

            {/* Render động dựa theo Mode: Nhập kho (Hình 4) vs Khác (Hình 2,3) */}
            {mode === 'import' ? (
              <div className="flex items-center gap-4 pt-2">
                <label className="w-32 text-sm font-bold text-purple-700">Số lượng nhập:</label>
                <input type="number" defaultValue="15" className="flex-1 bg-purple-50 border border-purple-200 rounded-full px-4 py-2 text-sm font-bold text-purple-800 outline-none focus:border-purple-500" />
              </div>
            ) : (
              <div className="flex items-center gap-4 pt-2">
                <label className="w-32 text-sm font-bold text-gray-600">File tài liệu:</label>
                <div className="flex-1 border-2 border-dashed border-gray-300 rounded-full px-4 py-2 text-sm text-gray-400 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                   <span>Kéo thả file vào đây...</span>
                   <Upload size={16} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Cụm nút bấm */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          {mode === 'edit' && (
            <button className="px-6 py-2.5 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white font-bold rounded-full text-sm transition-all mr-auto">
              Xóa sản phẩm
            </button>
          )}
          
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold rounded-full text-sm transition-all shadow-sm">
            Hủy
          </button>
          
          {mode !== 'view' && (
             <button className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm transition-all shadow-md hover:-translate-y-0.5">
               Lưu
             </button>
          )}
        </div>

      </div>
    </div>
  );
};