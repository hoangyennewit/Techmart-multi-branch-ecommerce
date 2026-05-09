import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  userId?: number;
}

// Helper function to get user-specific storage key
const getCartStorageKey = (userId?: number): string => {
  if (userId) {
    return `techmart_cart_${userId}`;
  }
  return "techmart_cart_guest";
};

// Helper function to load cart from localStorage
const loadCartFromStorage = (userId?: number): CartItem[] => {
  try {
    const key = getCartStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Lỗi khi tải giỏ hàng từ localStorage:", error);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (items: CartItem[], userId?: number) => {
  try {
    const key = getCartStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
  }
};

// Helper function to clear old guest cart if user logs in
const clearGuestCart = () => {
  try {
    localStorage.removeItem("techmart_cart_guest");
  } catch (error) {
    console.error("Lỗi khi xóa guest cart:", error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items, state.userId);
    },
    removeFromCart(
      state,
      action: PayloadAction<{ id: string; color: string }>,
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id && item.color === action.payload.color
          ),
      );
      saveCartToStorage(state.items, state.userId);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; color: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.color === action.payload.color,
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      saveCartToStorage(state.items, state.userId);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items, state.userId);
    },
    // Action to initialize cart from storage on app load (for guests)
    initializeCart(state) {
      const stored = loadCartFromStorage();
      state.items = stored;
    },
    // Action to load cart for a logged-in user
    loadCartForUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      state.userId = userId;
      // Don't clear guest cart here - mergeGuestCart will handle it
      const stored = loadCartFromStorage(userId);
      state.items = stored;
    },
    // Action to switch to guest cart after logout
    switchToGuestCart(state) {
      state.userId = undefined;
      state.items = loadCartFromStorage();
    },
    // Action to merge guest cart into user cart
    mergeGuestCart(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const guestCart = loadCartFromStorage(); // Load from guest key

      // Merge guest items into current cart
      guestCart.forEach((guestItem) => {
        const existingIndex = state.items.findIndex(
          (item) => item.id === guestItem.id && item.color === guestItem.color,
        );

        if (existingIndex >= 0) {
          // Item exists - add quantities
          state.items[existingIndex].quantity += guestItem.quantity;
        } else {
          // New item - add to cart
          state.items.push(guestItem);
        }
      });

      // Save merged cart to user storage
      saveCartToStorage(state.items, userId);
      // Clear guest cart
      clearGuestCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  initializeCart,
  loadCartForUser,
  switchToGuestCart,
  mergeGuestCart,
} = cartSlice.actions;

// Export helper function for other components
export { clearGuestCart };

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
