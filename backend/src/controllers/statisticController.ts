import { Request, Response } from 'express';
import { getRevenueByTimeframe } from '../services/statisticService'; // Import service vừa tạo

export const getRevenueStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Lấy tham số từ Query (Ví dụ URL: /api/stats/revenue?timeframe=month&year=2026)
    const timeframe = (req.query.timeframe as 'year' | 'month' | 'week') || 'month';
    const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
    const month = req.query.month ? parseInt(req.query.month as string) : new Date().getMonth() + 1;

    // 2. Kiểm tra tính hợp lệ của tham số timeframe
    if (!['year', 'month', 'week'].includes(timeframe)) {
      res.status(400).json({ message: "Tham số timeframe không hợp lệ. Chỉ nhận 'year', 'month' hoặc 'week'." });
      return;
    }

    // 3. Gọi Service để lấy dữ liệu
    const data = await getRevenueByTimeframe(timeframe, year, month);

    // 4. Trả về kết quả thành công
    res.status(200).json(data);

  } catch (error: any) {
    console.error("Lỗi khi lấy thống kê doanh thu:", error);
    res.status(500).json({ 
      message: "Đã xảy ra lỗi khi lấy dữ liệu thống kê.",
      error: error.message // Có thể bỏ dòng này ở production để bảo mật
    });
  }
};