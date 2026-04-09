import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();
const productController = new ProductController();
router.get("/", (req, res) => productController.getAllProducts);

export default router;