-- RESET
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- ENUM
CREATE TYPE trang_thai_don_hang AS ENUM (
    'cho_xac_nhan',
    'da_xac_nhan',
    'dang_giao',
    'da_giao',
    'da_huy'
);
--1 VAI TRÃ’
CREATE TABLE IF NOT EXISTS vai_tro(
    ma_vai_tro SERIAL PRIMARY KEY,
    ten_vai_tro VARCHAR(50) UNIQUE NOT NULL,
    ten_hien_thi VARCHAR(100) NOT NULL,
    mo_ta TEXT
);

INSERT INTO vai_tro (ten_vai_tro, ten_hien_thi, mo_ta) VALUES 
('ADMIN', 'Ká»¹ thuáº­t viÃªn', 'Quáº£n trá»‹ há»‡ thá»‘ng vÃ  ká»¹ thuáº­t'),
('GIAM_DOC', 'GiÃ¡m Ä‘á»‘c', 'ToÃ n quyá»n quáº£n lÃ½ há»‡ thá»‘ng'),
('QL_SAN_PHAM', 'Quáº£n lÃ½ Sáº£n pháº©m', 'ChuyÃªn trÃ¡ch danh má»¥c vÃ  hÃ ng hÃ³a'),
('QL_CUA_HANG', 'Quáº£n lÃ½ Cá»­a hÃ ng', 'Quáº£n lÃ½ váº­n hÃ nh chi nhÃ¡nh'),
('NV_CSKH', 'NhÃ¢n viÃªn CSKH', 'Há»— trá»£ vÃ  chÄƒm sÃ³c khÃ¡ch hÃ ng'),
('NV_BAN_HANG', 'NhÃ¢n viÃªn BÃ¡n hÃ ng', 'Thá»±c hiá»‡n giao dá»‹ch bÃ¡n hÃ ng'),
('NV_KHO', 'NhÃ¢n viÃªn Kho', 'Quáº£n lÃ½ nháº­p xuáº¥t tá»“n kho'),
('KHACH_HANG', 'KhÃ¡ch hÃ ng', 'NgÆ°á»i dÃ¹ng Ä‘Ã£ Ä‘Äƒng kÃ½ tÃ i khoáº£n');


--2 NGÆ¯á»œI DÃ™NG
CREATE TABLE IF NOT EXISTS nguoi_dung (
    ma_nguoi_dung SERIAL PRIMARY KEY,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NULL,
    google_id VARCHAR(255) UNIQUE NULL,
    kieu_dang_nhap VARCHAR(20) DEFAULT 'local',
    so_dien_thoai VARCHAR(20) NULL,
    dia_chi TEXT NULL,
    ma_vai_tro INT REFERENCES vai_tro(ma_vai_tro) DEFAULT 8, -- Máº·c Ä‘á»‹nh lÃ  vai trÃ² KhÃ¡ch hÃ ng
    trang_thai BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT NOW()
);
INSERT INTO nguoi_dung 
(ho_ten, email, mat_khau, google_id, kieu_dang_nhap, so_dien_thoai, dia_chi, ma_vai_tro, trang_thai)
VALUES

--  ADMIN
('Nguyá»…n VÄƒn Admin', 'admin@shop.vn', 'hashed_admin', NULL, 'local', '0909000001', 'TP.HCM', 1, TRUE),

--  GIÃM Äá»C
('Tráº§n Quá»‘c Báº£o', 'giamdoc@shop.vn', 'hashed_gd', NULL, 'local', '0909000002', 'HÃ  Ná»™i', 2, TRUE),

-- QUáº¢N LÃ Sáº¢N PHáº¨M
('LÃª Minh Tuáº¥n', 'qlsp@shop.vn', 'hashed_qlsp', NULL, 'local', '0909000003', 'TP.HCM', 3, TRUE),

-- QUáº¢N LÃ Cá»¬A HÃ€NG
('Pháº¡m Thá»‹ Lan', 'qlcuahang@shop.vn', 'hashed_store', NULL, 'local', '0909000004', 'ÄÃ  Náºµng', 4, TRUE),

--  NHÃ‚N VIÃŠN CSKH
('Nguyá»…n Thá»‹ Há»“ng', 'cskh1@shop.vn', 'hashed_cskh1', NULL, 'local', '0909000005', 'TP.HCM', 5, TRUE),
('Äá»— VÄƒn Nam', 'cskh2@shop.vn', 'hashed_cskh2', NULL, 'local', '0909000006', 'HÃ  Ná»™i', 5, TRUE),

-- NHÃ‚N VIÃŠN BÃN HÃ€NG
('Tráº§n VÄƒn HÃ¹ng', 'sale1@shop.vn', 'hashed_sale1', NULL, 'local', '0909000007', 'TP.HCM', 6, TRUE),
('LÃª Thá»‹ Mai', 'sale2@shop.vn', 'hashed_sale2', NULL, 'local', '0909000008', 'Cáº§n ThÆ¡', 6, TRUE),
('Nguyá»…n VÄƒn Nam', 'sale3@shop.vn', 'hashed_sale3', NULL, 'local', '0911111111', 'TP.HCM', 6, TRUE),
('Tráº§n Thá»‹ Hoa', 'sale4@shop.vn', 'hashed_sale4', NULL, 'local', '0912222222', 'HÃ  Ná»™i', 6, TRUE),
--  NHÃ‚N VIÃŠN KHO
('Phan Quá»‘c KhÃ¡nh', 'kho1@shop.vn', 'hashed_kho1', NULL, 'local', '0909000009', 'BÃ¬nh DÆ°Æ¡ng', 7, TRUE),
('Nguyá»…n VÄƒn TÃ i', 'kho2@shop.vn', 'hashed_kho2', NULL, 'local', '0909000010', 'Long An', 7, TRUE),

-- KHÃCH HÃ€NG (local)
('HoÃ ng Gia Huy', 'huy@gmail.com', 'hashed_user1', NULL, 'local', '0912345678', 'TP.HCM', 8, TRUE),
('Nguyá»…n ThÃ¹y Linh', 'linh@gmail.com', 'hashed_user2', NULL, 'local', '0987654321', 'HÃ  Ná»™i', 8, TRUE),
('Nguyá»…n VÄƒn KhÃ¡nh', 'khanh12@gmail.com', 'hashed_userd', NULL, 'local', '0915555555', 'TP.HCM', 8, TRUE),
('Tráº§n VÄƒn Kha', 'kha45@gmail.com', 'hashed_usere', NULL, 'local', '0916666666', 'HÃ  Ná»™i', 8, TRUE),
('LÃª Thá»‹ Hoa', 'thihoa34@gmail.com', 'hashed_userf', NULL, 'local', NULL, 'ÄÃ  Náºµng', 8, TRUE),

