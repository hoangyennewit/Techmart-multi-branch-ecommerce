import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
    private productService: ProductService;
    constructor(){
        this.productService = new ProductService();
    }

    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Lỗi ở ProductController - getAllProducts:", error);
            res.status(500).json({
                error: "Đã có lỗi Server xảy ra khi lấy danh sách sản phẩm. Vui lòng thử lại sau." 
            });
        }
    }
}