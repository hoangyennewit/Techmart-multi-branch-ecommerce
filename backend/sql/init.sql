--1 Vai trò(Roles)
CREATE TABLE IF NOT EXISTS vai_tro(
    ma_vai_tro SERIAL PRIMARY KEY,
    ten_vai_tro VARCHAR(50) UNIQUE NOT NULL,
    ten_hien_thi VARCHAR(100) NOT NULL,
    mo_ta TEXT
);

--2 Người dùng (Users)
CREATE TABLE IF NOT EXISTS nguoi_dung (
    ma_nguoi_dung SERIAL PRIMARY KEY,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NULL,
    google_id VARCHAR(255) UNIQUE NULL,
    kieu_dang_nhap VARCHAR(20) DEFAULT 'local',
    so_dien_thoai VARCHAR(20) NULL,
    dia_chi TEXT NULL,
    ma_vai_tro INT REFERENCES vai_tro(ma_vai_tro) DEFAULT 8, -- Mặc định là vai trò Khách hàng
    trang_thai BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT NOW()
);

--3 Danh mục
CREATE TABLE IF NOT EXISTS danh_muc (
    ma_danh_muc SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(100) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    mo_ta TEXT NULL,
    trang_thai TINYINT DEFAULT 1
);

--5 Sản phẩm (Product)
CREATE TABLE IF NOT EXISTS san_pham (
    id SERIAL PRIMARY KEY,
    ma_code VARCHAR(50) UNIQUE,
    slug VARCHAR(255) UNIQUE,
    ten_san_pham VARCHAR(255) NOT NULL,
    ma_hang INT REFERENCES hang(ma_hang),
    ma_danh_muc INT REFERENCES danh_muc(ma_danh_muc),
    gia_ban NUMERIC (12, 0) NOT NULL,
    gia_goc NUMERIC (12, 0),
    phan_tram_giam INT DEFAULT 0 CHECK(phan_tram_giam > 0 AND phan_tram_giam <=100),
    so_luong_ton INT DEFAULT 0,
    so_luot_xem INT DEFAULT 0,
    diem_danh_gia NUMERIC(2, 1) DEFAULT 0,
    hinh_anh_dai_dien TEXT,
    mo_ta_ngan TEXT,
    nam_ra_mat INT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trang_thai BOOLEAN DEFAULT TRUE
);

-- 4. Chèn danh sách các vai trò bạn cần (Seed Data)
INSERT INTO vai_tro (ten_vai_tro, ten_hien_thi, mo_ta) VALUES 
('ADMIN', 'Kỹ thuật viên', 'Quản trị hệ thống và kỹ thuật'),
('GIAM_DOC', 'Giám đốc', 'Toàn quyền quản lý hệ thống'),
('QL_SAN_PHAM', 'Quản lý Sản phẩm', 'Chuyên trách danh mục và hàng hóa'),
('QL_CUA_HANG', 'Quản lý Cửa hàng', 'Quản lý vận hành chi nhánh'),
('NV_CSKH', 'Nhân viên CSKH', 'Hỗ trợ và chăm sóc khách hàng'),
('NV_BAN_HANG', 'Nhân viên Bán hàng', 'Thực hiện giao dịch bán hàng'),
('NV_KHO', 'Nhân viên Kho', 'Quản lý nhập xuất tồn kho'),
('KHACH_HANG', 'Khách hàng', 'Người dùng đã đăng ký tài khoản');