--  KHÃCH HÃ€NG (Google login)
('Pháº¡m Minh Anh', 'minhanh@gmail.com', NULL, 'google_abc123', 'google', '0933333333', 'ÄÃ  Náºµng', 8, TRUE),
('Tráº§n Quá»‘c Äáº¡t', 'dat@gmail.com', NULL, 'google_xyz456', 'google', NULL, 'TP.HCM', 8, TRUE),

--  USER Bá»Š KHÃ“A
('User Bá»‹ KhÃ³a', 'locked@shop.vn', 'hashed_locked', NULL, 'local', '0900000000', 'Háº£i PhÃ²ng', 8, FALSE);


--3 Äá»ŠA CHá»ˆ
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
(1, 'Nguyá»…n VÄƒn Admin', '0909000001', '12 Nguyá»…n Huá»‡', 'TP.HCM', 'Quáº­n 1', 'Báº¿n NghÃ©', TRUE),

-- GIÃM Äá»C
(2, 'Tráº§n Quá»‘c Báº£o', '0909000002', '88 Tráº§n Duy HÆ°ng', 'HÃ  Ná»™i', 'Cáº§u Giáº¥y', 'Trung HÃ²a', TRUE),

-- QL Sáº¢N PHáº¨M
(3, 'LÃª Minh Tuáº¥n', '0909000003', '45 LÃ½ ThÆ°á»ng Kiá»‡t', 'TP.HCM', 'Quáº­n 10', 'PhÆ°á»ng 14', TRUE),

-- QL Cá»¬A HÃ€NG
(4, 'Pháº¡m Thá»‹ Lan', '0909000004', '22 Nguyá»…n VÄƒn Linh', 'ÄÃ  Náºµng', 'Háº£i ChÃ¢u', 'Tháº¡ch Thang', TRUE),

-- CSKH
(5, 'Nguyá»…n Thá»‹ Há»“ng', '0909000005', '10 Cá»™ng HÃ²a', 'TP.HCM', 'TÃ¢n BÃ¬nh', 'PhÆ°á»ng 4', TRUE),
(6, 'Äá»— VÄƒn Nam', '0909000006', '55 Giáº£i PhÃ³ng', 'HÃ  Ná»™i', 'HoÃ ng Mai', 'GiÃ¡p BÃ¡t', TRUE),

-- SALE
(7, 'Tráº§n VÄƒn HÃ¹ng', '0909000007', '99 VÃµ VÄƒn Kiá»‡t', 'TP.HCM', 'Quáº­n 5', 'PhÆ°á»ng 7', TRUE),
(8, 'LÃª Thá»‹ Mai', '0909000008', '33 30/4', 'Cáº§n ThÆ¡', 'Ninh Kiá»u', 'An PhÃº', TRUE),

-- KHO
(9, 'Phan Quá»‘c KhÃ¡nh', '0909000009', 'KCN VSIP', 'BÃ¬nh DÆ°Æ¡ng', 'Thuáº­n An', 'An PhÃº', TRUE),
(10, 'Nguyá»…n VÄƒn TÃ i', '0909000010', 'áº¤p 3, Báº¿n Lá»©c', 'Long An', 'Báº¿n Lá»©c', 'Má»¹ YÃªn', TRUE),

-- KHÃCH HÃ€NG
(11, 'HoÃ ng Gia Huy', '0912345678', '123 Nguyá»…n TrÃ£i', 'TP.HCM', 'Quáº­n 1', 'Báº¿n ThÃ nh', TRUE),
(11, 'HoÃ ng Gia Huy', '0912345678', '45 LÃª VÄƒn Sá»¹', 'TP.HCM', 'Quáº­n 3', 'PhÆ°á»ng 12', FALSE),
(12, 'Nguyá»…n ThÃ¹y Linh', '0987654321', '56 Tráº§n Duy HÆ°ng', 'HÃ  Ná»™i', 'Cáº§u Giáº¥y', 'Trung HÃ²a', TRUE),
(12, 'Nguyá»…n ThÃ¹y Linh', '0987654321', 'Chung cÆ° Má»¹ ÄÃ¬nh', 'HÃ  Ná»™i', 'Nam Tá»« LiÃªm', 'Má»¹ ÄÃ¬nh 1', FALSE),
(13, 'Pháº¡m Minh Anh', '0933333333', '78 Nguyá»…n VÄƒn Linh', 'ÄÃ  Náºµng', 'Háº£i ChÃ¢u', 'Tháº¡ch Thang', TRUE),
(14, 'Tráº§n Quá»‘c Äáº¡t', '0933333333', '200 Äiá»‡n BiÃªn Phá»§', 'TP.HCM', 'BÃ¬nh Tháº¡nh', 'PhÆ°á»ng 25', TRUE),

-- USER Bá»Š KHÃ“A
(15, 'User Bá»‹ KhÃ³a', '0900000000', '99 Láº¡ch Tray', 'Háº£i PhÃ²ng', 'NgÃ´ Quyá»n', 'Äáº±ng Giang', TRUE);

SELECT * FROM dia_chi;
-- Äáº£m báº£o má»—i user chá»‰ cÃ³ 1 Ä‘á»‹a chá»‰ máº·c Ä‘á»‹nh;
CREATE UNIQUE INDEX unique_default_address
ON dia_chi(ma_nguoi_dung)
WHERE mac_dinh = TRUE;

