# Techmart-multi-branch-ecommerce
# Techmart - Nền Tảng E-Commerce Đa Chi Nhánh

Nền tảng thương mại điện tử chuyên kinh doanh thiết bị số với hệ thống quản lý phân quyền đa chi nhánh và kiến trúc Polyglot Persistence (sử dụng công nghệ đa dạng).

**Website Live:** https://techmartvn.xyz/

## 🎯 Tính Năng Chính

✅ Hệ Thống RBAC (Role-Based Access Control):
- 8 vai trò khác nhau (Admin, Giám Đốc, Quản Lý, Nhân Viên, Khách Hàng)
- Phân quyền chi tiết cho từng chức năng

✅ Quản Lý Đa Chi Nhánh:
- Quản lý sản phẩm, đơn hàng, tồn kho theo chi nhánh
- Dashboard thống kê cho từng chi nhánh

✅ Tính Năng E-Commerce:
- Danh mục sản phẩm, tìm kiếm, lọc
- Giỏ hàng, thanh toán (ZaloPay)
- Đánh giá & bình luận sản phẩm
- Quản lý đơn hàng

✅ Chatbot AI:
- Tích hợp Google Gemini cho hỗ trợ khách hàng

✅ Quản Lý Hình Ảnh:
- Tải lên ảnh qua Cloudinary (CDN tối ưu)

