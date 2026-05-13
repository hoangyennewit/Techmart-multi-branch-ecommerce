export interface CreatePaymentRequestDTO { // Dữ liệu yêu cầu tạo thanh toán
    ma_don_hang: string;
    tong_tien: number;
    phuong_thuc: 'VNPAY' | 'MOMO' | 'COD' | 'ZALOPAY';
    ghi_chu?: string;
}

export interface PaymentResponseDTO {
    paymentId: string;
    oderId: string;
    transactionCode: string;
    amount: number;
    status: 'cho_xu_ly' | 'thanh_cong' | 'that_bai';
    method: 'VNPAY' | 'MOMO' | 'COD' | 'ZALOPAY';
    paymentUrl?: string;
    message?: string;
    createdAt: string;
}