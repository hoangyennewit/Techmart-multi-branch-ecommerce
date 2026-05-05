import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import paymentRoute from './routes/paymentRoute';
import orderRoute from './routes/orderRoute';
import productRoutes from './routes/productRoute';
import passport from 'passport';
import './config/passport';
import './models';

// --- MIDDLEWARE ---
app.use(passport.initialize());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoute);
app.use('/api/orders', orderRoute);

// QUAN TRỌNG: Chỉ dùng 1 dòng này để nạp Route sản phẩm của bạn
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động Server:", error);
  }
};

start();