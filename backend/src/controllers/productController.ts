import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import sequelize from "../config/database";

export class ProductController {
    private productService: ProductService;
    constructor(){
        this.productService = new ProductService();
    }

    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
            const products = await this.productService.getAllProducts(categoryId);

            res.status(200).json(products);
        } catch (error) {
            console.error("Lỗi ở ProductController - getAllProducts:", error);
            res.status(500).json({
                error: "Đã có lỗi Server xảy ra khi lấy danh sách sản phẩm. Vui lòng thử lại sau." 
            });
        }
    }

    public getByCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const slug = req.params.slug as string;
            const products = await this.productService.getProductsByCategory(slug);            
            res.status(200).json(products);
        }
        catch (error) {
            console.error("Lỗi ở ProductController - getByCategory:", error);
            res.status(500).json({
                error: "Lỗi khi lọc sản phẩm theo danh mục"
            });
        }
    }
}