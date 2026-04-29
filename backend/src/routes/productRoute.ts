import { Router } from "express";
import productController from "../controllers/productController";
import productController from "../controllers/productController";

const router = Router();
router.get("/search", productController.searchProducts);
router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/category/:slug", productController.getByCategory);
router.get("/:id", productController.getProductById);
router.get("/:id", productController.getProductById);

export default router;