## 📁 Cấu Trúc Dự Án
Techmart-multi-branch-ecommerce/
├── backend/                          # Backend Node.js (TypeScript)
│   ├── src/
│   │   ├── server.ts                # Entry point chính
│   │   ├── app.ts                   # Express app configuration
│   │   ├── config/
│   │   │   ├── database.ts          # Kết nối PostgreSQL + Sequelize ORM
│   │   │   ├── initDB.ts            # Khởi tạo database
│   │   │   ├── passport.ts          # Cấu hình xác thực (JWT, Google OAuth)
│   │   │   ├── cloudinary.ts        # Cấu hình upload hình ảnh
│   │   │   ├── gemini.ts            # Cấu hình Gemini API
│   │   │   ├── momo.ts              # Cấu hình MoMo Payment
│   │   │   ├── vnpay.ts             # Cấu hình VNPay Payment
│   │   │   └── zalopay.ts           # Cấu hình ZaloPay Payment
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.ts    # Xác thực & đăng nhập
│   │   │   ├── productController.ts # Quản lý sản phẩm
│   │   │   ├── orderController.ts   # Quản lý đơn hàng khách hàng
│   │   │   ├── staffOrderController.ts # Quản lý đơn hàng của nhân viên
│   │   │   ├── paymentController.ts # Xử lý thanh toán
│   │   │   ├── reviewController.ts  # Quản lý đánh giá sản phẩm
│   │   │   ├── categoryController.ts# Quản lý danh mục
│   │   │   ├── chatbotController.ts # Chatbot AI
│   │   │   ├── dashboardController.ts # Dashboard thống kê
│   │   │   └── statisticController.ts # Báo cáo thống kê
│   │   ├── services/                 # Xử lý logic phức tạp
│   │   │   ├── authService.ts       # Service xác thực
│   │   │   ├── productService.ts    # Service sản phẩm
│   │   │   ├── orderService.ts      # Service đơn hàng
│   │   │   ├── categoryService.ts   # Service danh mục
│   │   │   ├── chatbotService.ts    # Service chatbot
│   │   │   ├── statisticService.ts  # Service thống kê
│   │   │   ├── dashboardService.ts  # Service dashboard
│   │   │   ├── payment/             # Payment services (VNPay, MoMo, ZaloPay)
│   │   │   └── staff/               # Staff services
│   │   ├── models/                   # Database models (Sequelize ORM)
│   │   │   ├── User.ts              # Model người dùng
│   │   │   ├── Order.ts             # Model đơn hàng
│   │   │   ├── OrderItem.ts         # Model chi tiết đơn hàng
│   │   │   ├── Payment.ts           # Model thanh toán
│   │   │   ├── Review.ts            # Model đánh giá
│   │   │   └── index.ts             # Định nghĩa quan hệ
│   │   ├── routes/                   # API endpoints
│   │   │   ├── authRoutes.ts        # /api/auth
│   │   │   ├── productRoute.ts      # /api/products
│   │   │   ├── orderRoute.ts        # /api/orders
│   │   │   ├── staffOrderRoute.ts   # /api/staff
│   │   │   ├── paymentRoute.ts      # /api/payments
│   │   │   ├── reviewRoute.ts       # /api/products/reviews
│   │   │   ├── categoryController.ts# Danh mục
│   │   │   ├── chatbotRoute.ts      # /api/chatbot
│   │   │   ├── dashboardRoute.ts    # /api/dashboard
│   │   │   └── statisticRoute.ts    # /api/stats
│   │   ├── dtos/                     # Data Transfer Objects
│   │   │   ├── authDto.ts
│   │   │   ├── orderDto.ts
│   │   │   ├── paymentDto.ts
│   │   │   ├── productDto.ts
│   │   │   └── staffOrderDto.ts
│   │   ├── interfaces/               # TypeScript interfaces
│   │   │   ├── authInterface.ts
│   │   │   ├── productInterface.ts
│   │   │   ├── roleInterface.ts
│   │   │   └── vnpayInterface.ts
│   │   ├── middlewares/              # Express middlewares
│   │   │   ├── authMiddleware.ts    # Xác thực JWT
│   │   │   ├── roleMiddleware.ts    # Kiểm tra quyền role
│   │   │   └── uploadCloud.ts       # Xử lý upload Cloudinary
│   │   └── utils/
│   │       └── geminiUtil.ts         # Utilities cho Gemini AI
│   ├── sql/
│   │   └── init.sql                 # Script khởi tạo database
│   ├── Dockerfile                   # Container image cho backend
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript config
│   └── testsconfig.json
│
├── frontend/                         # Frontend React + Vite
│   ├── src/
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.jsx                  # Root component
│   │   ├── index.css                # Global styles
│   │   ├── components/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Footer.tsx           # Footer
│   │   │   ├── CategoryBar.tsx      # Danh mục sidebar
│   │   │   ├── common/              # Các component tái sử dụng
│   │   │   ├── product/             # Components sản phẩm
│   │   │   ├── promo/               # Components khuyến mãi
│   │   │   ├── Admin/               # Dashboard admin
│   │   │   ├── Manager/             # Dashboard quản lý
│   │   │   ├── staff/               # Dashboard nhân viên
│   │   │   └── Tech/                # Components kỹ thuật
│   │   ├── features/                # Redux slices
│   │   │   ├── auth/                # Xác thực
│   │   │   ├── customer/            # Khách hàng
│   │   │   ├── employee/            # Nhân viên
│   │   │   └── profile/             # Hồ sơ người dùng
│   │   ├── routes/
│   │   │   ├── CustomerRoutes.tsx   # Routes khách hàng
│   │   │   ├── EmployeeRoutes.tsx   # Routes nhân viên
│   │   │   └── index.tsx            # Routes chính
│   │   ├── store/
│   │   │   └── index.ts             # Redux store setup
│   │   ├── assets/
│   │   │   ├── icons/               # Icon SVG
│   │   │   ├── images/              # Hình ảnh
│   │   │   └── logos/               # Logo
│   │   ├── config/                  # Cấu hình
│   │   ├── layouts/                 # Layout components
│   │   └── utils/
│   │       └── redirectStateManager.ts # Quản lý redirect state
│   ├── public/                      # Tài nguyên tĩnh
│   ├── Dockerfile                   # Container image cho frontend
│   ├── nginx.conf                   # Nginx config
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── vite.config.js               # Vite config
│   └── eslint.config.js             # ESLint config
│
├── infrastructure/                  # Terraform config cho AWS
│   ├── main.tf                      # Main configuration
│   ├── ecs.tf                       # ECS container service
│   ├── frontend.tf                  # Frontend deployment
│   ├── rds.tf                       # RDS database
│   └── ...
│
├── docker-compose.yml               # Docker Compose (local dev)
├── package.json                     # Dependencies gốc
├── README.md                        # README
├── .env                             # File môi trường
├── fetch-logs.js                    # Script lấy logs
├── fetch-logs.py                    # Script lấy logs (Python)
└── log.json                         # File logs

🛠️ Công Nghệ Sử Dụng
### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize (PostgreSQL)
- **Authentication**: Passport.js (JWT, Google OAuth)
- **Payment Gateway**: ZaloPay
- **Image Storage**: Cloudinary
- **AI**: Google Gemini API

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Carousel:** Swiper
- **Icons:** Lucide React

### Database
- **SQL:** PostgreSQL 15
- **ORM:** Sequelize

