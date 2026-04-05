export interface PaymentIntentData {
    amount: number;
    method: string; // Phương thức thanh toán, ví dụ: 'vnpay', 'stripe', 'paypal', v.v.
    orderId: string;
}

export interface VNPayParams {
    vnp_Version: string;
    vnp_Command: string;
    vnp_TmnCode: string;
    vnp_Amount: number;
    vnp_CurrCode: string;
    vnp_TxnRef: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_Locale: string;
    vnp_ReturnUrl: string;
    vnp_IpAddr: string;
    vnp_CreateDate: string;
    vnp_BankCode?: string;
    vnp_SecureHash?: string;
    [key: string]: any; // Cho phép truy cập bằng key string để sắp xếp
}