import type { CartItem } from "../features/cart/cartSlice";

interface RedirectState {
  returnUrl: string;
  guestCart: CartItem[];
  timestamp: number;
}

interface PendingCartItem {
  item: CartItem;
  timestamp: number;
}

const REDIRECT_STATE_KEY = "techmart_redirect_state";
const PENDING_CART_ITEM_KEY = "techmart_pending_cart_item";
const REDIRECT_STATE_EXPIRY = 30 * 60 * 1000; // 30 minutes

/**
 * Save current URL and cart items before redirecting to login
 */
export const saveRedirectState = (returnUrl: string, guestCart: CartItem[]) => {
  const state: RedirectState = {
    returnUrl,
    guestCart,
    timestamp: Date.now(),
  };
  console.log("Saving redirect state:", state);
  localStorage.setItem(REDIRECT_STATE_KEY, JSON.stringify(state));
  console.log("Redirect state saved to localStorage");
};

/**
 * Get saved redirect state if it exists and hasn't expired
 */
export const getRedirectState = (): RedirectState | null => {
  try {
    const stored = localStorage.getItem(REDIRECT_STATE_KEY);
    console.log("Reading redirect state from localStorage:", stored);

    if (!stored) {
      console.log("No redirect state found");
      return null;
    }

    const state: RedirectState = JSON.parse(stored);
    const isExpired = Date.now() - state.timestamp > REDIRECT_STATE_EXPIRY;

    if (isExpired) {
      console.log("Redirect state expired");
      clearRedirectState();
      return null;
    }

    console.log("Redirect state retrieved:", state);
    return state;
  } catch (error) {
    console.error("Error reading redirect state:", error);
    return null;
  }
};

/**
 * Clear saved redirect state after using it
 */
export const clearRedirectState = () => {
  try {
    console.log("Clearing redirect state");
    localStorage.removeItem(REDIRECT_STATE_KEY);
    console.log("Redirect state cleared");
  } catch (error) {
    console.error("Error clearing redirect state:", error);
  }
};
/**
 * Save pending cart item before redirecting to login (when add to cart without auth)
 */
export const savePendingCartItem = (item: CartItem) => {
  const pending: PendingCartItem = {
    item,
    timestamp: Date.now(),
  };
  console.log("Saving pending cart item:", pending);
  localStorage.setItem(PENDING_CART_ITEM_KEY, JSON.stringify(pending));
  console.log("Pending cart item saved");
};

/**
 * Get pending cart item if it exists and hasn't expired
 */
export const getPendingCartItem = (): CartItem | null => {
  try {
    const stored = localStorage.getItem(PENDING_CART_ITEM_KEY);
    if (!stored) {
      return null;
    }

    const pending: PendingCartItem = JSON.parse(stored);
    const isExpired = Date.now() - pending.timestamp > REDIRECT_STATE_EXPIRY;

    if (isExpired) {
      console.log("Pending cart item expired");
      clearPendingCartItem();
      return null;
    }

    console.log("Pending cart item retrieved:", pending.item);
    return pending.item;
  } catch (error) {
    console.error("Error reading pending cart item:", error);
    return null;
  }
};

/**
 * Clear pending cart item after using it
 */
export const clearPendingCartItem = () => {
  try {
    console.log("Clearing pending cart item");
    localStorage.removeItem(PENDING_CART_ITEM_KEY);
  } catch (error) {
    console.error("Error clearing pending cart item:", error);
  }
};