-- 4 DANH Má»¤C
CREATE TABLE danh_muc (
    ma_danh_muc SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(100) NOT NULL,
    slug VARCHAR(150) UNIQUE,
    mo_ta TEXT,
    trang_thai SMALLINT DEFAULT 1 CHECK (trang_thai IN (0,1))
);
INSERT INTO danh_muc (ten_danh_muc, slug, mo_ta, trang_thai)
VALUES
('Äiá»‡n thoáº¡i', 'dien-thoai', 'CÃ¡c dÃ²ng smartphone má»›i nháº¥t', 1),
('Laptop', 'laptop', 'Laptop há»c táº­p, lÃ m viá»‡c, gaming', 1),
('Phá»¥ kiá»‡n', 'phu-kien', 'Tai nghe, sáº¡c, cÃ¡p, á»‘p lÆ°ng...', 1),
('MÃ¡y tÃ­nh báº£ng', 'may-tinh-bang', 'iPad, Tablet Android', 1),
('Ã‚m thanh', 'am-thanh', 'Loa bluetooth, tai nghe cao cáº¥p', 1);
-- ThÃªm index cho slug (tÄƒng tá»‘c SEO);
CREATE INDEX idx_slug ON danh_muc(slug);

-- 5 HÃƒNG
CREATE TABLE hang (
    ma_hang SERIAL PRIMARY KEY,
    ten_hang VARCHAR(100) NOT NULL,
    logo VARCHAR(255),
    mo_ta TEXT
);

INSERT INTO hang (ten_hang, logo, mo_ta)
VALUES
('Apple', 'apple.png', 'ThÆ°Æ¡ng hiá»‡u cÃ´ng nghá»‡ cao cáº¥p tá»« Má»¹'),
('Samsung', 'samsung.png', 'Táº­p Ä‘oÃ n Ä‘iá»‡n tá»­ lá»›n cá»§a HÃ n Quá»‘c'),
('Xiaomi', 'xiaomi.png', 'HÃ£ng Ä‘iá»‡n thoáº¡i giÃ¡ tá»‘t, cáº¥u hÃ¬nh cao'),
('Oppo', 'oppo.png', 'Ná»•i báº­t vá»›i camera vÃ  thiáº¿t káº¿ Ä‘áº¹p'),
('Vivo', 'vivo.png', 'Äiá»‡n thoáº¡i tráº» trung, giÃ¡ há»£p lÃ½'),
('Dell', 'dell.png', 'Laptop doanh nhÃ¢n, bá»n bá»‰'),
('HP', 'hp.png', 'Laptop vÄƒn phÃ²ng phá»• biáº¿n'),
('Asus', 'asus.png', 'Laptop gaming vÃ  linh kiá»‡n mÃ¡y tÃ­nh'),
('Lenovo', 'lenovo.png', 'Laptop Ä‘a dáº¡ng phÃ¢n khÃºc'),
('Sony', 'sony.png', 'Thiáº¿t bá»‹ Ä‘iá»‡n tá»­ vÃ  Ã¢m thanh cao cáº¥p');

--TrÃ¡nh trÃ¹ng tÃªn hÃ£ng
ALTER TABLE hang
ADD CONSTRAINT unique_ten_hang UNIQUE (ten_hang);
-- 6 Sáº¢N PHáº¨M
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

