import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export class CategoryService {
    public getAllCategories = async () => {
        try {
            const categories: any = await sequelize.query(
                `SELECT 
                    ma_danh_muc AS id, 
                    ten_danh_muc AS name, 
                    slug, 
                    mo_ta AS description
                FROM danh_muc 
                WHERE trang_thai = 1`,
                { type: QueryTypes.SELECT }
            );
            return categories;
        } catch (error) {
            console.error("Lỗi ở CategoryService:", error);
            throw error;
        }
    }
}