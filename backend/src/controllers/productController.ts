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

    public getProductById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.getProductById(id);
            if(!product) {
                res.status(404).json({ error: "Sản phẩm không tồn tại" });
                return;
            }
            res.status(200).json(product);
        }
        catch (error) {
            console.error("Lỗi ở ProductController - getProductById:", error);
            res.status(500).json({
                error: "Lỗi khi lấy thông tin sản phẩm"
            });
        }
    }
}