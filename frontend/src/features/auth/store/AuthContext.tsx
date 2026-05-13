import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User, AuthContextType } from "../types";
import { authApi } from "../api/authApi";
import {
  loadCartForUser,
  switchToGuestCart,
  clearCart,
  mergeGuestCart,
  addToCart,
} from "../../customer/cart/cartSlice";
import {
  getRedirectState,
  clearRedirectState,
  getPendingCartItem,
  clearPendingCartItem,
} from "../../../utils/redirectStateManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRoleRedirect = (ma_vai_tro: number): string => {
  switch (ma_vai_tro) {
    case 1:  return "/tech";    // Kỹ thuật viên (Admin)
    case 2:  return "/admin";   // Giám đốc
    case 3:  return "/product"; // Quản lý sản phẩm
    case 4:  return "/store";   // Quản lý cửa hàng
    case 8:  return "/";        // Khách hàng
    default: return "/staff";   // 5, 6, 7 (Nhân viên CSKH, Bán hàng, Kho)
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserProfile = async (token: string) => {
    try {
      setLoading(true);
      const userData = await authApi.getProfile(token);
      setUser(userData);
      // Load user-specific cart when user logs in
      if (userData.id) {
        console.log("Loading cart for user:", userData.id);
        dispatch(loadCartForUser(userData.id));
        // Merge guest cart items into user cart
        console.log("Merging guest cart into user cart");
        dispatch(mergeGuestCart(userData.id));
      }
      console.log("Profile fetched successfully:", userData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      localStorage.removeItem("techmart_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear cart and switch to guest cart when logout
    dispatch(switchToGuestCart());
    localStorage.removeItem("techmart_token");
    setUser(null);
    navigate("/login");
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Gọi api login (bạn cần đảm bảo authApi đã có method login)
      const response = await authApi.login(email, password);
      
      const token = response.token; // Giả sử backend trả về { token: "..." }
      
      if (token) {
        localStorage.setItem("techmart_token", token);
        await fetchUserProfile(token);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check redirect state when user logs in
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("techmart_token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchUserProfile(token);
    } else {
      const savedToken = localStorage.getItem("techmart_token");
      if (savedToken) {
        fetchUserProfile(savedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      // Xử lý giỏ hàng pending (guest thêm vào trước khi đăng nhập)
      const pendingItem = getPendingCartItem();
      if (pendingItem) {
        dispatch(addToCart(pendingItem));
        clearPendingCartItem();
      }

      // Ưu tiên trả về trang đang làm dở, nếu không thì theo role
      const redirectState = getRedirectState();
      clearRedirectState();

      if (redirectState?.returnUrl) {
        navigate(redirectState.returnUrl, { replace: true });
      } else {
        navigate(getRoleRedirect(user.ma_vai_tro), { replace: true });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
