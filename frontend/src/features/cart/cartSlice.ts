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
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.color === action.payload.color
            );
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(
            state,
            action: PayloadAction<{ id: string; color: string }>
        ) {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.color === action.payload.color
                    )
            );
        },
        updateQuantity(
            state,
            action: PayloadAction<{ id: string; color: string; quantity: number }>
        ) {
            const item = state.items.find(
                (i) =>
                    i.id === action.payload.id &&
                    i.color === action.payload.color
            );
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity);
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

export default cartSlice.reducer;
