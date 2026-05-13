import { Request, Response } from "express";
import { Review } from "../models/Review";
import { User } from "../models/User";
import sequelize from "../config/database";

export class ReviewController {
  public addReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const { ma_nguoi_dung, noi_dung, so_sao } = req.body;

      if (!productId || !noi_dung || !so_sao) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const review = await Review.create({
        ma_san_pham: productId,
        ma_nguoi_dung: ma_nguoi_dung || null,
        noi_dung,
        so_sao
      });

      // Update average rating
      await sequelize.query(`
        UPDATE san_pham 
        SET diem_danh_gia = (
          SELECT ROUND(AVG(so_sao)::numeric, 1)
          FROM danh_gia_san_pham
          WHERE ma_san_pham = :productId
        )
        WHERE ma_san_pham = :productId
      `, {
        replacements: { productId }
      });

      res.status(201).json(review);
    } catch (error) {
      console.error("Lỗi ở ReviewController - addReview:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const reviews = await Review.findAll({
        where: { ma_san_pham: productId },
        include: [{
          model: User,
          as: 'user',
          attributes: ['ho_ten', 'ma_nguoi_dung']
        }],
        order: [['ngay_danh_gia', 'DESC']]
      });

      const formattedReviews = reviews.map((r: any) => ({
        id: r.ma_danh_gia,
        productId: r.ma_san_pham,
        userId: r.user?.ma_nguoi_dung || 'guest',
        userName: r.user?.ho_ten || 'Khách hàng',
        content: r.noi_dung,
        stars: r.so_sao,
        createdAt: r.ngay_danh_gia
      }));

      res.status(200).json(formattedReviews);
    } catch (error) {
      console.error("Lỗi ở ReviewController - getReviews:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
