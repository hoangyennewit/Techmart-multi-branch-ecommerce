import { Request, Response } from "express";
import pool from "../config/database";
import { QueryTypes } from "sequelize";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const results: any = await pool.query(
      `SELECT * FROM san_pham ORDER BY ma_san_pham DESC`,
      {
        type: QueryTypes.SELECT
      }
    );

    const formattedData = results.map((item: any) => ({
      id: item.ma_san_pham.toString(), // Chuyển ma_san_pham thành id (string)
      name: item.ten_san_pham,
      description: item.mo_ta_ngan || "Sản phẩm công nghệ cao",
      price: item.gia_ban,
      originalPrice: item.gia_goc || item.gia_ban, // Khớp với trường originalPrice
      discount: item.phan_tram_giam || 0,
      // Quan trọng nhất: Biến link Cloudinary của bạn thành mảng images
      images: [
        {
          id: `img-${item.ma_san_pham}`,
          url: item.hinh_anh_dai_dien // Link https://res.cloudinary.com/... của bạn nằm đây
        }
      ],
      colors: [
        { id: "c1", name: "Mặc định", hex: "#000000" }
      ]
    }));

    res.json(formattedData);
  } catch (err: any) {
    console.error("--- LỖI LẤY SẢN PHẨM ---:", err);
    res.status(500).json({ error: "Lỗi hệ thống", message: err.message });
  }
};

export const uploadProductImage = async (req: Request, res: Response) => {
  try {
    const { ma_san_pham, thu_tu } = req.body;
    const file = (req as any).file;
    if (!file) return res.status(400).json({ error: "Vui lòng chọn ảnh!" });
    const imageUrl = file.path;

    const result = await pool.query(
      `INSERT INTO hinh_anh_san_pham (ma_san_pham, duong_dan_hinh, thu_tu) 
       VALUES ($1, $2, $3) RETURNING *`,
      {
        bind: [parseInt(ma_san_pham), imageUrl, parseInt(thu_tu) || 1],
        type: QueryTypes.INSERT
      }
    );
    res.json({ message: "Upload thành công!", data: result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getImagesByProduct = async (req: Request, res: Response) => {
  try {
    const { ma_san_pham } = req.params;
    const results = await pool.query(
      `SELECT * FROM hinh_anh_san_pham WHERE ma_san_pham = $1 ORDER BY thu_tu ASC`,
      {
        bind: [parseInt(ma_san_pham)],
        type: QueryTypes.SELECT
      }
    );
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};