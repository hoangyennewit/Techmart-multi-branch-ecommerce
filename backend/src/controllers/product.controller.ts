import { Request, Response } from "express";
import pool from "../config/database";
import { QueryTypes } from "sequelize"; // Import thêm QueryTypes để code sạch hơn

export const uploadProductImage = async (req: Request, res: Response) => {
  try {
    const { ma_san_pham, thu_tu } = req.body;
    const file = (req as any).file;

    // 1. Kiểm tra file từ Cloudinary
    if (!file) {
      return res.status(400).json({ error: "Vui lòng chọn ảnh để upload!" });
    }

    const imageUrl = file.path;

    // 2. Kiểm tra mã sản phẩm
    if (!ma_san_pham) {
      return res.status(400).json({ error: "Thiếu mã sản phẩm!" });
    }

    // 3. Thực hiện truy vấn qua Sequelize
    // Lưu ý: Sequelize.query trả về [results, metadata]
    const [result]: any = await pool.query(
      `INSERT INTO hinh_anh_san_pham (ma_san_pham, duong_dan_hinh, thu_tu) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      {
        bind: [
          parseInt(ma_san_pham), 
          imageUrl, 
          parseInt(thu_tu) || 1
        ],
        type: QueryTypes.INSERT
      }
    );

    // 4. Trả về kết quả
    // Với RETURNING *, dữ liệu nằm trong result[0]
    res.json({
      message: "Upload thành công!",
      data: result && result.length > 0 ? result[0] : result
    });

  } catch (err: any) {
    console.error("--- LỖI TẠI CONTROLLER ---:", err);
    res.status(500).json({ 
      error: "Lỗi upload ảnh sản phẩm", 
      message: err.message,
      detail: err
    });
  }
};

export const getImagesByProduct = async (req: Request, res: Response) => {
  try {
    const { ma_san_pham } = req.params;
    
    const results = await pool.query(
      `SELECT * FROM hinh_anh_san_pham 
       WHERE ma_san_pham = $1 
       ORDER BY thu_tu ASC`,
      {
        bind: [parseInt(ma_san_pham)],
        type: QueryTypes.SELECT
      }
    );

    res.json(results);
  } catch (err: any) {
    console.error("--- LỖI LẤY ẢNH ---:", err);
    res.status(500).json({ error: "Lỗi lấy danh sách ảnh", message: err.message });
  }
};