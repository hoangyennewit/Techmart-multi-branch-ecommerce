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