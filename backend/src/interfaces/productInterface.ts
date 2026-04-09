export interface IDanhMuc {
    ma_danh_muc: number;
    ten_danh_muc: string;
    slug?: string | null;
    mo_ta?: string | null;
    trang_thai: number;
}

export interface IHang {
    ma_hang: number;
    ten_hang: string;
    logo?: string | null;
    mo_ta?: string | null;
}

export interface ISanPham {
    ma_san_pham: number;
    ten_san_pham: string;
    ma_hang?: number | null;
    ma_danh_muc?: number | null;
    gia_ban: number;
    gia_goc?: number | null;
    phan_tram_giam: number;
    so_luong_ton: number;
    so_luong_xem: number;
    diem_danh_gia: number;
    hinh_anh_dai_dien?: string | null;
    mo_ta_ngan?: string | null;
    nam_ra_mat?: number | null;
    ngay_tao: Date | string;
    trang_thai: number;
}

export interface ISanPhamChiTiet extends ISanPham {
    ma_hinh_anh: number;
    ma_san_pham: number;
    duong_dan_hinh_anh: string;
    thu_tu: number;
}