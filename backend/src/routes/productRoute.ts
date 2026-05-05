import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.get("/search", productController.searchProducts);
router.get("/category/:slug", productController.getByCategory);
router.post("/upload-image", productController.uploadProductImage);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

export default router;

