import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import {connectDB} from './config/database';
import {initializeDatabase} from './config/initDB';
import authRoutes from './routes/authRoutes';
import paymentRoute from './routes/paymentRoute';
import orderRoute from './routes/orderRoute';
import productRoutes from './routes/productRoute';
import reviewRoute from './routes/reviewRoute';
import chatbotRoute from './routes/chatbotRoute';
import statisticRoute from './routes/statisticRoute';
import dashboardRoute from './routes/dashboardRoute';
import staffOrderRoute from './routes/staffOrderRoute';
import passport from 'passport';
import './config/passport';
import './models';

// --- MIDDLEWARE ---
app.use(passport.initialize());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoute);
app.use('/api/orders', orderRoute);
app.use('/api/chatbot', chatbotRoute);
app.use('/api/stats', statisticRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/staff', staffOrderRoute);
// QUAN TRỌNG: Chỉ dùng 1 dòng này để nạp Route sản phẩm của bạn
app.use('/api/products', productRoutes);
app.use('/api/products', reviewRoute);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await initializeDatabase();
    
    // Đảm bảo bảng danh_gia_san_pham tồn tại mà không cần drop các bảng khác
    const db = require('./config/database');
    const sequelizeInstance = db.default || db;
    await sequelizeInstance.query(`
      CREATE TABLE IF NOT EXISTS danh_gia_san_pham (
          ma_danh_gia SERIAL PRIMARY KEY,
          ma_san_pham INT NOT NULL REFERENCES san_pham(ma_san_pham) ON DELETE CASCADE,
          ma_nguoi_dung INT REFERENCES nguoi_dung(ma_nguoi_dung) ON DELETE SET NULL,
          noi_dung TEXT NOT NULL,
          so_sao INT CHECK (so_sao BETWEEN 1 AND 5),
          ngay_danh_gia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `).catch((err: any) => console.error("Lỗi tạo bảng đánh giá:", err));

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động Server:", error);
  }
};

start();