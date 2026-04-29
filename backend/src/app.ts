import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';
import productRoutes from "./routes/product.routes"; 

const app: Application = express();

app.use((req, res, next) => {
    res.setHeader("Bypass-Tunnel-Reminder", "eyJhbGciOiJIUzI1NiJ9");
    next();
});

// --- CẤU HÌNH MIDDLEWARE ---
app.use(cors());

// 1. Đọc dữ liệu JSON
app.use(express.json());

// 2. QUAN TRỌNG: Đọc dữ liệu từ Form-data (Multipart/form-data)
// Thêm dòng này để xử lý các field như ma_san_pham, thu_tu
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// --- ROUTES ---
app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Techmart API');
});


// Middleware xử lý lỗi tập trung (Tránh Socket Hang Up khi crash)
app.use((err: any, req: any, res: any, next: any) => {
    console.error("LOG LỖI HỆ THỐNG:", err.stack);
    res.status(500).json({ error: "Server bị crash!", detail: err.message });
});

export default app;