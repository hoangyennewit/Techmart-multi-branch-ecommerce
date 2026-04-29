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
} from "../../cart/cartSlice";
import {
  getRedirectState,
  clearRedirectState,
  getPendingCartItem,
  clearPendingCartItem,
} from "../../../utils/redirectStateManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  // Check redirect state when user logs in
  useEffect(() => {
    if (user) {
      console.log("User logged in in AuthContext:", user);
      // Add delay to ensure redirect state is properly set
      const timer = setTimeout(() => {
        // Check if there's a pending cart item to add (from add to cart without auth)
        const pendingItem = getPendingCartItem();
        if (pendingItem) {
          console.log("Adding pending cart item:", pendingItem);
          dispatch(addToCart(pendingItem));
          clearPendingCartItem();
        }

        const redirectState = getRedirectState();
        console.log("Checking redirect state in AuthContext:", redirectState);

        if (redirectState && redirectState.returnUrl) {
          console.log(
            "Found redirect state, navigating to:",
            redirectState.returnUrl,
          );
          clearRedirectState();
          navigate(redirectState.returnUrl);
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [user, navigate, dispatch]);
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
  }, [dispatch]);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, logout }}
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
