import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="relative mb-8">
          <p className="text-[10rem] font-black text-purple-100 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-5xl font-black text-purple-700">404</p>
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-3">Trang không tồn tại</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
          >
            <Home size={18} />
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};
