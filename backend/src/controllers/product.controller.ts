import { Request, Response } from "express";
import pool from "../config/database";
import { QueryTypes } from "sequelize";

export class ProductController {
  // 1. Hàm lấy danh sách sản phẩm - ĐÃ ĐƯỢC MAP ĐỂ HIỆN GIAO DIỆN
  public getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const results: any = await pool.query(
        `SELECT * FROM san_pham ORDER BY ma_san_pham DESC`,
        { type: QueryTypes.SELECT }
      );

      // Biến đổi dữ liệu SQL thành cấu trúc Frontend cần (giống file products.ts của bạn Frontend)
      const formattedData = results.map((item: any) => ({
        id: item.ma_san_pham.toString(),
        name: item.ten_san_pham,
        description: item.mo_ta_ngan || "Sản phẩm công nghệ cao",
        price: item.gia_ban,
        originalPrice: item.gia_goc || item.gia_ban,
        discount: item.phan_tram_giam || 0,
        images: [
          {
            id: `img-${item.ma_san_pham}`,
            url: item.hinh_anh_dai_dien // Link Cloudinary của bạn
          }
        ],
        colors: [{ id: "c1", name: "Mặc định", hex: "#000000" }]
      }));

      res.status(200).json(formattedData);
    } catch (error: any) {
      console.error("Lỗi getAllProducts:", error);
      res.status(500).json({ error: "Lỗi server", message: error.message });
    }
  };

  // 2. Hàm lọc theo danh mục (Giữ lại logic của nhánh đăng nhập)
  public getByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const slug = req.params.slug as string;
      // Ở đây tạm thời dùng lại getAllProducts để đảm bảo giao diện luôn có dữ liệu
      // Bạn có thể viết thêm query WHERE theo slug nếu cần
      return this.getAllProducts(req, res);
    } catch (error) {
      res.status(500).json({ error: "Lỗi lọc danh mục" });
    }
  };

  // 3. Hàm Upload ảnh Cloudinary (Của bạn - Rất quan trọng để làm tiếp)
  public uploadProductImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ma_san_pham, thu_tu } = req.body;
      const file = (req as any).file;
      if (!file) {
        res.status(400).json({ error: "Vui lòng chọn ảnh!" });
        return;
      }
      const imageUrl = file.path;

      await pool.query(
        `INSERT INTO hinh_anh_san_pham (ma_san_pham, duong_dan_hinh, thu_tu) 
         VALUES ($1, $2, $3)`,
        {
          bind: [parseInt(ma_san_pham), imageUrl, parseInt(thu_tu) || 1],
          type: QueryTypes.INSERT
        }
      );
      res.json({ message: "Upload thành công!", imageUrl });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  // 4. Lấy chi tiết sản phẩm theo ID
  public getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const [product]: any = await pool.query(
        `SELECT * FROM san_pham WHERE ma_san_pham = $1`,
        { bind: [id], type: QueryTypes.SELECT }
      );
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Lỗi lấy chi tiết sản phẩm" });
    }
  }
}

export default new ProductController();