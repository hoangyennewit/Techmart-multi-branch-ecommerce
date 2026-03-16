export interface User {
    ma_nguoi_dung: number;
    ho_ten: string;
    email: string;

    so_dien_thoai?: string;
    dia_chi?: string;

    mat_khau?: string;

    kieu_dang_nhap: 'local' | 'google' | 'facebook';

    ma_vai_tro: number;
    trang_thai: boolean;
    ngay_tao: string | Date;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    logout: () => void;
}