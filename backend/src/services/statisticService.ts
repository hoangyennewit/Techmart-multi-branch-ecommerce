import sequelize from '../config/database';
import { QueryTypes } from 'sequelize';

export const getRevenueByTimeframe = async (
  timeframe: 'year' | 'month' | 'week' = 'month',
  year?: number | string, // Chấp nhận string vì req.query thường truyền vào dạng string
  month?: number | string
) => {
  const dateTrunc = timeframe === 'week' ? 'week' : timeframe === 'year' ? 'year' : 'month';
  let whereClause = `WHERE trang_thai = 'da_giao'`; // Chỉ tính doanh thu từ các đơn đã giao (đã hoàn thành) để phản ánh chính xác doanh thu thực tế
  
  // Dùng object replacements để truyền tham số an toàn, chống SQL Injection
  const replacements: any = {};

  if (timeframe === 'month' && year) {
    whereClause += ` AND ngay_dat >= :startDate AND ngay_dat <= :endDate`;
    replacements.startDate = `${year}-01-01 00:00:00`;
    replacements.endDate = `${year}-12-31 23:59:59`;
  } 
  else if (timeframe === 'week' && year && month) {
    const y = Number(year);
    const m = Number(month);
    
    // Tạo chuỗi ngày thủ công thay vì dùng new Date().toISOString() để tránh bị lệch múi giờ (UTC)
    const startDateStr = `${y}-${String(m).padStart(2, '0')}-01 00:00:00`;
    const lastDay = new Date(y, m, 0).getDate(); // Lấy ngày cuối cùng của tháng đó
    const endDateStr = `${y}-${String(m).padStart(2, '0')}-${lastDay} 23:59:59`;

    whereClause += ` AND ngay_dat >= :startDate AND ngay_dat <= :endDate`;
    replacements.startDate = startDateStr;
    replacements.endDate = endDateStr;
  }

  const sql = `
    SELECT 
      DATE_TRUNC('${dateTrunc}', ngay_dat) AS period,
      SUM(tong_tien) AS revenue
    FROM don_hang
    ${whereClause}
    GROUP BY DATE_TRUNC('${dateTrunc}', ngay_dat)
    ORDER BY DATE_TRUNC('${dateTrunc}', ngay_dat) ASC
  `;

  try {
    // Ép kiểu QueryTypes.SELECT để trả về mảng trực tiếp (không cần dùng [results])
    const results: any = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT
    });

    // Ép doanh thu về Number để Controller không bị crash khi tính toán
    return results.map((row: any) => ({
      period: row.period,
      revenue: Number(row.revenue) || 0
    }));
    
  } catch (error) {
    console.error("❌ Lỗi truy vấn doanh thu theo thời gian:", error);
    throw error;
  }
};