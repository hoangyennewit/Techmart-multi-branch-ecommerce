import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
    private categoryService = new CategoryService();

    public getCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh mục" });
        }
    }
}