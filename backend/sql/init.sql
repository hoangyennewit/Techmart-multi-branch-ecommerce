-- RESET
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- ENUM
CREATE TYPE trang_thai_don_hang AS ENUM (
    'cho_xac_nhan',
    'da_xac_nhan',
    'dang_giao',
    'hoan_thanh',
    'da_huy'
);
--1 VAI TRÒ
CREATE TABLE IF NOT EXISTS vai_tro(
    ma_vai_tro SERIAL PRIMARY KEY,
    ten_vai_tro VARCHAR(50) UNIQUE NOT NULL,
    ten_hien_thi VARCHAR(100) NOT NULL,
    mo_ta TEXT
);

INSERT INTO vai_tro (ten_vai_tro, ten_hien_thi, mo_ta) VALUES 
('ADMIN', 'Kỹ thuật viên', 'Quản trị hệ thống và kỹ thuật'),
('GIAM_DOC', 'Giám đốc', 'Toàn quyền quản lý hệ thống'),
('QL_SAN_PHAM', 'Quản lý Sản phẩm', 'Chuyên trách danh mục và hàng hóa'),
('QL_CUA_HANG', 'Quản lý Cửa hàng', 'Quản lý vận hành chi nhánh'),
('NV_CSKH', 'Nhân viên CSKH', 'Hỗ trợ và chăm sóc khách hàng'),
('NV_BAN_HANG', 'Nhân viên Bán hàng', 'Thực hiện giao dịch bán hàng'),
('NV_KHO', 'Nhân viên Kho', 'Quản lý nhập xuất tồn kho'),
('KHACH_HANG', 'Khách hàng', 'Người dùng đã đăng ký tài khoản');


--2 NGƯỜI DÙNG
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
INSERT INTO nguoi_dung 
(ho_ten, email, mat_khau, google_id, kieu_dang_nhap, so_dien_thoai, dia_chi, ma_vai_tro, trang_thai)
VALUES

--  ADMIN
('Nguyễn Văn Admin', 'admin@shop.vn', 'hashed_admin', NULL, 'local', '0909000001', 'TP.HCM', 1, TRUE),

--  GIÁM ĐỐC(123456)
('Trần Quốc Bảo', 'giamdoc@shop.vn', '$2b$10$9470SLMdtGJl3hFOSaRLtenOahK.HjStP9eTIIDiRNS8jCww329eS', NULL, 'local', '0909000002', 'Hà Nội', 2, TRUE),

-- QUẢN LÝ SẢN PHẨM
('Lê Minh Tuấn', 'qlsp@shop.vn', 'hashed_qlsp', NULL, 'local', '0909000003', 'TP.HCM', 3, TRUE),

-- QUẢN LÝ CỬA HÀNG
('Phạm Thị Lan', 'qlcuahang@shop.vn', 'hashed_store', NULL, 'local', '0909000004', 'Đà Nẵng', 4, TRUE),

--  NHÂN VIÊN CSKH
('Nguyễn Thị Hồng', 'cskh1@shop.vn', 'hashed_cskh1', NULL, 'local', '0909000005', 'TP.HCM', 5, TRUE),
('Đỗ Văn Nam', 'cskh2@shop.vn', 'hashed_cskh2', NULL, 'local', '0909000006', 'Hà Nội', 5, TRUE),

-- NHÂN VIÊN BÁN HÀNG (123456)
('Trần Văn Hùng', 'sale1@shop.vn', '$2b$10$9470SLMdtGJl3hFOSaRLtenOahK.HjStP9eTIIDiRNS8jCww329eS', NULL, 'local', '0909000007', 'TP.HCM', 6, TRUE),
('Lê Thị Mai', 'sale2@shop.vn', '$2b$10$9470SLMdtGJl3hFOSaRLtenOahK.HjStP9eTIIDiRNS8jCww329eS', NULL, 'local', '0909000008', 'Cần Thơ', 6, TRUE),
('Nguyễn Văn Nam', 'sale3@shop.vn', '$2b$10$9470SLMdtGJl3hFOSaRLtenOahK.HjStP9eTIIDiRNS8jCww329eS', NULL, 'local', '0911111111', 'TP.HCM', 6, TRUE),
('Trần Thị Hoa', 'sale4@shop.vn', '$2b$10$9470SLMdtGJl3hFOSaRLtenOahK.HjStP9eTIIDiRNS8jCww329eS', NULL, 'local', '0912222222', 'Hà Nội', 6, TRUE),
--  NHÂN VIÊN KHO
('Phan Quốc Khánh', 'kho1@shop.vn', 'hashed_kho1', NULL, 'local', '0909000009', 'Bình Dương', 7, TRUE),
('Nguyễn Văn Tài', 'kho2@shop.vn', 'hashed_kho2', NULL, 'local', '0909000010', 'Long An', 7, TRUE),

-- KHÁCH HÀNG (local)
('Hoàng Gia Huy', 'huy@gmail.com', 'hashed_user1', NULL, 'local', '0912345678', 'TP.HCM', 8, TRUE),
('Nguyễn Thùy Linh', 'linh@gmail.com', 'hashed_user2', NULL, 'local', '0987654321', 'Hà Nội', 8, TRUE),
('Nguyễn Văn Khánh', 'khanh12@gmail.com', 'hashed_userd', NULL, 'local', '0915555555', 'TP.HCM', 8, TRUE),
('Trần Văn Kha', 'kha45@gmail.com', 'hashed_usere', NULL, 'local', '0916666666', 'Hà Nội', 8, TRUE),
('Lê Thị Hoa', 'thihoa34@gmail.com', 'hashed_userf', NULL, 'local', NULL, 'Đà Nẵng', 8, TRUE),

--  KHÁCH HÀNG (Google login)
('Phạm Minh Anh', 'minhanh@gmail.com', NULL, 'google_abc123', 'google', '0933333333', 'Đà Nẵng', 8, TRUE),
('Trần Quốc Đạt', 'dat@gmail.com', NULL, 'google_xyz456', 'google', NULL, 'TP.HCM', 8, TRUE),

--  USER BỊ KHÓA
('User Bị Khóa', 'locked@shop.vn', 'hashed_locked', NULL, 'local', '0900000000', 'Hải Phòng', 8, FALSE);


--3 ĐỊA CHỈ
CREATE TABLE dia_chi (
    ma_dia_chi SERIAL PRIMARY KEY,
    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung) ON DELETE CASCADE,
    nguoi_nhan VARCHAR(150) NOT NULL,
    so_dien_thoai VARCHAR(20) NOT NULL,
    dia_chi_cu_the TEXT NOT NULL,
    tinh_thanh VARCHAR(100) NOT NULL,
    quan_huyen VARCHAR(100) NOT NULL,
    phuong_xa VARCHAR(100) NOT NULL,
    mac_dinh BOOLEAN DEFAULT FALSE
);

INSERT INTO dia_chi 
(ma_nguoi_dung, nguoi_nhan, so_dien_thoai, dia_chi_cu_the, tinh_thanh, quan_huyen, phuong_xa, mac_dinh)
VALUES

-- ADMIN
(1, 'Nguyễn Văn Admin', '0909000001', '12 Nguyễn Huệ', 'TP.HCM', 'Quận 1', 'Bến Nghé', TRUE),

-- GIÁM ĐỐC
(2, 'Trần Quốc Bảo', '0909000002', '88 Trần Duy Hưng', 'Hà Nội', 'Cầu Giấy', 'Trung Hòa', TRUE),

-- QL SẢN PHẨM
(3, 'Lê Minh Tuấn', '0909000003', '45 Lý Thường Kiệt', 'TP.HCM', 'Quận 10', 'Phường 14', TRUE),

-- QL CỬA HÀNG
(4, 'Phạm Thị Lan', '0909000004', '22 Nguyễn Văn Linh', 'Đà Nẵng', 'Hải Châu', 'Thạch Thang', TRUE),

-- CSKH
(5, 'Nguyễn Thị Hồng', '0909000005', '10 Cộng Hòa', 'TP.HCM', 'Tân Bình', 'Phường 4', TRUE),
(6, 'Đỗ Văn Nam', '0909000006', '55 Giải Phóng', 'Hà Nội', 'Hoàng Mai', 'Giáp Bát', TRUE),

