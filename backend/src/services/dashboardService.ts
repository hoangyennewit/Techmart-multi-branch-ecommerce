import sequelize from '../config/database';
import { QueryTypes } from 'sequelize';

export const getDashboardSummary = async (timeframe: string) => {
  const now = new Date();
  let startCurrent: string;
  let endCurrent: string;
  let startPrevious: string;
  let endPrevious: string;

  // Xử lý mốc thời gian (sử dụng toISOString để PostgreSQL dễ dàng parse)
  if (timeframe === 'month') {
    startCurrent  = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    endCurrent    = now.toISOString();
    startPrevious = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    endPrevious   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString();
  } else if (timeframe === 'last_year') {
    startCurrent  = new Date(now.getFullYear() - 1, 0, 1).toISOString();
    endCurrent    = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59).toISOString();
    startPrevious = new Date(now.getFullYear() - 2, 0, 1).toISOString();
    endPrevious   = new Date(now.getFullYear() - 2, 11, 31, 23, 59, 59).toISOString();
  } else {
    // Mặc định là 'year'
    startCurrent  = new Date(now.getFullYear(), 0, 1).toISOString();
    endCurrent    = now.toISOString();
    startPrevious = new Date(now.getFullYear() - 1, 0, 1).toISOString();
    endPrevious   = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59).toISOString();
  }

  const calcPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  try {
    // 1. DOANH THU (Chỉ tính đơn hàng đã hoàn thành)
    // Dùng QueryTypes.SELECT sẽ trả về mảng object trực tiếp -> Dùng [result] để bóc tách
    const [revCurrent]: any = await sequelize.query(`
      SELECT COALESCE(SUM(tong_tien), 0) AS total FROM don_hang
      WHERE trang_thai = 'hoan_thanh' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startCurrent, end: endCurrent },
      type: QueryTypes.SELECT 
    });

    const [revPrevious]: any = await sequelize.query(`
      SELECT COALESCE(SUM(tong_tien), 0) AS total FROM don_hang
      WHERE trang_thai = 'hoan_thanh' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startPrevious, end: endPrevious },
      type: QueryTypes.SELECT 
    });

    // 2. ĐƠN HÀNG MỚI (Trừ các đơn đã hủy)
    const [orderCurrent]: any = await sequelize.query(`
      SELECT COUNT(*) AS total FROM don_hang
      WHERE trang_thai != 'da_huy' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startCurrent, end: endCurrent },
      type: QueryTypes.SELECT 
    });

    const [orderPrevious]: any = await sequelize.query(`
      SELECT COUNT(*) AS total FROM don_hang
      WHERE trang_thai != 'da_huy' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startPrevious, end: endPrevious },
      type: QueryTypes.SELECT 
    });

    // 3. ĐƠN HỦY
    const [cancelCurrent]: any = await sequelize.query(`
      SELECT COUNT(*) AS total FROM don_hang
      WHERE trang_thai = 'da_huy' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startCurrent, end: endCurrent },
      type: QueryTypes.SELECT 
    });

    const [cancelPrevious]: any = await sequelize.query(`
      SELECT COUNT(*) AS total FROM don_hang
      WHERE trang_thai = 'da_huy' AND ngay_dat BETWEEN :start AND :end
    `, { 
      replacements: { start: startPrevious, end: endPrevious },
      type: QueryTypes.SELECT 
    });

    // Chuyển đổi dữ liệu an toàn với Optional Chaining (?.)
    const revC  = Number(revCurrent?.total)   || 0;
    const revP  = Number(revPrevious?.total)  || 0;
    const ordC  = Number(orderCurrent?.total) || 0;
    const ordP  = Number(orderPrevious?.total)|| 0;
    const canC  = Number(cancelCurrent?.total)|| 0;
    const canP  = Number(cancelPrevious?.total)|| 0;

    // Tính tỉ lệ hủy
    const totalC = ordC + canC;
    const totalP = ordP + canP;
    const cancelRateC = totalC > 0 ? Math.round((canC / totalC) * 100) : 0;
    const cancelRateP = totalP > 0 ? Math.round((canP / totalP) * 100) : 0;

    return [
      {
        id: 1,
        title: "Tổng Doanh Thu",
        value: `${revC.toLocaleString('vi-VN')} ₫`,
        percentage: String(calcPercent(revC, revP)),
        isPositive: revC >= revP
      },
      {
        id: 2,
        title: "Đơn Hàng Mới",
        value: `${ordC} Đơn`,
        percentage: String(calcPercent(ordC, ordP)),
        isPositive: ordC >= ordP
      },
      {
        id: 3,
        title: "Tỉ Lệ Hủy",
        value: `${cancelRateC}%`,
        percentage: String(calcPercent(cancelRateC, cancelRateP)),
        isPositive: cancelRateC <= cancelRateP // Tỉ lệ hủy thấp hơn thì là Positive
      },
      {
        id: 4,
        title: "Chuyển Đổi",
        value: "0%", // Tính năng này có thể mở rộng sau nếu có bảng lượt truy cập (visits)
        percentage: "0",
        isPositive: true
      }
    ];
  } catch (error) {
    console.error("Lỗi truy vấn Database trong DashboardService:", error);
    throw error; // Ném lỗi lên Controller để bắt và trả về 500 nếu DB thực sự gặp sự cố
  }
};