import { Router } from "express"; 
import upload from "../middlewares/uploadCloud";
import { 
    uploadProductImage, 
    getImagesByProduct, 
    getAllProducts 
} from "../controllers/product.controller";

const router = Router(); 

router.get("/category/:slug", getAllProducts); 
router.get("/", getAllProducts); 
router.post("/upload-image", upload.single("image"), uploadProductImage);
router.get("/:ma_san_pham", getImagesByProduct);

export default router;