-- SALE
(7, 'Trần Văn Hùng', '0909000007', '99 Võ Văn Kiệt', 'TP.HCM', 'Quận 5', 'Phường 7', TRUE),
(8, 'Lê Thị Mai', '0909000008', '33 30/4', 'Cần Thơ', 'Ninh Kiều', 'An Phú', TRUE),

-- KHO
(9, 'Phan Quốc Khánh', '0909000009', 'KCN VSIP', 'Bình Dương', 'Thuận An', 'An Phú', TRUE),
(10, 'Nguyễn Văn Tài', '0909000010', 'Ấp 3, Bến Lức', 'Long An', 'Bến Lức', 'Mỹ Yên', TRUE),

-- KHÁCH HÀNG
(11, 'Hoàng Gia Huy', '0912345678', '123 Nguyễn Trãi', 'TP.HCM', 'Quận 1', 'Bến Thành', TRUE),
(11, 'Hoàng Gia Huy', '0912345678', '45 Lê Văn Sỹ', 'TP.HCM', 'Quận 3', 'Phường 12', FALSE),
(12, 'Nguyễn Thùy Linh', '0987654321', '56 Trần Duy Hưng', 'Hà Nội', 'Cầu Giấy', 'Trung Hòa', TRUE),
(12, 'Nguyễn Thùy Linh', '0987654321', 'Chung cư Mỹ Đình', 'Hà Nội', 'Nam Từ Liêm', 'Mỹ Đình 1', FALSE),
(13, 'Phạm Minh Anh', '0933333333', '78 Nguyễn Văn Linh', 'Đà Nẵng', 'Hải Châu', 'Thạch Thang', TRUE),
(14, 'Trần Quốc Đạt', '0933333333', '200 Điện Biên Phủ', 'TP.HCM', 'Bình Thạnh', 'Phường 25', TRUE),

-- USER BỊ KHÓA
(15, 'User Bị Khóa', '0900000000', '99 Lạch Tray', 'Hải Phòng', 'Ngô Quyền', 'Đằng Giang', TRUE);

SELECT * FROM dia_chi;
-- Đảm bảo mỗi user chỉ có 1 địa chỉ mặc định;
CREATE UNIQUE INDEX unique_default_address
ON dia_chi(ma_nguoi_dung)
WHERE mac_dinh = TRUE;

-- 4 DANH MỤC
CREATE TABLE danh_muc (
    ma_danh_muc SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(100) NOT NULL,
    slug VARCHAR(150) UNIQUE,
    mo_ta TEXT,
    trang_thai SMALLINT DEFAULT 1 CHECK (trang_thai IN (0,1))
);
INSERT INTO danh_muc (ten_danh_muc, slug, mo_ta, trang_thai)
VALUES
('Điện thoại', 'dien-thoai', 'Các dòng smartphone mới nhất', 1),
('Laptop', 'laptop', 'Laptop học tập, làm việc, gaming', 1),
('Phụ kiện', 'phu-kien', 'Tai nghe, sạc, cáp, ốp lưng...', 1),
('Máy tính bảng', 'may-tinh-bang', 'iPad, Tablet Android', 1),
('Âm thanh', 'am-thanh', 'Loa bluetooth, tai nghe cao cấp', 1);
-- Thêm index cho slug (tăng tốc SEO);
CREATE INDEX idx_slug ON danh_muc(slug);

-- 5 HÃNG
CREATE TABLE hang (
    ma_hang SERIAL PRIMARY KEY,
    ten_hang VARCHAR(100) NOT NULL,
    logo VARCHAR(255),
    mo_ta TEXT
);

INSERT INTO hang (ten_hang, logo, mo_ta)
VALUES
('Apple', 'apple.png', 'Thương hiệu công nghệ cao cấp từ Mỹ'),
('Samsung', 'samsung.png', 'Tập đoàn điện tử lớn của Hàn Quốc'),
('Xiaomi', 'xiaomi.png', 'Hãng điện thoại giá tốt, cấu hình cao'),
('Oppo', 'oppo.png', 'Nổi bật với camera và thiết kế đẹp'),
('Vivo', 'vivo.png', 'Điện thoại trẻ trung, giá hợp lý'),
('Dell', 'dell.png', 'Laptop doanh nhân, bền bỉ'),
('HP', 'hp.png', 'Laptop văn phòng phổ biến'),
('Asus', 'asus.png', 'Laptop gaming và linh kiện máy tính'),
('Lenovo', 'lenovo.png', 'Laptop đa dạng phân khúc'),
('Sony', 'sony.png', 'Thiết bị điện tử và âm thanh cao cấp');

--Tránh trùng tên hãng
ALTER TABLE hang
ADD CONSTRAINT unique_ten_hang UNIQUE (ten_hang);
-- 6 SẢN PHẨM
CREATE TABLE san_pham (
    ma_san_pham SERIAL PRIMARY KEY,
    ten_san_pham VARCHAR(255) NOT NULL,
	ma_hang INT REFERENCES hang(ma_hang) ON DELETE SET NULL,
    ma_danh_muc INT REFERENCES danh_muc(ma_danh_muc) ON DELETE SET NULL,
	gia_ban INT NOT NULL CHECK (gia_ban >= 0),
    gia_goc INT CHECK (gia_goc >= 0),
	phan_tram_giam INT DEFAULT 0 CHECK (phan_tram_giam BETWEEN 0 AND 100),
    so_luong_ton INT DEFAULT 0 CHECK (so_luong_ton >= 0),
    so_luot_xem INT DEFAULT 0 CHECK (so_luot_xem >= 0),
	diem_danh_gia FLOAT DEFAULT 0 CHECK (diem_danh_gia BETWEEN 0 AND 5),
	hinh_anh_dai_dien VARCHAR(255),
    mo_ta_ngan TEXT,
	nam_ra_mat INT CHECK (nam_ra_mat >= 2000),
	ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,				trang_thai SMALLINT DEFAULT 1 CHECK (trang_thai IN (0,1))
);

INSERT INTO san_pham
(ten_san_pham, ma_hang, ma_danh_muc, gia_ban, gia_goc, phan_tram_giam, so_luong_ton, so_luot_xem, diem_danh_gia, hinh_anh_dai_dien, mo_ta_ngan, nam_ra_mat)
VALUES

