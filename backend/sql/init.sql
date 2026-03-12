--1 Vai trò(Roles)
CREATE TABLE IF NOT EXISTS vai_tro(
    ma_vai_tro SERIAL PRIMARY KEY,
    ten_vai_tro VARCHAR(50) UNIQUE NOT FULL,
    mo_ta TEXT
);

--2 Người dùng (Users)
CREATE TABLE IF NOT EXISTS nguoi_dung (
    ma_nguoi_dung SERIAL PRIMARY KEY,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(20) NULL
    dia_chi TEXT,
    ma_vai_tro INT REFERENCES vai_tro(ma_vai_tro),
    trang_thai BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMPTS DEFAULT NOW()
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