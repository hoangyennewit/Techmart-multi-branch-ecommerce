import { Router } from "express"; 
import upload from "../middlewares/uploadCloud";
import productController from "../controllers/product.controller"; 

const router = Router(); 

// 1. Lấy sản phẩm theo danh mục (Dùng để hiện iPhone, Samsung... trên Web)
router.get("/category/:slug", (req, res) => productController.getByCategory(req, res)); 

// 2. Lấy toàn bộ sản phẩm (Dùng cho trang chủ)
router.get("/", (req, res) => productController.getAllProducts(req, res)); 

// 3. Lấy chi tiết 1 sản phẩm (Dùng khi nhấn vào xem chi tiết)
router.get("/detail/:id", (req, res) => productController.getProductById(req, res));

// 4. Upload ảnh lên Cloudinary (Chức năng quan trọng của bạn)
router.post("/upload-image", upload.single("image"), (req, res) => productController.uploadProductImage(req, res));

// 5. Lấy danh sách ảnh phụ của sản phẩm
router.get("/images/:ma_san_pham", (req, res) => productController.getImagesByProduct(req, res));

export default router;