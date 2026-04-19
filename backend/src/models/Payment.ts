export interface PaymentEntity {
    ma_thanh_toan: number;
    ma_don_hang: number;
    phuong_thuc: 'COD' | 'VNPAY' | 'MOMO';
    trang_thai: 'cho_xu_ly' | 'thanh_cong' | 'that_bai';
    ma_giao_dich?: string;
    so_tien: number;
    ngay_thanh_toan?: Date;
}

export type CreatePaymentEntity = Omit<PaymentEntity, 'ma_thanh_toan' | 'ngay_thanh_toan'>; 