### DevOps & Infrastructure
- **Containerization:** Docker + Docker Compose
- **Infrastructure as Code:** Terraform
- **Cloud:** AWS (ECS, RDS)
- **Web Server:** Nginx


## 📋 Vai Trò & Quyền Hạn

| Vai Trò | Mã | Quyền Hạn |
|---------|-----|----------|
| **Admin** | ADMIN | Quản trị hệ thống, kỹ thuật |
| **Giám Đốc** | GIAM_DOC | Toàn quyền quản lý hệ thống |
| **QL Sản Phẩm** | QL_SAN_PHAM | Quản lý danh mục, hàng hóa |
| **QL Cửa Hàng** | QL_CUA_HANG | Quản lý vận hành chi nhánh |
| **NV CSKH** | NV_CSKH | Hỗ trợ, chăm sóc khách hàng |
| **NV Bán Hàng** | NV_BAN_HANG | Thực hiện giao dịch bán hàng |
| **NV Kho** | NV_KHO | Quản lý nhập xuất tồn kho |
| **Khách Hàng** | KHACH_HANG | Người dùng đã đăng ký |

## 🚀 Cách Build & Chạy Dự Án

### 📌 Yêu Cầu Hệ Thống

- Node.js >= 18
- Docker & Docker Compose (tùy chọn)
- PostgreSQL 15 (nếu không dùng Docker)
- npm hoặc yarn

### 1️⃣ Cách 1: Chạy với Docker Compose

#### Setup ban đầu:
# Clone repository
git clone <repo-url>
cd Techmart-multi-branch-ecommerce

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa .env với thông tin của bạn
# - DB_USER, DB_PASSWORD, DB_NAME
# - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
# - Các API keys khác

#### Chạy dự án:
# Build và chạy tất cả services
docker-compose up -d

# Kiểm tra status
docker-compose ps

# Xem logs
docker-compose logs -f backend
docker-compose logs -f frontend

**Các services sẽ chạy tại:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5433
- API Docs: http://localhost:5000/api-docs

#### Dừng services:
docker-compose down

# Xóa toàn bộ data
docker-compose down -v

### 2️⃣ **Cách 2: Chạy Local (Không dùng Docker)**

#### A. Setup Database:
# Cài PostgreSQL 15 (hoặc dùng Docker chỉ cho DB)
docker run --name postgres_db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=techmart -p 5433:5432 postgres:15-alpine

# Hoặc cài local PostgreSQL từ https://www.postgresql.org/download/

#### B. Setup Backend:
cd backend

# Cài dependencies
npm install

# Tạo file .env
cp ../.env.example .env

# Build TypeScript
npm run build

# Chạy development
npm run dev

# Hoặc chạy production
npm start

Backend sẽ chạy tại: **http://localhost:5000**

#### C. Setup Frontend:

cd frontend

# Cài dependencies
npm install

# Chạy development server
npm run dev

# Hoặc build production
npm run build
Frontend sẽ chạy tại: **http://localhost:5173**

## 📝 Biến Môi Trường (.env)

## 📚 API Endpoints Chính

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/google` - Google OAuth
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### Orders
- `GET /api/orders` - Danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `PUT /api/orders/:id` - Cập nhật đơn hàng

### Payments
- `POST /api/payments/vnpay` - Thanh toán VNPay
- `POST /api/payments/momo` - Thanh toán MoMo
- `POST /api/payments/zalopay` - Thanh toán ZaloPay

### Dashboard
- `GET /api/dashboard/stats` - Thống kê tổng quan
- `GET /api/stats/revenue` - Doanh thu
- `GET /api/stats/orders` - Thống kê đơn hàng

### Chatbot
- `POST /api/chatbot/ask` - Hỏi chatbot

## 📊 Database Schema Chính

### Bảng Chính:
1. nguoi_dung - Người dùng
2. vai_tro - Vai trò phân quyền
3. san_pham - Sản phẩm
4. danh_muc - Danh mục sản phẩm
5. don_hang - Đơn hàng
6. chi_tiet_don_hang - Chi tiết đơn hàng
7. thanh_toan - Thanh toán
8. danh_gia_san_pham - Đánh giá/Review
9. dia_chi - Địa chỉ giao hàng

## 🔒 Bảo Mật

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ CORS Protection
- ✅ Role-Based Authorization
- ✅ SQL Injection Prevention (Sequelize ORM)
- ✅ XSS Protection (React sanitize)
- ✅ HTTPS in Production

## Live Demo

Currently live at: https://techmartvn.xyz/
