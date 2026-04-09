import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();
const productController = new ProductController();
router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/category/:slug", productController.getByCategory);

export default router;