-- iPhone
('iPhone 16 128GB',1,1,20000000,22000000,10,50,500,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776412967/products/iphone16_128GB_1776412965267.jpg','Chip A17, bản tiêu chuẩn',2024),
('iPhone 16 256GB',1,1,21000000,23000000,9,45,450,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776414799/products/iphone16_256GB_1776414797732.jpg','Bản 256GB',2024),
('iPhone 16 512GB',1,1,23000000,25000000,8,40,400,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776416395/products/iphone16_512GB_1776416393534.jpg','Dung lượng cao',2024),
('iPhone 16 Plus 128GB',1,1,23000000,25000000,8,35,420,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776416583/products/iphone16plus_1776416581399.jpg','Màn lớn 6.7 inch',2024),
('iPhone 16 Plus 256GB',1,1,24000000,26000000,8,30,390,4.8,'iphone16plus_256.jpg','Plus 256GB',2024),
('iPhone 16 Plus 512GB',1,1,26000000,28000000,7,25,350,4.9,'iphone16plus_512.jpg','Plus cao cấp',2024),
('iPhone 16 Pro 128GB',1,1,26000000,28000000,8,30,600,4.9,'iphone16pro.jpg','Chip A17 Pro',2024),
('iPhone 16 Pro 256GB',1,1,28000000,30000000,7,25,550,4.9,'iphone16pro_256.jpg','Pro 256GB',2024),
('iPhone 16 Pro 512GB',1,1,30000000,32000000,7,20,500,5.0,'iphone16pro_512.jpg','Pro cao cấp',2024),
('iPhone 16 Pro Max 128GB',1,1,30000000,32000000,7,20,700,5.0,'iphone16promax.jpg','Pin lớn',2024),
('iPhone 16 Pro Max 256GB',1,1,32000000,34000000,6,18,650,5.0,'iphone16promax_256.jpg','Pro Max 256GB',2024),
('iPhone 16 Pro Max 512GB',1,1,35000000,37000000,6,15,600,5.0,'iphone16promax_512.jpg','Cao cấp nhất',2024),
('iPhone 15 128GB',1,1,18000000,20000000,10,60,800,4.7,'iphone15.jpg','Chip A16',2023),
('iPhone 15 256GB',1,1,20000000,22000000,9,50,750,4.7,'iphone15_256.jpg','Bản 256GB',2023),
('iPhone 15 512GB',1,1,23000000,25000000,8,40,500,4.8,'ip15_512.jpg','iPhone 15 dung lượng cao',2023),
('iPhone 15 Plus 128GB',1,1,22000000,24000000,8,45,450,4.7,'ip15plus.jpg','Màn lớn 6.7 inch',2023),
('iPhone 15 Plus 256GB',1,1,24000000,26000000,8,40,420,4.8,'ip15plus_256.jpg','Plus 256GB',2023),
('iPhone 15 Plus 512GB',1,1,26000000,28000000,7,35,400,4.8,'ip15plus_512.jpg','Plus cao cấp',2023),
('iPhone 15 Pro 128GB',1,1,27000000,29000000,7,30,600,4.9,'ip15pro.jpg','Chip A16 mạnh',2023),
('iPhone 15 Pro 256GB',1,1,29000000,31000000,7,25,550,4.9,'ip15pro_256.jpg','Pro 256GB',2023),
('iPhone 15 Pro 512GB',1,1,31000000,33000000,6,20,500,5.0,'ip15pro_512.jpg','Pro cao cấp',2023),
('iPhone 15 Pro Max 128GB',1,1,30000000,32000000,7,20,700,5.0,'ip15promax.jpg','Pin lớn',2023),
('iPhone 15 Pro Max 256GB',1,1,32000000,34000000,6,18,650,5.0,'ip15promax_256.jpg','Pro Max 256GB',2023),
('iPhone 15 Pro Max 512GB',1,1,35000000,37000000,6,15,600,5.0,'ip15promax_512.jpg','Cao cấp nhất',2023),
('iPhone 14 128GB',1,1,18000000,20000000,10,60,800,4.7,'ip14.jpg','iPhone 14',2022),
('iPhone 14 256GB',1,1,20000000,22000000,9,55,750,4.7,'ip14_256.jpg','iPhone 14 256GB',2022),
('iPhone 14 512GB',1,1,22000000,24000000,8,50,700,4.8,'ip14_512.jpg','Dung lượng cao',2022),
('iPhone 14 Plus 128GB',1,1,21000000,23000000,9,45,650,4.7,'ip14plus.jpg','Màn lớn',2022),
('iPhone 14 Plus 256GB',1,1,23000000,25000000,8,40,600,4.8,'ip14plus_256.jpg','Plus 256GB',2022),
('iPhone 14 Plus 512GB',1,1,25000000,27000000,8,35,550,4.8,'ip14plus_512.jpg','Plus cao cấp',2022),
('iPhone 14 Pro 128GB',1,1,28000000,30000000,7,30,700,4.9,'ip14pro.jpg','Pro mạnh',2022),
('iPhone 14 Pro 256GB',1,1,30000000,32000000,7,25,650,4.9,'ip14pro_256.jpg','Pro 256GB',2022),
('iPhone 14 Pro 512GB',1,1,32000000,34000000,6,20,600,5.0,'ip14pro_512.jpg','Pro cao cấp',2022),
('iPhone 14 Pro Max 128GB',1,1,30000000,32000000,7,20,800,5.0,'ip14promax.jpg','Pin lớn',2022),
('iPhone 14 Pro Max 256GB',1,1,32000000,34000000,6,18,750,5.0,'ip14promax_256.jpg','Pro Max 256GB',2022),
('iPhone 14 Pro Max 512GB',1,1,35000000,37000000,6,15,700,5.0,'ip14promax_512.jpg','Cao cấp nhất',2022),
('iPhone 13 mini 128GB',1,1,16000000,18000000,10,70,500,4.6,'ip13mini.jpg','Nhỏ gọn',2021),
('iPhone 13 mini 256GB',1,1,18000000,20000000,9,60,450,4.6,'ip13mini_256.jpg','Mini 256GB',2021),
('iPhone 13 mini 512GB',1,1,20000000,22000000,8,50,400,4.7,'ip13mini_512.jpg','Mini cao cấp',2021),
('iPhone 13 128GB',1,1,18000000,20000000,10,60,700,4.7,'ip13.jpg','iPhone 13',2021),
('iPhone 13 256GB',1,1,20000000,22000000,9,55,650,4.7,'ip13_256.jpg','256GB',2021),
('iPhone 13 512GB',1,1,22000000,24000000,8,50,600,4.8,'ip13_512.jpg','Dung lượng cao',2021),
('iPhone 13 Pro 128GB',1,1,26000000,28000000,8,40,650,4.9,'ip13pro.jpg','Pro',2021),
('iPhone 13 Pro 256GB',1,1,28000000,30000000,7,35,600,4.9,'ip13pro_256.jpg','Pro 256GB',2021),
('iPhone 13 Pro 512GB',1,1,30000000,32000000,7,30,550,5.0,'ip13pro_512.jpg','Pro cao cấp',2021),
('iPhone 13 Pro Max 128GB',1,1,29000000,31000000,7,35,700,5.0,'ip13promax.jpg','Pin trâu',2021),
('iPhone 13 Pro Max 256GB',1,1,31000000,33000000,6,30,650,5.0,'ip13promax_256.jpg','256GB',2021),
('iPhone 13 Pro Max 512GB',1,1,34000000,36000000,6,25,600,5.0,'ip13promax_512.jpg','Cao cấp',2021),
('iPhone 12 mini 64GB',1,1,12000000,14000000,12,70,500,4.5,'ip12mini.jpg','Mini nhỏ gọn',2020),
('iPhone 12 mini 128GB',1,1,14000000,16000000,10,65,480,4.6,'ip12mini_128.jpg','Mini 128GB',2020),
('iPhone 12 mini 256GB',1,1,16000000,18000000,9,60,450,4.6,'ip12mini_256.jpg','Mini cao cấp',2020),
('iPhone 12 64GB',1,1,15000000,17000000,10,70,600,4.6,'ip12.jpg','iPhone 12',2020),
('iPhone 12 128GB',1,1,17000000,19000000,9,65,550,4.7,'ip12_128.jpg','128GB',2020),
('iPhone 12 256GB',1,1,19000000,21000000,8,60,500,4.7,'ip12_256.jpg','256GB',2020),
('iPhone 12 Pro 128GB',1,1,24000000,26000000,8,45,550,4.8,'ip12pro.jpg','Pro',2020),
('iPhone 12 Pro 256GB',1,1,26000000,28000000,7,40,500,4.9,'ip12pro_256.jpg','Pro 256GB',2020),
('iPhone 12 Pro 512GB',1,1,28000000,30000000,7,35,450,5.0,'ip12pro_512.jpg','Pro cao cấp',2020),
('iPhone 12 Pro Max 128GB',1,1,27000000,29000000,7,40,600,5.0,'ip12promax.jpg','Max',2020),
('iPhone 12 Pro Max 256GB',1,1,29000000,31000000,6,35,550,5.0,'ip12promax_256.jpg','256GB',2020),
('iPhone 12 Pro Max 512GB',1,1,31000000,33000000,6,30,500,5.0,'ip12promax_512.jpg','Cao cấp',2020),
('iPhone 11 64GB',1,1,13000000,15000000,12,80,700,4.5,'ip11.jpg','iPhone 11',2019),
('iPhone 11 128GB',1,1,15000000,17000000,10,75,650,4.6,'ip11_128.jpg','128GB',2019),
('iPhone 11 256GB',1,1,17000000,19000000,9,70,600,4.6,'ip11_256.jpg','256GB',2019),
('iPhone 11 Pro 64GB',1,1,20000000,22000000,9,60,500,4.7,'ip11pro.jpg','Pro',2019),
('iPhone 11 Pro 256GB',1,1,22000000,24000000,8,55,450,4.8,'ip11pro_256.jpg','256GB',2019),
('iPhone 11 Pro 512GB',1,1,24000000,26000000,7,50,400,4.8,'ip11pro_512.jpg','Cao cấp',2019),
('iPhone 11 Pro Max 64GB',1,1,23000000,25000000,8,60,550,4.8,'ip11promax.jpg','Max',2019),
('iPhone 11 Pro Max 256GB',1,1,25000000,27000000,7,55,500,4.9,'ip11promax_256.jpg','256GB',2019),
('iPhone 11 Pro Max 512GB',1,1,27000000,29000000,7,50,450,5.0,'ip11promax_512.jpg','Cao cấp',2019),
('iPhone X 64GB',1,1,12000000,14000000,12,60,400,4.5,'ipx.jpg','iPhone X',2017),
('iPhone X 256GB',1,1,14000000,16000000,10,55,350,4.6,'ipx_256.jpg','256GB',2017),
('iPhone XS 64GB',1,1,14000000,16000000,10,60,400,4.6,'ipxs.jpg','XS',2018),
('iPhone XS 256GB',1,1,16000000,18000000,9,55,350,4.7,'ipxs_256.jpg','256GB',2018),
('iPhone XS 512GB',1,1,18000000,20000000,8,50,300,4.7,'ipxs_512.jpg','Cao cấp',2018),
('iPhone XS Max 64GB',1,1,17000000,19000000,9,55,450,4.7,'ipxsmax.jpg','Màn lớn',2018),
('iPhone XS Max 256GB',1,1,19000000,21000000,8,50,400,4.8,'ipxsmax_256.jpg','256GB',2018),
('iPhone XS Max 512GB',1,1,21000000,23000000,7,45,350,4.8,'ipxsmax_512.jpg','Cao cấp',2018),
('iPhone XR 64GB',1,1,12000000,14000000,12,80,500,4.5,'ipxr.jpg','XR',2018),
('iPhone XR 128GB',1,1,14000000,16000000,10,75,450,4.6,'ipxr_128.jpg','128GB',2018),
('iPhone XR 256GB',1,1,16000000,18000000,9,70,400,4.6,'ipxr_256.jpg','256GB',2018),

-- Samsung
('Samsung Galaxy S24 Ultra 128GB',2,1,30000000,32000000,6,40,800,4.9,'s24ultra.jpg','Flagship 2024',2024),
('Samsung Galaxy S24 Ultra 256GB',2,1,32000000,34000000,6,35,750,4.9,'s24ultra_256.jpg','Ultra 256GB',2024),
('Samsung Galaxy S24+ 128GB',2,1,22000000,24000000,8,50,700,4.8,'s24plus.jpg','S24 Plus',2024),
('Samsung Galaxy S24+ 256GB',2,1,24000000,26000000,8,45,650,4.8,'s24plus_256.jpg','Plus 256GB',2024),
('Samsung Galaxy S24 128GB',2,1,20000000,22000000,9,60,800,4.7,'s24.jpg','S24',2024),
('Samsung Galaxy S24 256GB',2,1,22000000,24000000,8,55,750,4.7,'s24_256.jpg','S24 256GB',2024),
('Samsung Galaxy S23 Ultra 128GB',2,1,28000000,30000000,7,40,700,4.9,'s23ultra.jpg','Ultra',2023),
('Samsung Galaxy S23 Ultra 256GB',2,1,30000000,32000000,6,35,650,4.9,'s23ultra_256.jpg','Ultra 256GB',2023),
('Samsung Galaxy S23+ 128GB',2,1,20000000,22000000,9,50,700,4.7,'s23plus.jpg','Plus',2023),
('Samsung Galaxy S23+ 256GB',2,1,22000000,24000000,8,45,650,4.7,'s23plus_256.jpg','Plus 256GB',2023),
('Samsung Galaxy S23 128GB',2,1,18000000,20000000,10,60,800,4.7,'s23.jpg','S23',2023),
('Samsung Galaxy S23 256GB',2,1,20000000,22000000,9,55,750,4.7,'s23_256.jpg','256GB',2023),
('Samsung Galaxy S22 Ultra 128GB',2,1,25000000,27000000,7,40,600,4.8,'s22ultra.jpg','Ultra',2022),
('Samsung Galaxy S22 Ultra 256GB',2,1,27000000,29000000,6,35,550,4.8,'s22ultra_256.jpg','256GB',2022),
('Samsung Galaxy S22+ 128GB',2,1,18000000,20000000,9,50,600,4.6,'s22plus.jpg','Plus',2022),
('Samsung Galaxy S22+ 256GB',2,1,20000000,22000000,8,45,550,4.6,'s22plus_256.jpg','256GB',2022),
('Samsung Galaxy S22 128GB',2,1,16000000,18000000,10,60,650,4.6,'s22.jpg','S22',2022),
('Samsung Galaxy S22 256GB',2,1,18000000,20000000,9,55,600,4.6,'s22_256.jpg','256GB',2022),
('Samsung Galaxy Z Fold 5 256GB',2,1,45000000,48000000,6,20,500,4.9,'zfold5.jpg','Gập cao cấp',2023),
('Samsung Galaxy Z Fold 5 512GB',2,1,48000000,51000000,5,18,450,5.0,'zfold5_512.jpg','512GB',2023),
('Samsung Galaxy Z Flip 5 256GB',2,1,25000000,27000000,7,30,600,4.8,'zflip5.jpg','Gập nhỏ',2023),
('Samsung Galaxy Z Flip 5 512GB',2,1,27000000,29000000,6,25,550,4.8,'zflip5_512.jpg','512GB',2023),
('Samsung Galaxy Z Fold 4 256GB',2,1,40000000,43000000,7,20,450,4.8,'zfold4.jpg','Fold 4',2022),
('Samsung Galaxy Z Fold 4 512GB',2,1,43000000,46000000,6,18,400,4.8,'zfold4_512.jpg','512GB',2022),
('Samsung Galaxy Z Flip 4 256GB',2,1,23000000,25000000,8,30,550,4.7,'zflip4.jpg','Flip 4',2022),
('Samsung Galaxy Z Flip 4 512GB',2,1,25000000,27000000,7,25,500,4.7,'zflip4_512.jpg','512GB',2022),
('Samsung Galaxy A54 128GB',2,1,9000000,10000000,10,80,900,4.5,'a54.jpg','Tầm trung',2023),
('Samsung Galaxy A54 256GB',2,1,10000000,11000000,9,70,850,4.5,'a54_256.jpg','256GB',2023),
('Samsung Galaxy A34 128GB',2,1,7000000,8000000,10,100,1000,4.4,'a34.jpg','Giá rẻ',2023),
('Samsung Galaxy A34 256GB',2,1,10000000,11000000,9,40,300,4.5,'a34.jpg','Dimensity 1080, pin 5000mAh',2023),
('Samsung Galaxy A24 128GB',2,1,7500000,8200000,8,50,280,4.4,'a24.jpg','Helio G99, pin 5000mAh',2023),
('Samsung Galaxy A24 256GB',2,1,8700000,9500000,8,45,260,4.5,'a24_256.jpg','Bản 256GB',2023),
('Samsung Galaxy A14 128GB',2,1,6200000,7000000,10,60,240,4.3,'a14.jpg','Exynos 850, giá rẻ',2023),
('Samsung Galaxy A14 256GB',2,1,7500000,8200000,9,55,220,4.3,'a14_256.jpg','Dung lượng cao',2023),
('Samsung Galaxy A04 64GB',2,1,5000000,5500000,9,70,200,4.2,'a04.jpg','Cơ bản, pin 5000mAh',2022),
('Samsung Galaxy A04 128GB',2,1,6200000,7000000,8,65,180,4.2,'a04_128.jpg','Bản 128GB',2022),
('Samsung Galaxy M54 128GB',2,1,8700000,9500000,8,40,320,4.6,'m54.jpg','Camera 108MP, pin 6000mAh',2023),
('Samsung Galaxy M54 256GB',2,1,10000000,11000000,9,35,300,4.7,'m54_256.jpg','Hiệu năng cao',2023),
('Samsung Galaxy M34 128GB',2,1,7500000,8200000,8,50,280,4.5,'m34.jpg','Pin 6000mAh',2023),
('Samsung Galaxy M34 256GB',2,1,8700000,9500000,8,45,260,4.5,'m34_256.jpg','Bản 256GB',2023),
('Samsung Galaxy M14 128GB',2,1,6200000,7000000,9,60,230,4.3,'m14.jpg','Pin trâu 6000mAh',2023),
('Samsung Galaxy M14 256GB',2,1,7500000,8200000,8,55,210,4.3,'m14_256.jpg','Dung lượng cao',2023),
('Samsung Galaxy M04 64GB',2,1,5000000,5500000,9,70,190,4.2,'m04.jpg','Giá rẻ',2022),
('Samsung Galaxy M04 128GB',2,1,6200000,7000000,8,65,170,4.2,'m04_128.jpg','Bản 128GB',2022),
('Samsung Galaxy F54 128GB',2,1,8700000,9500000,8,40,300,4.6,'f54.jpg','108MP, pin 6000mAh',2023),
('Samsung Galaxy F54 256GB',2,1,10000000,11000000,9,35,280,4.7,'f54_256.jpg','Hiệu năng mạnh',2023),
('Samsung Galaxy F34 128GB',2,1,7500000,8200000,8,50,260,4.5,'f34.jpg','Pin lớn, ổn định',2023),

-- Xiaomi 
('Xiaomi 15 Pro 256GB',3,1,20000000,22000000,9,30,400,4.8,'mi15pro.jpg','Snapdragon 8 Elite, pin 6100mAh',2024),
('Xiaomi 15 Pro 512GB',3,1,22500000,24500000,8,25,380,4.9,'mi15pro_512.jpg','RAM 16GB, flagship',2024),
('Xiaomi 15 Pro 1TB',3,1,25000000,27000000,8,20,350,4.9,'mi15pro_1tb.jpg','Bản cao cấp nhất',2024),
('Xiaomi 15 256GB',3,1,17500000,19000000,8,35,360,4.7,'mi15.jpg','Flagship nhỏ gọn',2024),
('Xiaomi 15 512GB',3,1,20000000,22000000,9,30,340,4.8,'mi15_512.jpg','RAM 16GB',2024),
('Xiaomi 14T Pro 256GB',3,1,16000000,17500000,8,40,320,4.7,'mi14tpro.jpg','Dimensity 9300+',2024),
('Xiaomi 14T Pro 512GB',3,1,19800000,21500000,8,35,300,4.8,'mi14tpro_512.jpg','Hiệu năng mạnh',2024),
('Xiaomi 14T Pro 1TB',3,1,22500000,24500000,8,30,280,4.8,'mi14tpro_1tb.jpg','Dung lượng lớn',2024),
('Xiaomi 14T 256GB',3,1,15000000,16500000,9,45,310,4.6,'mi14t.jpg','Dimensity 8300 Ultra',2024),
('Xiaomi 14T 512GB',3,1,17500000,19000000,8,40,290,4.7,'mi14t_512.jpg','Bản nâng cấp',2024),
('Xiaomi 14 Pro 256GB',3,1,20000000,22000000,9,30,330,4.8,'mi14pro.jpg','Snapdragon 8 Gen 3',2023),
('Xiaomi 14 Pro 512GB',3,1,22500000,24500000,8,25,300,4.8,'mi14pro_512.jpg','Hiệu năng cao',2023),
('Xiaomi 14 256GB',3,1,17500000,19000000,8,35,320,4.7,'mi14.jpg','Nhỏ gọn mạnh mẽ',2023),
('Xiaomi 14 512GB',3,1,20000000,22000000,9,30,300,4.7,'mi14_512.jpg','RAM 12GB',2023),
('Redmi Note 14 Pro+ 5G 128GB',3,1,9400000,10500000,9,50,280,4.6,'rn14proplus.jpg','Camera 200MP',2024),
('Redmi Note 14 Pro+ 5G 256GB',3,1,10000000,11000000,9,45,260,4.6,'rn14proplus_256.jpg','Snapdragon 7s Gen 3',2024),
('Redmi Note 14 Pro+ 5G 512GB',3,1,10800000,12000000,8,40,240,4.7,'rn14proplus_512.jpg','Bản cao cấp',2024),
('Redmi Note 14 Pro 5G 128GB',3,1,8700000,9500000,8,55,250,4.5,'rn14pro.jpg','Dimensity 7300',2024),
('Redmi Note 14 Pro 5G 256GB',3,1,9500000,10500000,9,50,230,4.5,'rn14pro_256.jpg','RAM 12GB',2024),
('Redmi Note 14 Pro 4G 128GB',3,1,7500000,8200000,8,60,220,4.4,'rn14pro4g.jpg','Snapdragon 732G',2024),
('Redmi Note 14 Pro 4G 256GB',3,1,8200000,9000000,9,55,200,4.4,'rn14pro4g_256.jpg','Giá tốt',2024),
('Redmi Note 14 5G 128GB',3,1,7000000,7800000,9,65,210,4.4,'rn14.jpg','Dimensity 7025',2024),
('Redmi Note 14 5G 256GB',3,1,7800000,8600000,9,60,200,4.4,'rn14_256.jpg','Pin 5000mAh',2024),
('Redmi Note 14 4G 128GB',3,1,6200000,7000000,8,70,190,4.3,'rn14_4g.jpg','Snapdragon 680',2024),
('Redmi Note 14 4G 256GB',3,1,7000000,7800000,9,65,180,4.3,'rn14_4g_256.jpg','Giá rẻ',2024),
('Redmi 14C 5G 64GB',3,1,5000000,5500000,9,80,170,4.2,'r14c.jpg','Giá rẻ 5G',2024),
('Redmi 14C 5G 128GB',3,1,5700000,6200000,8,75,160,4.2,'r14c_128.jpg','RAM 6GB',2024),

-- oppo
('Oppo Find N3 512GB',4,1,35000000,38000000,8,20,300,4.9,'findn3.jpg','Điện thoại gập cao cấp',2023),
('Oppo Find N3 Flip 256GB',4,1,25000000,27000000,8,25,280,4.8,'findn3flip.jpg','Flip nhỏ gọn',2023),
('Oppo Find X8 Pro 256GB',4,1,32000000,35000000,9,20,260,4.9,'findx8pro.jpg','Flagship mạnh',2024),
('Oppo Find X8 256GB',4,1,27500000,30000000,8,25,240,4.8,'findx8.jpg','Cao cấp',2024),
('Oppo Find X7 Ultra 256GB',4,1,30000000,33000000,9,20,250,4.9,'findx7ultra.jpg','Camera đỉnh',2024),
('Oppo Find X7 Ultra 512GB',4,1,32500000,35000000,8,15,230,4.9,'findx7ultra_512.jpg','RAM 16GB',2024),
('Oppo Find X7 256GB',4,1,27500000,30000000,8,25,240,4.8,'findx7.jpg','Dimensity 9300',2024),
('Oppo Find X7 512GB',4,1,30000000,33000000,9,20,220,4.8,'findx7_512.jpg','Hiệu năng mạnh',2024),
('Oppo Find X6 Pro 256GB',4,1,25000000,27000000,8,30,260,4.8,'findx6pro.jpg','Flagship 2023',2023),
('Oppo Reno13 F 256GB',4,1,12500000,13500000,8,40,260,4.6,'reno13f.jpg','Pin 5800mAh',2025),
('Oppo Reno13 Pro 512GB',4,1,20000000,22000000,9,30,240,4.8,'reno13pro.jpg','Dimensity 8350',2025),
('Oppo Reno13 256GB',4,1,17500000,19000000,8,35,230,4.7,'reno13.jpg','Hiệu năng tốt',2025),
('Oppo Reno12 F 256GB',4,1,11200000,12500000,9,45,250,4.5,'reno12f.jpg','Snapdragon 685',2024),
('Oppo Reno12 Pro 512GB',4,1,18700000,20500000,8,30,230,4.7,'reno12pro.jpg','Dimensity 8200',2024),
('Oppo Reno12 256GB',4,1,15000000,16500000,9,40,220,4.6,'reno12.jpg','Ổn định',2024),
('Oppo Reno11 F 256GB',4,1,12500000,13500000,8,50,240,4.5,'reno11f.jpg','Giá tốt',2024),
('Oppo Reno11 Pro 512GB',4,1,17500000,19000000,8,35,220,4.7,'reno11pro.jpg','Camera đẹp',2024),
('Oppo A5 Pro 256GB',4,1,15000000,16500000,9,60,210,4.5,'a5pro.jpg','Pin 6000mAh',2024),
('Oppo A5 Pro 512GB',4,1,17500000,19000000,8,55,200,4.6,'a5pro_512.jpg','RAM 12GB',2024),
('Oppo A80 256GB',4,1,12500000,13500000,8,60,210,4.4,'a80.jpg','Dimensity 6300',2024),
('Oppo A3 128GB',4,1,10000000,11000000,9,70,200,4.3,'a3.jpg','Giá rẻ',2024),
('Oppo A3x 128GB',4,1,11200000,12500000,8,65,190,4.3,'a3x.jpg','Pin 5100mAh',2024),
('Oppo A3x 256GB',4,1,12500000,13500000,8,60,180,4.4,'a3x_256.jpg','RAM 6GB',2024),
('Oppo A60 128GB',4,1,11200000,12500000,9,65,190,4.4,'a60.jpg','Snapdragon 680',2024),
('Oppo A60 256GB',4,1,12500000,13500000,8,60,180,4.4,'a60_256.jpg','Bản nâng cấp',2024),
('Oppo K12 Plus 256GB',4,1,17500000,19000000,8,50,200,4.6,'k12plus.jpg','Pin 6400mAh',2024),
('Oppo K12 Plus 512GB',4,1,20000000,22000000,9,45,190,4.7,'k12plus_512.jpg','Snapdragon 7 Gen 3',2024),
('Oppo F27 128GB',4,1,12500000,13500000,8,55,200,4.5,'f27.jpg','Dimensity 7050',2024),
('Oppo F27 256GB',4,1,13700000,15000000,9,50,190,4.5,'f27_256.jpg','Ổn định',2024),
('Oppo F27 Pro+ 256GB',4,1,15000000,16500000,8,45,180,4.6,'f27pro.jpg','Thiết kế đẹp',2024),
('Oppo F27 Pro+ 512GB',4,1,17500000,19000000,9,40,170,4.6,'f27pro_512.jpg','RAM 12GB',2024),
('Oppo F25 Pro 128GB',4,1,13700000,15000000,8,50,200,4.5,'f25pro.jpg','Snapdragon 778G',2023),
('Oppo F25 Pro 256GB',4,1,15000000,16500000,9,45,190,4.5,'f25pro_256.jpg','Bản 256GB',2023),
-- Laptop

('MacBook Air M2', 1, 2, 28000000, 30000000, 7, 20, 500, 4.9, 'macbookm2.jpg', 'Laptop mỏng nhẹ Apple', 2023),
('Dell XPS 13', 6, 2, 32000000, 35000000, 8, 15, 300, 4.8, 'xps13.jpg', 'Laptop cao cấp Dell', 2022);


-- 7 HÌNH ẢNH
CREATE TABLE hinh_anh_san_pham (
    ma_hinh_anh SERIAL PRIMARY KEY,
	ma_san_pham INT NOT NULL
        REFERENCES san_pham(ma_san_pham)
        ON DELETE CASCADE,
	duong_dan_hinh VARCHAR(255) NOT NULL,
	thu_tu INT DEFAULT 1 CHECK (thu_tu >= 1)
);

INSERT INTO hinh_anh_san_pham (ma_san_pham, duong_dan_hinh, thu_tu)
VALUES

-- iPhone 16
(1, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776412967/products/iphone16_128GB_1776412965267.jpg', 1),
(2, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776412967/products/iphone16_256GB_1776412965267.jpg', 1),
(3, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776412967/products/iphone16_512GB_1776412965267.jpg', 1);


 
-- 8 GIỎ HÀNG
CREATE TABLE gio_hang (
    ma_gio_hang SERIAL PRIMARY KEY,

    ma_nguoi_dung INT NOT NULL
        REFERENCES nguoi_dung(ma_nguoi_dung)
        ON DELETE CASCADE,

    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    trang_thai VARCHAR(50) DEFAULT 'dang_mua'
        CHECK (trang_thai IN ('dang_mua', 'da_chuyen_don'))
);
INSERT INTO gio_hang (ma_nguoi_dung, trang_thai)
VALUES
(11, 'dang_mua'),
(12, 'dang_mua'),
(13, 'da_chuyen_don'),
(14, 'dang_mua'),
(15, 'da_chuyen_don');
--Mỗi user chỉ có 1 giỏ hàng đang mua
CREATE UNIQUE INDEX unique_cart_active
ON gio_hang(ma_nguoi_dung)
WHERE trang_thai = 'dang_mua';

-- 9 CHI TIET GIO HANG 
CREATE TABLE chi_tiet_gio_hang (
    ma_chi_tiet_gh SERIAL PRIMARY KEY,

    ma_gio_hang INT NOT NULL
        REFERENCES gio_hang(ma_gio_hang)
        ON DELETE CASCADE,

    ma_san_pham INT NOT NULL
        REFERENCES san_pham(ma_san_pham)
        ON DELETE CASCADE,

    so_luong INT NOT NULL CHECK (so_luong > 0),

    don_gia INT NOT NULL CHECK (don_gia >= 0)
);

INSERT INTO chi_tiet_gio_hang (ma_gio_hang, ma_san_pham, so_luong, don_gia)
VALUES
(1, 1, 1, 19000000), -- iPhone
(1, 3, 2, 18000000), -- Samsung
(2, 5, 1, 28000000), -- MacBook
(2, 4, 1, 9000000);

--Xem giỏ hàng chi tiết
SELECT 
    sp.ten_san_pham,
    ct.so_luong,
    ct.don_gia,
    (ct.so_luong * ct.don_gia) AS thanh_tien
FROM chi_tiet_gio_hang ct
JOIN san_pham sp 
    ON ct.ma_san_pham = sp.ma_san_pham
WHERE ct.ma_gio_hang = 1;
--Tổng tiền giỏ hàng
SELECT 
    SUM(so_luong * don_gia) AS tong_tien
FROM chi_tiet_gio_hang
WHERE ma_gio_hang = 1;

-- 10 ĐƠN HÀNG
CREATE TABLE don_hang (
    ma_don_hang SERIAL PRIMARY KEY,

    ma_nguoi_dung INT NOT NULL
        REFERENCES nguoi_dung(ma_nguoi_dung)
        ON DELETE SET NULL,

    tong_tien INT NOT NULL CHECK (tong_tien >= 0),

    trang_thai VARCHAR(50) NOT NULL
        CHECK (trang_thai IN (
            'cho_xac_nhan',
            'da_xac_nhan',
            'dang_giao',
            'hoan_thanh',
            'da_huy'
        )),

    ngay_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO don_hang (ma_nguoi_dung, tong_tien, trang_thai, ngay_dat)
VALUES
(11, 19000000, 'cho_xac_nhan', '2025-01-15 10:30:00'),
(12, 36000000, 'da_xac_nhan', '2025-03-20 14:45:00'),
(13, 28000000, 'dang_giao', '2025-06-10 09:15:00'),
(14, 9000000, 'hoan_thanh', '2025-11-05 16:20:00'),
(15, 15000000, 'da_huy', '2026-02-14 11:00:00'),
(11, 22500000, 'hoan_thanh', '2025-02-28 13:00:00'),
(12, 45000000, 'hoan_thanh', '2025-04-15 15:30:00'),
(13, 32000000, 'hoan_thanh', '2025-07-22 10:45:00'),
(14, 12000000, 'da_xac_nhan', '2025-09-10 12:15:00'),
(15, 18500000, 'dang_giao', '2025-12-01 08:00:00'),
(11, 25000000, 'hoan_thanh', '2026-01-10 09:30:00'),
(12, 38000000, 'hoan_thanh', '2026-03-15 14:20:00'),
(13, 29500000, 'cho_xac_nhan', '2026-04-05 11:00:00'),
(14, 11000000, 'dang_giao', '2026-04-20 13:45:00'),
(11, 22500000, 'hoan_thanh', '2026-03-28 13:00:00'),
(12, 45000000, 'hoan_thanh', '2026-01-15 15:30:00'),
(13, 32000000, 'hoan_thanh', '2026-05-12 10:45:00'),
(15, 20000000, 'da_xac_nhan', '2026-04-30 10:15:00');

-- 11 CHI TIẾT ĐƠN
CREATE TABLE chi_tiet_don_hang (
    ma_chi_tiet_dh SERIAL PRIMARY KEY,

    ma_don_hang INT NOT NULL
        REFERENCES don_hang(ma_don_hang)
        ON DELETE CASCADE,

    ma_san_pham INT NOT NULL
        REFERENCES san_pham(ma_san_pham)
        ON DELETE SET NULL,

    so_luong INT NOT NULL CHECK (so_luong > 0),

    don_gia INT NOT NULL CHECK (don_gia >= 0)
);

INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, so_luong, don_gia)
VALUES

-- Đơn 1
(1, 1, 1, 19000000), -- iPhone
(1, 3, 1, 18000000), -- Samsung

-- Đơn 2
(2, 5, 1, 28000000), -- MacBook

-- Đơn 3
(3, 2, 2, 25000000),

-- Đơn 4
(4, 4, 1, 9000000);
 --Xem chi tiết 1 đơn hàng
SELECT 
    sp.ten_san_pham,
    ct.so_luong,
    ct.don_gia,
    (ct.so_luong * ct.don_gia) AS thanh_tien
FROM chi_tiet_don_hang ct
JOIN san_pham sp 
    ON ct.ma_san_pham = sp.ma_san_pham
WHERE ct.ma_don_hang = 1;
--Tính lại tổng tiền đơn hàng
SELECT 
    ma_don_hang,
    SUM(so_luong * don_gia) AS tong_tien
FROM chi_tiet_don_hang
GROUP BY ma_don_hang;
--JOIN full (user + đơn + sản phẩm)
SELECT 
    nd.ho_ten,
    dh.ma_don_hang,
    sp.ten_san_pham,
    ct.so_luong
FROM chi_tiet_don_hang ct
JOIN don_hang dh ON ct.ma_don_hang = dh.ma_don_hang
JOIN nguoi_dung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
JOIN san_pham sp ON ct.ma_san_pham = sp.ma_san_pham;
--Tạo index tăng tốc
CREATE INDEX idx_ctdh_don ON chi_tiet_don_hang(ma_don_hang);

--12 LOAI THONG SO
CREATE TABLE loai_thong_so (
    ma_loai_ts SERIAL PRIMARY KEY,

    ten_thong_so VARCHAR(150) NOT NULL,

    ma_danh_muc INT NOT NULL
        REFERENCES danh_muc(ma_danh_muc)
        ON DELETE CASCADE,

    thu_tu_hien_thi INT DEFAULT 1 CHECK (thu_tu_hien_thi >= 1)
);
INSERT INTO loai_thong_so (ten_thong_so, ma_danh_muc, thu_tu_hien_thi)
VALUES

-- Điện thoại
('Màn hình', 1, 1),
('Hệ điều hành', 1, 2),
('Camera sau', 1, 3),
('Camera trước', 1, 4),
('CPU', 1, 5),
('RAM', 1, 6),
('Bộ nhớ trong', 1, 7),
('Pin', 1, 8),
('SIM', 1, 9),

--  Laptop
('CPU', 2, 1),
('RAM', 2, 2),
('Ổ cứng', 2, 3),
('Card đồ họa', 2, 4),
('Màn hình', 2, 5),
('Pin', 2, 6),
('Trọng lượng', 2, 7);

--Lấy thông số theo danh mục
SELECT *
FROM loai_thong_so
WHERE ma_danh_muc = 1
ORDER BY thu_tu_hien_thi;
--JOIN với danh mục
SELECT 
    dm.ten_danh_muc,
    ts.ten_thong_so
FROM loai_thong_so ts
JOIN danh_muc dm 
    ON ts.ma_danh_muc = dm.ma_danh_muc;
-- Không cho trùng thông số trong 1 danh mục
ALTER TABLE loai_thong_so
ADD CONSTRAINT unique_ts UNIQUE (ten_thong_so, ma_danh_muc);
-- Tạo index tăng tốc
CREATE INDEX idx_ts_danh_muc 
ON loai_thong_so(ma_danh_muc);

-- 13 THU CU DOI MOI 
CREATE TABLE thu_cu_doi_moi (
    ma_thu_cu SERIAL PRIMARY KEY,

    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung),

    ten_may_cu VARCHAR(255) NOT NULL,
    tinh_trang VARCHAR(255),

    gia_du_kien INT,

    ma_san_pham INT REFERENCES san_pham(ma_san_pham),

    gia_san_pham_moi INT NOT NULL,

    so_tien_can_tra INT GENERATED ALWAYS AS 
    (gia_san_pham_moi - COALESCE(gia_du_kien, 0)) STORED,

    trang_thai VARCHAR(50) DEFAULT 'cho_duyet',

    ngay_gui TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO thu_cu_doi_moi
(ma_nguoi_dung, ten_may_cu, tinh_trang, gia_du_kien, ma_san_pham, gia_san_pham_moi, trang_thai)
VALUES

-- đổi iPhone cũ lên iPhone mới
(11, 'iPhone 11 64GB', 'Màn trầy nhẹ, pin 80%', 5000000, 1, 19000000,'cho_duyet'),

-- Samsung đổi máy
(12, 'Samsung S20', 'Ngoại hình đẹp, pin tốt', 4000000, 3, 18000000,'da_duyet'),

-- máy cũ bị từ chối
(13, 'Xiaomi Mi 9', 'Vỡ màn hình, pin yếu', 1000000, 1, 19000000,'tu_choi');

-- 14 THONG SO CHI TIET
CREATE TABLE thong_so_chi_tiet (
    ma_ts SERIAL PRIMARY KEY,
    ma_san_pham INT REFERENCES san_pham(ma_san_pham),
    ma_loai_ts INT REFERENCES loai_thong_so(ma_loai_ts),
    gia_tri VARCHAR(255)
);

INSERT INTO thong_so_chi_tiet (ma_san_pham, ma_loai_ts, gia_tri) VALUES
-- iPhone 15
(1,1,'6.7 inch OLED'),
(1,2,'48MP'),
(1,3,'4422 mAh'),
(1,4,'Apple A17 Pro'),
(1,5,'8GB'),
(1,6,'256GB'),
(1,7,'iOS 17'),
(1,8,'159.9 x 76.7 mm'),
(1,9,'221g'),
(1,10,'Khung titan'),

-- Samsung S24
(3,1,'6.2 inch AMOLED'),
(3,2,'50MP'),
(3,3,'4000 mAh'),
(3,4,'Snapdragon 8 Gen 3'),
(3,5,'8GB'),
(3,6,'256GB'),
(3,7,'Android 14'),
(3,8,'147 x 70 mm'),
(3,9,'168g'),
(3,10,'Nhôm'),

-- Xiaomi 13T
(5,1,'6.67 inch AMOLED'),
(5,2,'50MP'),
(5,3,'5000 mAh'),
(5,4,'Dimensity 8200'),
(5,5,'12GB'),
(5,6,'256GB'),
(5,7,'Android 13'),
(5,8,'162 x 75 mm'),
(5,9,'193g'),
(5,10,'Kính'),

-- Macbook M2
(7,1,'13.6 inch Retina'),
(7,4,'Apple M2'),
(7,5,'8GB'),
(7,6,'256GB SSD'),
(7,7,'macOS'),
(7,9,'1.24kg');

-- Không cho trùng 1 loại thông số trong cùng sản phẩm
ALTER TABLE thong_so_chi_tiet
ADD CONSTRAINT unique_ts_sp UNIQUE (ma_san_pham, ma_loai_ts);

-- Xem thông số của 1 sản phẩm
SELECT 
    lts.ten_thong_so,
    ts.gia_tri
FROM thong_so_chi_tiet ts
JOIN loai_thong_so lts 
    ON ts.ma_loai_ts = lts.ma_loai_ts
WHERE ts.ma_san_pham = 1
ORDER BY lts.thu_tu_hien_thi;

-- JOIN FULL (giống trang chi tiết sản phẩm)
SELECT 
    sp.ten_san_pham,
    lts.ten_thong_so,
    ts.gia_tri
FROM thong_so_chi_tiet ts
JOIN san_pham sp ON ts.ma_san_pham = sp.ma_san_pham
JOIN loai_thong_so lts ON ts.ma_loai_ts = lts.ma_loai_ts
ORDER BY sp.ma_san_pham, lts.thu_tu_hien_thi;

-- 15 THANH TOÁN
-- CREATE TABLE thanh_toan (
--     ma_thanh_toan SERIAL PRIMARY KEY,

--     ma_don_hang INT NOT NULL
--         REFERENCES don_hang(ma_don_hang)
--         ON DELETE CASCADE,

--     phuong_thuc VARCHAR(50) NOT NULL
--         CHECK (phuong_thuc IN ('COD', 'VNPAY', 'MOMO')),

--     trang_thai VARCHAR(50) NOT NULL
--         CHECK (trang_thai IN ('cho_xu_ly', 'thanh_cong', 'that_bai')),

--     ma_giao_dich VARCHAR(150) DEFAULT 
--         ('GD' || FLOOR(RANDOM()*1000000000)::TEXT),

--     so_tien INT NOT NULL,

--     ngay_thanh_toan TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- -- Mỗi đơn chỉ có 1 thanh toán
-- ALTER TABLE thanh_toan
-- ADD CONSTRAINT unique_don_hang UNIQUE (ma_don_hang);

-- 15 THANH TOÁN
CREATE TABLE thanh_toan (
    ma_thanh_toan SERIAL PRIMARY KEY,

    ma_don_hang INT NOT NULL
        REFERENCES don_hang(ma_don_hang)
        ON DELETE CASCADE,

    phuong_thuc VARCHAR(50) NOT NULL
        CHECK (phuong_thuc IN ('COD', 'VNPAY', 'MOMO', 'ZALOPAY')),

    trang_thai VARCHAR(50) NOT NULL
        CHECK (trang_thai IN ('cho_xu_ly', 'thanh_cong', 'that_bai')),

    ma_giao_dich VARCHAR(150) DEFAULT 
        ('GD' || FLOOR(RANDOM()*1000000000)::TEXT),

    vnp_response_code VARCHAR(10),

    so_tien INT NOT NULL,

    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    ngay_thanh_toan TIMESTAMP DEFAULT NULL
);
-- Mỗi đơn chỉ có 1 thanh toán
ALTER TABLE thanh_toan
ADD CONSTRAINT unique_don_hang UNIQUE (ma_don_hang);

-- VAN CHUYEN 
CREATE TABLE van_chuyen (
    ma_van_chuyen SERIAL PRIMARY KEY,
    ma_don_hang INT REFERENCES don_hang(ma_don_hang),
    don_vi_van_chuyen VARCHAR(100),
    trang_thai VARCHAR(50),
    ngay_gui TIMESTAMP,
    ngay_giao TIMESTAMP
);
INSERT INTO van_chuyen (ma_don_hang, don_vi_van_chuyen, trang_thai, ngay_gui, ngay_giao)
VALUES
(1, 'GHN', 'dang_giao', NOW(), NULL),
(2, 'GHTK', 'da_giao', NOW() - INTERVAL '3 days', NOW());

-- Giới hạn trạng thái cho đúng dữ liệu
ALTER TABLE van_chuyen
ADD CONSTRAINT check_trang_thai_vc 
CHECK (trang_thai IN ('dang_giao', 'da_giao'));

-- LICH SU KHO
CREATE TABLE kho (
    ma_kho SERIAL PRIMARY KEY,
    ma_san_pham INT REFERENCES san_pham(ma_san_pham),
    so_luong_thay_doi INT NOT NULL,
    loai VARCHAR(50),
    thoi_gian TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ma_don_hang INT REFERENCES don_hang(ma_don_hang)
);
INSERT INTO kho (ma_san_pham, so_luong_thay_doi, loai, ma_don_hang)
VALUES
(1, 50, 'nhap_kho', NULL),
(1, -2, 'ban_ra', 1),
(3, 30, 'nhap_kho', NULL),
(3, -1, 'ban_ra', 2);

-- VOUCHER
CREATE TABLE voucher (
    ma_voucher SERIAL PRIMARY KEY,
    ma_code VARCHAR(50) UNIQUE NOT NULL,
    ten_voucher VARCHAR(150) NOT NULL,
    phan_tram_giam INT,
    giam_toi_da INT,
    don_hang_toi_thieu INT,
    so_luong INT NOT NULL,
    da_su_dung INT DEFAULT 0,
    ngay_bat_dau TIMESTAMP NOT NULL,
    ngay_ket_thuc TIMESTAMP NOT NULL,
    trang_thai INT DEFAULT 1
);
INSERT INTO voucher 
(ma_code, ten_voucher, phan_tram_giam, giam_toi_da, don_hang_toi_thieu, so_luong, ngay_bat_dau, ngay_ket_thuc)
VALUES
('SALE10', 'Giảm 10% toàn shop', 10, 500000, 1000000, 100, NOW(), NOW() + INTERVAL '30 days'),
('NEW50K', 'Giảm 50K cho khách mới', NULL, 50000, 300000, 50, NOW(), NOW() + INTERVAL '15 days');

-- SU DUNG VOUCHER 
CREATE TABLE su_dung_voucher (
    ma_su_dung SERIAL PRIMARY KEY,
    ma_voucher INT REFERENCES voucher(ma_voucher),
    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung),
    ma_don_hang INT REFERENCES don_hang(ma_don_hang),
    so_tien_giam INT NOT NULL,
    ngay_su_dung TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 1 voucher chỉ dùng 1 lần
    UNIQUE (ma_voucher),

    -- 1 đơn hàng chỉ dùng 1 voucher
    UNIQUE (ma_don_hang)
);
INSERT INTO su_dung_voucher (ma_voucher, ma_nguoi_dung, ma_don_hang, so_tien_giam)
VALUES
(1, 1, 1, 100000),
(2, 2, 2, 50000);

-- 1 user chỉ dùng voucher 1 lần
ALTER TABLE su_dung_voucher
ADD UNIQUE (ma_voucher, ma_nguoi_dung);

-- TRA GOP
CREATE TABLE tra_gop (
    ma_tra_gop SERIAL PRIMARY KEY,
    ma_don_hang INT REFERENCES don_hang(ma_don_hang),
    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung),
    so_tien_san_pham INT NOT NULL,
    tien_tra_truoc INT NOT NULL,
    so_tien_vay INT NOT NULL,
    so_thang INT NOT NULL,
    lai_suat FLOAT,
    tien_moi_thang INT,
    cong_ty_tai_chinh VARCHAR(100),
    trang_thai VARCHAR(50),
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tra_gop 
(ma_don_hang, ma_nguoi_dung, so_tien_san_pham, tien_tra_truoc, so_tien_vay, so_thang, lai_suat, tien_moi_thang, cong_ty_tai_chinh, trang_thai)
VALUES
(1, 1, 20000000, 5000000, 15000000, 12, 1.5, 1300000, 'HomeCredit', 'da_duyet');

-- LICH SU TRA GOP
CREATE TABLE lich_su_tra_gop (
    ma_lich_su SERIAL PRIMARY KEY,
    ma_tra_gop INT REFERENCES tra_gop(ma_tra_gop),
    ky_thanh_toan INT,
    so_tien INT NOT NULL,
    ngay_thanh_toan TIMESTAMP,
    trang_thai VARCHAR(50),
    ngay_den_han TIMESTAMP
);
INSERT INTO lich_su_tra_gop 
(ma_tra_gop, ky_thanh_toan, so_tien, trang_thai, ngay_den_han)
VALUES
(1, 1, 1300000, 'da_tra', NOW()),
(1, 2, 1300000, 'chua_tra', NOW() + INTERVAL '30 days');

-- Giới hạn trạng thái
ALTER TABLE tra_gop
ADD CHECK (trang_thai IN ('cho_duyet', 'da_duyet'));

ALTER TABLE lich_su_tra_gop
ADD CHECK (trang_thai IN ('da_tra', 'chua_tra'));


-- Thông tin giao hàng
CREATE TABLE thong_tin_giao_hang (
    ma_giao_hang SERIAL PRIMARY KEY,
    ma_don_hang INT NOT NULL 
        REFERENCES don_hang(ma_don_hang) 
        ON DELETE CASCADE,        
    ten_nguoi_nhan VARCHAR(150) NOT NULL,
    so_dien_thoai VARCHAR(20) NOT NULL,
    dia_chi_giao_hang TEXT NOT NULL,
    ghi_chu TEXT
);

-- Kích hoạt extension hỗ trợ AI vector
CREATE EXTENSION IF NOT EXISTS vector;

-- Thêm cột embedding để lưu 768 con số từ Gemini
ALTER TABLE san_pham ADD COLUMN IF NOT EXISTS embedding vector(768);