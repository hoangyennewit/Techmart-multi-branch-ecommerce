import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export class ProductService {
    public getAllProducts = async (categoryId?: number) => {
        try {
            let query =
                `SELECT
                    ma_san_pham AS id,
                    ten_san_pham AS name,
                    mo_ta_ngan AS description,
                    gia_ban AS price,
                    gia_goc AS "originalPrice",
                    phan_tram_giam AS discount,
                    so_luong_ton AS stock,
                    diem_danh_gia AS rating,
                    so_luong_xem AS sold,
                    ngay_tao AS createdAt,
                    hinh_anh_dai_dien AS image
                FROM san_pham
                WHERE trang_thai = 1`;
            
            const bindParams: any[] = [];
            if (categoryId) {
                query += ` AND ma_danh_muc = $1`;
                bindParams.push(categoryId);
            }
            const products: any = await
                sequelize.query(query, {
                    bind: bindParams, // chống hack SQL injection
                    type: QueryTypes.SELECT
                });
            
            const formattedProducts = products.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                originalPrice: p.originalPrice,
                discount: p.discount,
                stock: p.stock,
                rating: p.rating,
                sold: p.sold,
                createdAt: new Date(p.createdAt).toISOString(),
                image: [
                    {
                        id: p.id,
                        url: p.image
                    }
                ],
                colors: [],
                variants: [],
                specs: []
            }));

            return formattedProducts;
        } catch (error) {
            console.error("Lỗi ở ProductService - getAllProducts:", error);
            throw new Error("Error fetching products");
        }
    }
}