('iPhone 16 128GB',1,1,20000000,22000000,10,50,500,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776412967/products/iphone16_128GB_1776412965267.jpg','Chip A17, báº£n tiÃªu chuáº©n',2024),
('iPhone 16 256GB',1,1,21000000,23000000,9,45,450,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776414799/products/iphone16_256GB_1776414797732.jpg','Báº£n 256GB',2024),
('iPhone 16 512GB',1,1,23000000,25000000,8,40,400,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776416395/products/iphone16_512GB_1776416393534.jpg','Dung lÆ°á»£ng cao',2024),
('iPhone 16 Plus 128GB',1,1,23000000,25000000,8,35,420,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1776416583/products/iphone16plus_1776416581399.jpg','MÃ n lá»›n 6.7 inch',2024),
('iPhone 16 Plus 256GB',1,1,24000000,26000000,8,30,390,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778496931/iPhone_16_Plus_256GB_ovpfg6.webp','Plus 256GB',2024),
('iPhone 16 Plus 512GB',1,1,26000000,28000000,7,25,350,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778499939/iPhone_16_Plus_512GB_rgjgsl.webp','Plus cao cáº¥p',2024),
('iPhone 16 Pro 128GB',1,1,26000000,28000000,8,30,600,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778499939/iPhone_16_Plus_512GB_rgjgsl.webp','Chip A17 Pro',2024),
('iPhone 16 Pro 256GB',1,1,28000000,30000000,7,25,550,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778500756/iPhone_16_Pro_256GB_adubul.webp','Pro 256GB',2024),
('iPhone 16 Pro 512GB',1,1,30000000,32000000,7,20,500,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778500756/iPhone_16_Pro_GB_eilsb7.webp','Pro cao cáº¥p',2024),
('iPhone 16 Pro Max 128GB',1,1,30000000,32000000,7,20,700,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778500926/iPhone_16_Pro_Max_128GB_umyjlk.jpg','Pin lá»›n',2024),
('iPhone 16 Pro Max 256GB',1,1,32000000,34000000,6,18,650,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778500926/iPhone_16_Pro_Max_128GB_umyjlk.jpg','Pro Max 256GB',2024),
('iPhone 16 Pro Max 512GB',1,1,35000000,37000000,6,15,600,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778500926/iPhone_16_Pro_Max_128GB_umyjlk.jpg','Cao cáº¥p nháº¥t',2024),
('iPhone 15 128GB',1,1,18000000,20000000,10,60,800,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502267/iPhone_15_128GB_ptyqih.webp','Chip A16',2023),
('iPhone 15 256GB',1,1,20000000,22000000,9,50,750,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502267/iPhone_15_128GB_ptyqih.webp','Báº£n 256GB',2023),
('iPhone 15 512GB',1,1,23000000,25000000,8,40,500,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502267/iPhone_15_128GB_ptyqih.webp','iPhone 15 dung lÆ°á»£ng cao',2023),
('iPhone 15 Plus 128GB',1,1,22000000,24000000,8,45,450,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502905/iPhone_15_Plus_128GB_dqjfpe.webp','MÃ n lá»›n 6.7 inch',2023),
('iPhone 15 Plus 256GB',1,1,24000000,26000000,8,40,420,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502905/iPhone_15_Plus_128GB_dqjfpe.webp','Plus 256GB',2023),
('iPhone 15 Plus 512GB',1,1,26000000,28000000,7,35,400,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502905/iPhone_15_Plus_128GB_dqjfpe.webp','Plus cao cáº¥p',2023),
('iPhone 15 Pro 128GB',1,1,27000000,29000000,7,30,600,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502904/iPhone_15_Pro_128GB_zrlbi9.webp','Chip A16 máº¡nh',2023),
('iPhone 15 Pro 256GB',1,1,29000000,31000000,7,25,550,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502904/iPhone_15_Pro_128GB_zrlbi9.webp','Pro 256GB',2023),
('iPhone 15 Pro 512GB',1,1,31000000,33000000,6,20,500,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778502904/iPhone_15_Pro_128GB_zrlbi9.webp','Pro cao cáº¥p',2023),
('iPhone 15 Pro Max 128GB',1,1,30000000,32000000,7,20,700,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503302/iPhone_15_Pro_Max_128GB_duinmd.webp','Pin lá»›n',2023),
('iPhone 15 Pro Max 256GB',1,1,32000000,34000000,6,18,650,5.0,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503302/iPhone_15_Pro_Max_128GB_duinmd.webp','Pro Max 256GB',2023),
('iPhone 15 Pro Max 512GB',1,1,35000000,37000000,6,15,600,5.0,'ihttps://res.cloudinary.com/dmr9jblyy/image/upload/v1778503302/iPhone_15_Pro_Max_128GB_duinmd.webp','Cao cáº¥p nháº¥t',2023),
('iPhone 14 128GB',1,1,18000000,20000000,10,60,800,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503376/iPhone_14_128GB_fwoto6.webp','iPhone 14',2022),
('iPhone 14 256GB',1,1,20000000,22000000,9,55,750,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503376/iPhone_14_128GB_fwoto6.webp','iPhone 14 256GB',2022),
('iPhone 14 512GB',1,1,22000000,24000000,8,50,700,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503376/iPhone_14_128GB_fwoto6.webp','Dung lÆ°á»£ng cao',2022),
('iPhone 14 Plus 128GB',1,1,21000000,23000000,9,45,650,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503547/iPhone_14_Plus_128GB_cxxffl.webp','MÃ n lá»›n',2022),
('iPhone 14 Plus 256GB',1,1,23000000,25000000,8,40,600,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503547/iPhone_14_Plus_128GB_cxxffl.webp','Plus 256GB',2022),
('iPhone 14 Plus 512GB',1,1,25000000,27000000,8,35,550,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503547/iPhone_14_Plus_128GB_cxxffl.webp','Plus cao cáº¥p',2022),


-- Samsung
('Samsung Galaxy S24 Ultra 128GB',2,1,30000000,32000000,6,40,800,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503548/Samsung_Galaxy_S24_Ultra_128GB_d1f3sq.webp','Flagship 2024',2024),
('Samsung Galaxy S24 Ultra 256GB',2,1,32000000,34000000,6,35,750,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503548/Samsung_Galaxy_S24_Ultra_128GB_d1f3sq.webp','Ultra 256GB',2024),
('Samsung Galaxy S24+ 128GB',2,1,22000000,24000000,8,50,700,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503785/Samsung_Galaxy_S24_128GB_vbi0co.webp','S24 Plus',2024),
('Samsung Galaxy S24+ 256GB',2,1,24000000,26000000,8,45,650,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503785/Samsung_Galaxy_S24_128GB_vbi0co.webp','Plus 256GB',2024),
('Samsung Galaxy S24 128GB',2,1,20000000,22000000,9,60,800,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503832/Samsung_Galaxy_S24_128GB_rgcvmi.webp','S24',2024),
('Samsung Galaxy S24 256GB',2,1,22000000,24000000,8,55,750,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778503832/Samsung_Galaxy_S24_128GB_rgcvmi.webp','S24 256GB',2024),
('Samsung Galaxy S23 Ultra 128GB',2,1,28000000,30000000,7,40,700,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504302/Samsung_Galaxy_S23_Ultra_128GB_r4yckr.webp','Ultra',2023),
('Samsung Galaxy S23 Ultra 256GB',2,1,30000000,32000000,6,35,650,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504302/Samsung_Galaxy_S23_Ultra_128GB_r4yckr.webp','Ultra 256GB',2023),
('Samsung Galaxy S23+ 128GB',2,1,20000000,22000000,9,50,700,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504312/Samsung_Galaxy_S23_128GB_td1478.webp','Plus',2023),
('Samsung Galaxy S23+ 256GB',2,1,22000000,24000000,8,45,650,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504312/Samsung_Galaxy_S23_128GB_td1478.webp','Plus 256GB',2023),


-- Xiaomi 
('Xiaomi 15 Pro 256GB',3,1,20000000,22000000,9,30,400,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504843/Xiaomi_15_Pro_256GB_rr5ujb.webp','Snapdragon 8 Elite, pin 6100mAh',2024),
('Xiaomi 15 Pro 512GB',3,1,22500000,24500000,8,25,380,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778504843/Xiaomi_15_Pro_512GB_mljis2.webp','RAM 16GB, flagship',2024),
('Xiaomi 15 Pro 1TB',3,1,25000000,27000000,8,20,350,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778505211/Xiaomi_15_Pro_1TB_gz29zv.webp','Báº£n cao cáº¥p nháº¥t',2024),
('Xiaomi 15 256GB',3,1,17500000,19000000,8,35,360,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778505212/Xiaomi_15_256GB_p6w2nv.jpg','Flagship nhá» gá»n',2024),
('Xiaomi 15 512GB',3,1,20000000,22000000,9,30,340,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778505212/Xiaomi_15_256GB_p6w2nv.jpg','RAM 16GB',2024),
('Xiaomi 14T Pro 256GB',3,1,16000000,17500000,8,40,320,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507582/Xiaomi_14T_256GB_rbjtzc.webp','Dimensity 9300+',2024),
('Xiaomi 14T Pro 512GB',3,1,19800000,21500000,8,35,300,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507579/Xiaomi_14T_Pro_512GB_aottf0.jpg','Hiá»‡u .nÄƒng máº¡nh',2024),
('Xiaomi 14T Pro 1TB',3,1,22500000,24500000,8,30,280,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507579/Xiaomi_14T_Pro_1T_v0od1o.webp','Dung lÆ°á»£ng lá»›n',2024),
('Xiaomi 14T 256GB',3,1,15000000,16500000,9,45,310,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507582/Xiaomi_14T_256GB_rbjtzc.webp','Dimensity 8300 Ultra',2024),
('Xiaomi 14T 512GB',3,1,17500000,19000000,8,40,290,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507579/Xiaomi_14T_Pro_512GB_aottf0.jpg','Báº£n nÃ¢ng cáº¥p',2024),
('Xiaomi 14 Pro 256GB',3,1,20000000,22000000,9,30,330,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507579/Xiaomi_14T_Pro_512GB_aottf0.jpg','Snapdragon 8 Gen 3',2023),
('Xiaomi 14 Pro 512GB',3,1,22500000,24500000,8,25,300,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507579/Xiaomi_14T_Pro_512GB_aottf0.jpg','Hiá»‡u nÄƒng cao',2023),
('Redmi Note 14 Pro+ 5G 128GB',3,1,9400000,10500000,9,50,280,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508014/Redmi_Note_14_Pro_5G_128GB_wecqon.webp','Camera 200MP',2024),
('Redmi Note 14 Pro+ 5G 256GB',3,1,10000000,11000000,9,45,260,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778507627/Xiaomi_14T_Pro_256GB_rlku8v.webp','Snapdragon 7s Gen 3',2024),
('Redmi Note 14 Pro+ 5G 512GB',3,1,10800000,12000000,8,40,240,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508011/Redmi_Note_14_Pro_5G_256GB_zm4akj.webp','Báº£n cao cáº¥p',2024),


-- oppo
('Oppo Find N3 512GB',4,1,35000000,38000000,8,20,300,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508199/Oppo_Find_N3_512GB_r80wvn.webp','Äiá»‡n thoáº¡i gáº­p cao cáº¥p',2023),
('Oppo Find N3 Flip 256GB',4,1,25000000,27000000,8,25,280,4.8,' https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508203/Oppo_Find_N3_Flip_256GB_syhrpc.webp','Flip nhá» gá»n',2023),
('Oppo Find X8 Pro 256GB',4,1,32000000,35000000,9,20,260,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508206/Oppo_Find_X8_Pro_256GB_mddzrl.webp','Flagship máº¡nh',2024),
('Oppo Find X8 256GB',4,1,27500000,30000000,8,25,240,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508209/Oppo_Find_X8_256GB_clhvje.webp','Cao cáº¥p',2024),
('Oppo Find X7 Ultra 256GB',4,1,30000000,33000000,9,20,250,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508550/Oppo_Find_X7_Ultra_256GB_bgb4ay.webp','Camera Ä‘á»‰nh',2024),
('Oppo Find X7 Ultra 512GB',4,1,32500000,35000000,8,15,230,4.9,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508550/Oppo_Find_X7_Ultra_256GB_bgb4ay.webp','RAM 16GB',2024),
('Oppo Find X7 256GB',4,1,27500000,30000000,8,25,240,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508554/Oppo_Find_X7_256GB_da9til.webp','Dimensity 9300',2024),
('Oppo Find X7 512GB',4,1,30000000,33000000,9,20,220,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508554/Oppo_Find_X7_256GB_da9til.webp','Hiá»‡u nÄƒng máº¡nh',2024),
('Oppo Find X6 Pro 256GB',4,1,25000000,27000000,8,30,260,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778508556/Oppo_Find_X6_Pro_256GB_bqhket.webp','Flagship 2023',2023),
('Oppo Reno13 F 256GB',4,1,12500000,13500000,8,40,260,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511977/Oppo_Reno13_F_256GB_a5tqoa.webp','Pin 5800mAh',2025),
('Oppo Reno13 Pro 512GB',4,1,20000000,22000000,9,30,240,4.8,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511980/Oppo_Reno13_Pro_512GB_svkzbi.webp','Dimensity 8350',2025),
('Oppo Reno13 256GB',4,1,17500000,19000000,8,35,230,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511984/Oppo_Reno13_256GB_v831si.webp','Hiá»‡u nÄƒng tá»‘t',2025),
('Oppo Reno12 F 256GB',4,1,11200000,12500000,9,45,250,4.5,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511987/Oppo_Reno12_F_256GB_dgeqbg.webp','Snapdragon 685',2024),
('Oppo Reno12 Pro 512GB',4,1,18700000,20500000,8,30,230,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511994/Oppo_Reno12_Pro_512GB_vternz.webp','Dimensity 8200',2024),
('Oppo Reno12 256GB',4,1,15000000,16500000,9,40,220,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778511991/Oppo_Reno12_256GB_hyimyq.webp','á»”n Ä‘á»‹nh',2024),
('Oppo Reno11 F 256GB',4,1,12500000,13500000,8,50,240,4.5,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512308/Oppo_Reno11_F_256GB_ebratv.webp','GiÃ¡ tá»‘t',2024),
('Oppo Reno11 Pro 512GB',4,1,17500000,19000000,8,35,220,4.7,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512310/Oppo_Reno11_Pro_512GB_jp2mgu.webp','Camera Ä‘áº¹p',2024),
('Oppo A5 Pro 256GB',4,1,15000000,16500000,9,60,210,4.5,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512313/Oppo_A5_Pro_256GB_fiicba.webp','Pin 6000mAh',2024),
('Oppo A5 Pro 512GB',4,1,17500000,19000000,8,55,200,4.6,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512316/Oppo_A5_Pro_512GB_qwyya1.webp','RAM 12GB',2024),
('Oppo A80 256GB',4,1,12500000,13500000,8,60,210,4.4,'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512319/Oppo_A80_256GB_wgj6hj.webp','Dimensity 6300',2024),

-- Laptop

('MacBook Air M2', 1, 2, 28000000, 30000000, 7, 20, 500, 4.9, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512470/MacBook_Air_M2_xm8il4.webp', 'Laptop má»ng nháº¹ Apple', 2023),
('Dell XPS 13', 6, 2, 32000000, 35000000, 8, 15, 300, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778512473/Dell_XPS_13_u5qpig.webp', 'Laptop cao cáº¥p Dell', 2022),
('MacBook Air M3 13 inch', 1, 2, 27990000, 32990000, 15, 30, 1200, 4.9, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573796/MacBook_Air_M3_13_inch_f5dbvj.webp', 'Chip M3 cá»±c máº¡nh, má»ng nháº¹', 2024),
('MacBook Pro 14 M3 Pro', 1, 2, 49990000, 54990000, 9, 15, 800, 5.0, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573796/MacBook_Pro_14_M3_Pro_viymn5.webp', 'DÃ nh cho Ä‘á»“ há»a chuyÃªn nghiá»‡p', 2024),
('Dell XPS 13 9340', 6, 2, 45000000, 48000000, 6, 10, 450, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573801/Dell_XPS_13_9340_vwcmmf.webp', 'Thiáº¿t káº¿ khÃ´ng viá»n sang trá»ng', 2024),
('Dell Inspiron 15 3520', 6, 2, 13500000, 15000000, 10, 50, 2000, 4.3, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573804/Dell_Inspiron_15_3520_gz554l.webp', 'Laptop vÄƒn phÃ²ng giÃ¡ ráº»', 2023),
('HP Pavilion 15 eg3093TU', 7, 2, 16990000, 18500000, 8, 40, 600, 4.5, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573808/HP_Pavilion_15_eg3093TU_ftaeyk.webp', 'MÃ n hÃ¬nh IPS Ä‘áº¹p, vá» nhÃ´m', 2023),
('HP Victus 15 gaming', 7, 2, 19500000, 22000000, 11, 25, 900, 4.4, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778573811/HP_Victus_15_gaming_fnarc0.webp', 'Gaming giÃ¡ ráº» cho sinh viÃªn', 2023),
('Asus ROG Strix G16', 8, 2, 38990000, 42000000, 7, 12, 1500, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574376/Asus_ROG_Strix_G16_n1fneu.webp', 'Hiá»‡u nÄƒng gaming Ä‘á»‰nh cao', 2024),
('Asus Zenbook 14 OLED', 8, 2, 24500000, 26900000, 9, 20, 750, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574353/Asus_Zenbook_14_OLED_wj3ird.webp', 'MÃ n hÃ¬nh OLED 2.8K siÃªu nÃ©t', 2024),
('Lenovo Legion Slim 5', 9, 2, 32000000, 35000000, 8, 18, 1100, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574351/Lenovo_Legion_Slim_5_pkp8wo.webp', 'Laptop gaming má»ng nháº¹', 2023),
('Lenovo IdeaPad 3 Slim', 9, 2, 11000000, 13000000, 15, 60, 3000, 4.2, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574349/Lenovo_IdeaPad_3_Slim_mnmxsh.webp', 'Há»c táº­p online hiá»‡u quáº£', 2023),
('HP Spectre x360 14', 7, 2, 39990000, 43000000, 7, 8, 400, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574347/HP_Spectre_x360_14_ovfsao.webp', 'Kiá»‡t tÃ¡c thiáº¿t káº¿ cá»§a HP', 2024),
('Lenovo LOQ 15', 9, 2, 20500000, 23000000, 10, 25, 700, 4.5, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574344/Lenovo_LOQ_15_q5b4uj.webp', 'DÃ²ng gaming má»›i tá»« Lenovo', 2024),
('MacBook Pro 16 M3 Max', 1, 2, 89990000, 95000000, 5, 5, 350, 5.0, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574342/MacBook_Pro_16_M3_Max_bbrljr.webp', 'Äá»‰nh cao sá»©c máº¡nh Apple', 2024),

-- PHá»¤ KIá»†N 
('Sáº¡c nhanh Apple 20W', 1, 3, 490000, 600000, 18, 200, 5000, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574734/S%E1%BA%A1c_nhanh_Apple_20W_pcihkl.jpg', 'Sáº¡c zin cho iPhone', 2021),
('á»p lÆ°ng iPhone 16', 1, 3, 1200000, 1500000, 20, 100, 1500, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574731/%E1%BB%90p_l%C6%B0ng_MagSafe_iPhone_16_cjcvjz.webp', 'Há»— trá»£ sáº¡c khÃ´ng dÃ¢y', 2024),
('Chuá»™t Logitech G502 Hero', 10, 3, 990000, 1300000, 23, 150, 8000, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574727/Chu%E1%BB%99t_Logitech_G502_Hero_wlbfoq.webp', 'Chuá»™t quá»‘c dÃ¢n cho gamer', 2022),
('BÃ n phÃ­m cÆ¡ AKKO 3068', 10, 3, 1550000, 1800000, 14, 80, 2500, 4.6, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574725/B%C3%A0n_ph%C3%ADm_c%C6%A1_AKKO_3068_tz1v2o.webp', 'Switch gÃµ cá»±c sÆ°á»›ng', 2023),
('Tai nghe Earpods Lightning', 1, 3, 350000, 500000, 30, 300, 10000, 4.5, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574722/Tai_nghe_Earpods_Lightning_tqysyp.jpg', 'Tai nghe cÃ³ dÃ¢y truyá»n thá»‘ng', 2020),
('Sáº¡c dá»± phÃ²ng Xiaomi 20000mAh', 3, 3, 650000, 850000, 23, 120, 6000, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778574720/S%E1%BA%A1c_d%E1%BB%B1_ph%C3%B2ng_Xiaomi_20000mAh_wfq7bj.jpg', 'Sáº¡c nhanh 22.5W', 2023),
('CÃ¡p USB-C to Lightning 1m', 1, 3, 450000, 550000, 18, 500, 9000, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575121/C%C3%A1p_USB-C_to_Lightning_1m_lmkpud.webp', 'Bá»n bá»‰, chá»‘ng Ä‘á»©t', 2022),

-- MÃY TÃNH Báº¢NG (ma_danh_muc = 4)
('iPad Pro M4 11 inch 256GB', 1, 4, 28990000, 31990000, 9, 20, 1500, 4.9, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575123/iPad_Pro_M4_11_inch_256GB_xvh6em.webp', 'MÃ n hÃ¬nh OLED Ultra Retina', 2024),
('iPad Air M2 11 inch', 1, 4, 16490000, 18990000, 13, 35, 2500, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575125/iPad_Air_M2_11_inch_n9ocuh.webp', 'Máº¡nh máº½ vá»›i chip M2', 2024),
('iPad Gen 10 64GB', 1, 4, 8990000, 10990000, 18, 100, 7000, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575130/iPad_Gen_10_64GB_obdwwl.webp', 'Lá»±a chá»n tá»‘t nháº¥t cho sinh viÃªn', 2022),
('Samsung Galaxy Tab S9 Ultra', 2, 4, 24500000, 28000000, 12, 15, 800, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575134/Samsung_Galaxy_Tab_S9_Ultra_yfo2zh.jpg', 'Tablet Android máº¡nh nháº¥t', 2023),
('Samsung Galaxy Tab A9', 2, 4, 3490000, 4500000, 22, 150, 4000, 4.5, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575137/Samsung_Galaxy_Tab_A9_xj3uxp.jpg', 'MÃ¡y tÃ­nh báº£ng giÃ¡ ráº» cho tráº» em', 2023),
('Xiaomi Pad 6', 3, 4, 8500000, 9900000, 14, 50, 3000, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575376/Xiaomi_Pad_6_o1aiaf.jpg', 'MÃ n hÃ¬nh 144Hz siÃªu mÆ°á»£t', 2023),
('Redmi Pad SE', 3, 4, 4200000, 5500000, 23, 80, 2500, 4.4, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575373/Redmi_Pad_SE_fpzvxj.jpg', 'GiÃ¡ há»i cáº¥u hÃ¬nh á»•n', 2023),


-- Ã‚M THANH (ma_danh_muc = 5)
('AirPods Pro Gen 2 USB-C', 1, 5, 5490000, 6190000, 11, 100, 5000, 4.9, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575371/AirPods_Pro_Gen_2_USB-C_gbx4wz.jpg', 'Chá»‘ng á»“n Ä‘á»‰nh cao, sáº¡c Type-C', 2023),
('AirPods 3 Magsafe', 1, 5, 4200000, 4990000, 15, 120, 8000, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575367/AirPods_3_Magsafe_ligzqa.jpg', 'Ã‚m thanh khÃ´ng gian sá»‘ng Ä‘á»™ng', 2021),
('Sony WH-1000XM5', 10, 5, 7990000, 9490000, 15, 30, 2500, 4.9, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575363/Sony_WH-1000XM5_nf5qof.webp', 'Vua chá»‘ng á»“n tai nghe chá»¥p tai', 2022),
('Sony WF-1000XM5', 10, 5, 5990000, 6990000, 14, 45, 1800, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575352/Sony_WF-1000XM5_bsmliq.webp', 'Tai nghe in-ear cao cáº¥p', 2023),
('Loa Marshall Emberton 3', 10, 5, 3990000, 4500000, 11, 40, 3000, 4.8, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575569/Loa_Marshall_Emberton_3_vweyrt.webp', 'Thiáº¿t káº¿ vintage, Ã¢m thanh 360', 2022),
('Loa JBL Charge 5', 10, 5, 3450000, 3990000, 13, 60, 4500, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575567/Loa_JBL_Charge_5_u9ghzc.webp', 'KhÃ¡ng nÆ°á»›c, pin 20 giá»', 2021),
('Tai nghe Marshall Major IV', 10, 5, 3500000, 4200000, 16, 25, 1200, 4.7, 'https://res.cloudinary.com/dmr9jblyy/image/upload/v1778575564/Tai_nghe_Marshall_Major_IV_wgeeeq.webp', 'Pin siÃªu khá»§ng 80 giá»', 2022);

-- 7 HÃŒNH áº¢NH
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


 
-- 8 GIá»Ž HÃ€NG
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
--Má»—i user chá»‰ cÃ³ 1 giá» hÃ ng Ä‘ang mua
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

--Xem giá» hÃ ng chi tiáº¿t
SELECT 
    sp.ten_san_pham,
    ct.so_luong,
    ct.don_gia,
    (ct.so_luong * ct.don_gia) AS thanh_tien
FROM chi_tiet_gio_hang ct
JOIN san_pham sp 
    ON ct.ma_san_pham = sp.ma_san_pham
WHERE ct.ma_gio_hang = 1;
--Tá»•ng tiá»n giá» hÃ ng
SELECT 
    SUM(so_luong * don_gia) AS tong_tien
FROM chi_tiet_gio_hang
WHERE ma_gio_hang = 1;

-- 10 ÄÆ N HÃ€NG
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
            'da_giao',
            'da_huy'
        )),

    ngay_dat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO don_hang (ma_nguoi_dung, tong_tien, trang_thai)
VALUES
(11, 19000000, 'cho_xac_nhan'),
(12, 36000000, 'da_xac_nhan'),
(13, 28000000, 'dang_giao'),
(14, 9000000, 'da_giao'),
(15, 15000000, 'da_huy');

-- 11 CHI TIáº¾T ÄÆ N
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

-- ÄÆ¡n 1
(1, 1, 1, 19000000), -- iPhone
(1, 3, 1, 18000000), -- Samsung

-- ÄÆ¡n 2
(2, 5, 1, 28000000), -- MacBook

-- ÄÆ¡n 3
(3, 2, 2, 25000000),

-- ÄÆ¡n 4
(4, 4, 1, 9000000);
 --Xem chi tiáº¿t 1 Ä‘Æ¡n hÃ ng
SELECT 
    sp.ten_san_pham,
    ct.so_luong,
    ct.don_gia,
    (ct.so_luong * ct.don_gia) AS thanh_tien
FROM chi_tiet_don_hang ct
JOIN san_pham sp 
    ON ct.ma_san_pham = sp.ma_san_pham
WHERE ct.ma_don_hang = 1;
--TÃ­nh láº¡i tá»•ng tiá»n Ä‘Æ¡n hÃ ng
SELECT 
    ma_don_hang,
    SUM(so_luong * don_gia) AS tong_tien
FROM chi_tiet_don_hang
GROUP BY ma_don_hang;
--JOIN full (user + Ä‘Æ¡n + sáº£n pháº©m)
SELECT 
    nd.ho_ten,
    dh.ma_don_hang,
    sp.ten_san_pham,
    ct.so_luong
FROM chi_tiet_don_hang ct
JOIN don_hang dh ON ct.ma_don_hang = dh.ma_don_hang
JOIN nguoi_dung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
JOIN san_pham sp ON ct.ma_san_pham = sp.ma_san_pham;
--Táº¡o index tÄƒng tá»‘c
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

-- Äiá»‡n thoáº¡i
('MÃ n hÃ¬nh', 1, 1),
('Há»‡ Ä‘iá»u hÃ nh', 1, 2),
('Camera sau', 1, 3),
('Camera trÆ°á»›c', 1, 4),
('CPU', 1, 5),
('RAM', 1, 6),
('Bá»™ nhá»› trong', 1, 7),
('Pin', 1, 8),
('SIM', 1, 9),

--  Laptop
('CPU', 2, 1),
('RAM', 2, 2),
('á»” cá»©ng', 2, 3),
('Card Ä‘á»“ há»a', 2, 4),
('MÃ n hÃ¬nh', 2, 5),
('Pin', 2, 6),
('Trá»ng lÆ°á»£ng', 2, 7);

--Láº¥y thÃ´ng sá»‘ theo danh má»¥c
SELECT *
FROM loai_thong_so
WHERE ma_danh_muc = 1
ORDER BY thu_tu_hien_thi;
--JOIN vá»›i danh má»¥c
SELECT 
    dm.ten_danh_muc,
    ts.ten_thong_so
FROM loai_thong_so ts
JOIN danh_muc dm 
    ON ts.ma_danh_muc = dm.ma_danh_muc;
-- KhÃ´ng cho trÃ¹ng thÃ´ng sá»‘ trong 1 danh má»¥c
ALTER TABLE loai_thong_so
ADD CONSTRAINT unique_ts UNIQUE (ten_thong_so, ma_danh_muc);
-- Táº¡o index tÄƒng tá»‘c
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

-- Ä‘á»•i iPhone cÅ© lÃªn iPhone má»›i
(11, 'iPhone 11 64GB', 'MÃ n tráº§y nháº¹, pin 80%', 5000000, 1, 19000000,'cho_duyet'),

-- Samsung Ä‘á»•i mÃ¡y
(12, 'Samsung S20', 'Ngoáº¡i hÃ¬nh Ä‘áº¹p, pin tá»‘t', 4000000, 3, 18000000,'da_duyet'),

-- mÃ¡y cÅ© bá»‹ tá»« chá»‘i
(13, 'Xiaomi Mi 9', 'Vá»¡ mÃ n hÃ¬nh, pin yáº¿u', 1000000, 1, 19000000,'tu_choi');

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
(3,10,'NhÃ´m'),

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
(5,10,'KÃ­nh'),

-- Macbook M2
(7,1,'13.6 inch Retina'),
(7,4,'Apple M2'),
(7,5,'8GB'),
(7,6,'256GB SSD'),
(7,7,'macOS'),
(7,9,'1.24kg');

-- KhÃ´ng cho trÃ¹ng 1 loáº¡i thÃ´ng sá»‘ trong cÃ¹ng sáº£n pháº©m
ALTER TABLE thong_so_chi_tiet
ADD CONSTRAINT unique_ts_sp UNIQUE (ma_san_pham, ma_loai_ts);

-- Xem thÃ´ng sá»‘ cá»§a 1 sáº£n pháº©m
SELECT 
    lts.ten_thong_so,
    ts.gia_tri
FROM thong_so_chi_tiet ts
JOIN loai_thong_so lts 
    ON ts.ma_loai_ts = lts.ma_loai_ts
WHERE ts.ma_san_pham = 1
ORDER BY lts.thu_tu_hien_thi;

-- JOIN FULL (giá»‘ng trang chi tiáº¿t sáº£n pháº©m)
SELECT 
    sp.ten_san_pham,
    lts.ten_thong_so,
    ts.gia_tri
FROM thong_so_chi_tiet ts
JOIN san_pham sp ON ts.ma_san_pham = sp.ma_san_pham
JOIN loai_thong_so lts ON ts.ma_loai_ts = lts.ma_loai_ts
ORDER BY sp.ma_san_pham, lts.thu_tu_hien_thi;

-- 15 THANH TOÃN
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
-- -- Má»—i Ä‘Æ¡n chá»‰ cÃ³ 1 thanh toÃ¡n
-- ALTER TABLE thanh_toan
-- ADD CONSTRAINT unique_don_hang UNIQUE (ma_don_hang);

-- 15 THANH TOÃN
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
-- Má»—i Ä‘Æ¡n chá»‰ cÃ³ 1 thanh toÃ¡n
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

-- Giá»›i háº¡n tráº¡ng thÃ¡i cho Ä‘Ãºng dá»¯ liá»‡u
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
('SALE10', 'Giáº£m 10% toÃ n shop', 10, 500000, 1000000, 100, NOW(), NOW() + INTERVAL '30 days'),
('NEW50K', 'Giáº£m 50K cho khÃ¡ch má»›i', NULL, 50000, 300000, 50, NOW(), NOW() + INTERVAL '15 days');

-- SU DUNG VOUCHER 
CREATE TABLE su_dung_voucher (
    ma_su_dung SERIAL PRIMARY KEY,
    ma_voucher INT REFERENCES voucher(ma_voucher),
    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung),
    ma_don_hang INT REFERENCES don_hang(ma_don_hang),
    so_tien_giam INT NOT NULL,
    ngay_su_dung TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 1 voucher chá»‰ dÃ¹ng 1 láº§n
    UNIQUE (ma_voucher),

    -- 1 Ä‘Æ¡n hÃ ng chá»‰ dÃ¹ng 1 voucher
    UNIQUE (ma_don_hang)
);
INSERT INTO su_dung_voucher (ma_voucher, ma_nguoi_dung, ma_don_hang, so_tien_giam)
VALUES
(1, 1, 1, 100000),
(2, 2, 2, 50000);

-- 1 user chá»‰ dÃ¹ng voucher 1 láº§n
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

-- Giá»›i háº¡n tráº¡ng thÃ¡i
ALTER TABLE tra_gop
ADD CHECK (trang_thai IN ('cho_duyet', 'da_duyet'));

ALTER TABLE lich_su_tra_gop
ADD CHECK (trang_thai IN ('da_tra', 'chua_tra'));


-- ThÃ´ng tin giao hÃ ng
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

-- KÃ­ch hoáº¡t extension há»— trá»£ AI vector
CREATE EXTENSION IF NOT EXISTS vector;

-- ThÃªm cá»™t embedding Ä‘á»ƒ lÆ°u 768 con sá»‘ tá»« Gemini
ALTER TABLE san_pham ADD COLUMN IF NOT EXISTS embedding vector(768);

CREATE TABLE IF NOT EXISTS danh_gia_san_pham (
    ma_danh_gia SERIAL PRIMARY KEY,
    ma_san_pham INT NOT NULL REFERENCES san_pham(ma_san_pham) ON DELETE CASCADE,
    ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung) ON DELETE SET NULL,
    noi_dung TEXT NOT NULL,
    so_sao INT CHECK (so_sao BETWEEN 1 AND 5),
    ngay_danh_gia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
