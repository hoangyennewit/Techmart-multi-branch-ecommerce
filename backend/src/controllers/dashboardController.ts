import { Request, Response } from 'express';
import { getDashboardSummary } from '../services/dashboardService';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const timeframe = (req.query.timeframe as string) || 'year';

    console.log(`[Dashboard] Lấy thống kê với timeframe: ${timeframe}`);

    const data = await getDashboardSummary(timeframe);

    res.status(200).json(data);

  } catch (error: any) {
    console.error('[Dashboard] Lỗi khi lấy dashboard stats:', error);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy dữ liệu dashboard.',
      error: error.message
    });
  }
};