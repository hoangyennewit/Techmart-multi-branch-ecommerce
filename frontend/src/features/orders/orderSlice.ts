import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/index";

export type OrderStatus = "pending" | "processing" | "shipping" | "delivered";

export interface OrderItem {
    id: string; // productId
    name: string;
    price: number;
    color: string;
    quantity: number;
    imageUrl: string;
}

export interface ShippingInfo {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    note?: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    shippingFee: number;
    shippingInfo: ShippingInfo;
    paymentMethod: string;
    status: OrderStatus;
    createdAt: string;
}

interface OrderState {
    orders: Order[];
}

const loadOrdersFromLocalStorage = (): Order[] => {
    try {
        const storedOrders = localStorage.getItem("techmart_orders");
        return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (e) {
        console.error("Could not parse orders from localStorage", e);
        return [];
    }
};

const initialState: OrderState = {
    orders: loadOrdersFromLocalStorage(),
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        placeOrder: (state, action: PayloadAction<Order>) => {
            // Add new order to the beginning of the list
            state.orders.unshift(action.payload);
            // Save to localStorage
            try {
                localStorage.setItem("techmart_orders", JSON.stringify(state.orders));
            } catch (e) {
                console.error("Could not save orders to localStorage", e);
            }
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
            const order = state.orders.find(o => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
                try {
                    localStorage.setItem("techmart_orders", JSON.stringify(state.orders));
                } catch (e) {
                    console.error("Could not save orders to localStorage", e);
                }
            }
        }
    },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;

export const selectAllOrders = (state: RootState) => state.order.orders;

export default orderSlice.reducer;
