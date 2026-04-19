import { Router } from "express";
import upload from "../middlewares/uploadCloud";
// Sửa dòng này để khớp chính xác với tên file product.controller.ts
import { uploadProductImage, getImagesByProduct } from "../controllers/product.controller";

const router = Router();

router.post("/upload-image", upload.single("image"), uploadProductImage);
router.get("/:ma_san_pham", getImagesByProduct);

export default router;