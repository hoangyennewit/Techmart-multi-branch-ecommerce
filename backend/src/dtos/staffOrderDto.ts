// Định nghĩa các trạng thái đơn hàng
export enum OrderStatus {
    CHO_XAC_NHAN = 'cho_xac_nhan',
    DA_XAC_NHAN = 'da_xac_nhan',
    DANG_GIAO = 'dang_giao',
    HOAN_THANH = 'hoan_thanh',
    DA_HUY = 'da_huy'
}

// 1. DTO cho Request tìm kiếm (Query params)
export interface OrderSearchQueryDto {
    keyword?: string; // Tên khách, SĐT, Mã ĐH
    status?: OrderStatus;
    page?: number;
    limit?: number;
}

// 2. DTO cho Request cập nhật trạng thái (Body)
export interface UpdateOrderStatusDto {
    status: OrderStatus;
    note?: string; // Ghi chú của nhân viên nếu có (VD: Khách hẹn giao giờ hành chính)
}