import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AdminNavTabsProps {
  promoCount?: number;
  dispatchCount?: number;
}

export const AdminNavTabs: React.FC<AdminNavTabsProps> = ({ 
  promoCount = 0, 
  dispatchCount = 0 
}) => {
  const location = useLocation();
  const path = location.pathname;

  // Hàm helper giúp rút gọn CSS, không phải copy-paste nhiều lần
  const getTabClass = (targetPath: string) => {
    const baseClass = "px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border flex items-center gap-2";
    const activeClass = "bg-blue-100 border-blue-300 text-blue-700";
    const inactiveClass = "bg-transparent border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-100";
    
    return `${baseClass} ${path === targetPath ? activeClass : inactiveClass}`;
  };

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <Link to="/admin" className={getTabClass('/admin')}>
        Tổng quan Doanh thu
      </Link>

      <Link to="/admin/promo" className={getTabClass('/admin/promo')}>
        Phê duyệt Khuyến mãi 
        {promoCount > 0 && (
          <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {promoCount}
          </span>
        )}
      </Link>

      <Link to="/admin/dispatch" className={getTabClass('/admin/dispatch')}>
        Phê duyệt điều phối 
        {dispatchCount > 0 && (
          <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {dispatchCount}
          </span>
        )}
      </Link>

      <Link to="/admin/history" className={getTabClass('/admin/history')}>
        Lịch sử
      </Link>
    </div>
  );
};