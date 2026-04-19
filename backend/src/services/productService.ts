import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export class ProductService {
    public getAllProducts = async (categoryId?: number) => {
        try {
            let query =
                `SELECT
                    ma_san_pham AS id,
                    ma_danh_muc AS categoryId,
                    ten_san_pham AS name,
                    mo_ta_ngan AS description,
                    gia_ban AS price,
                    gia_goc AS "originalPrice",
                    phan_tram_giam AS discount,
                    so_luong_ton AS stock,
                    diem_danh_gia AS rating,
                    so_luot_xem AS sold,
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
                categoryId: p.categoryId,
                name: p.name,
                description: p.description,
                price: p.price,
                originalPrice: p.originalPrice,
                discount: p.discount,
                stock: p.stock,
                rating: p.rating,
                sold: p.sold,
                createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
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

    public getProductsByCategory = async (slug: string) => {
        try {
            const products: any = await sequelize.query(
                `SELECT
                    sp.ma_san_pham AS id,
                    sp.ten_san_pham AS name,
                    sp.gia_ban AS price,
                    sp.gia_goc AS "originalPrice",
                    sp.phan_tram_giam AS discount,
                    sp.hinh_anh_dai_dien AS image,
                    sp.mo_ta_ngan AS description,
                    sp.diem_danh_gia AS rating,
                    sp.so_luot_xem AS sold
                FROM san_pham sp
                JOIN danh_muc dm ON sp.ma_danh_muc = dm.ma_danh_muc
                WHERE dm.slug = $1 AND sp.trang_thai = 1
                ORDER BY sp.ngay_tao DESC`,
                {
                    bind: [slug],
                    type: QueryTypes.SELECT
                }
            );  
            
            return products.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                originalPrice: p.originalPrice,
                discount: p.discount,
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
        } catch (error) {
            console.error("Lỗi ở ProductService - getProductsByCategory:", error);
            throw new Error("Error fetching products by category");
        }
    }

    public getProductById = async (id: number) => {
        try {
            const productResult: any = await sequelize.query(
                `SELECT
                    ma_san_pham AS id,
                    ma_danh_muc AS categoryId,
                    ten_san_pham AS name,
                    mo_ta_ngan AS description,
                    gia_ban AS price,
                    gia_goc AS "originalPrice",
                    phan_tram_giam AS discount,
                    hinh_anh_dai_dien AS image
                FROM san_pham
                WHERE ma_san_pham = $1 AND trang_thai = 1`,
                {
                    bind: [id],
                    type: QueryTypes.SELECT,
                    plain: true // chỉ lấy 1 sản phẩm duy nhất
                }
            );
            if(!productResult) {
                console.log(`Không tìm thấy sản phẩm với id: ${id}`);
                return null;
            }
            return {
                ...productResult,
                images: [
                    {
                        id: productResult.id,
                        url: productResult.image
                    }
                ],
                colors: [],
                variants: [],
                specs: [],
                comments: []
            };
        }
        catch (error) {            
            throw new Error("Lỗi ở ProductService - getProductById: " + error);
        }
    }
}