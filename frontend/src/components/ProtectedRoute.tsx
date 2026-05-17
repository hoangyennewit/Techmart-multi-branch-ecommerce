import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../features/auth/store/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: number[]; // Nếu không truyền, chỉ cần đăng nhập là được
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Đang kiểm tra trạng thái auth → hiện loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
      </div>
    );
  }

  // Chưa đăng nhập → redirect về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng không có quyền → redirect về trang chủ phù hợp
  if (allowedRoles && !allowedRoles.includes(user.ma_vai_tro)) {
    // Redirect về đúng trang của role hiện tại
    const roleRedirectMap: Record<number, string> = {
      1: '/tech',
      2: '/admin',
      3: '/product',
      4: '/store',
      8: '/',
    };
    const redirectTo = roleRedirectMap[user.ma_vai_tro] ?? '/staff';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
