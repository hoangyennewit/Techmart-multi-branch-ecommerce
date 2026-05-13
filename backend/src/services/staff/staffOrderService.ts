import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { OrderSearchQueryDto, UpdateOrderStatusDto } from "../../dtos/staffOrderDto";

export class StaffOrderService {
  /**
   * 1. LẤY DANH SÁCH ĐƠN HÀNG CHO NHÂN VIÊN (CÓ LỌC & PHÂN TRANG)
   */
  public getOrdersForProcessing = async (query: OrderSearchQueryDto) => {
    try {
      const { keyword, status, page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;

      // Xử lý điều kiện WHERE động
      let whereClauses = [];
      let bindParams: any[] = [];

      if (status) {
        whereClauses.push(`dh.trang_thai = $${bindParams.length + 1}`);
        bindParams.push(status);
      }

      if (keyword) {
        whereClauses.push(`(nd.ho_ten ILIKE $${bindParams.length + 1} OR dh.ma_don_hang::text = $${bindParams.length + 1})`);
        bindParams.push(`%${keyword}%`);
      }

      const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

      // Truy vấn lấy dữ liệu
      const orders: any = await sequelize.query(
        `SELECT 
            dh.ma_don_hang as id,
            nd.ho_ten as "customerName",
            dh.tong_tien as "totalAmount",
            dh.trang_thai as status,
            dh.ngay_dat as "createdAt"
        FROM don_hang dh
        JOIN nguoi_dung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
        ${whereSql}
        ORDER BY dh.ngay_dat DESC
        LIMIT $${bindParams.length + 1} OFFSET $${bindParams.length + 2}`,
        {
          bind: [...bindParams, limit, offset],
          type: QueryTypes.SELECT,
        }
      );

      // Truy vấn lấy tổng số lượng để phân trang
      const [countResult]: any = await sequelize.query(
        `SELECT COUNT(*) as total FROM don_hang dh 
         JOIN nguoi_dung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
         ${whereSql}`,
        {
          bind: bindParams,
          type: QueryTypes.SELECT,
        }
      );

      const total = parseInt(countResult.total, 10);

      // Map lại trạng thái hiển thị cho giống logic file ví dụ của bạn
      const mappedOrders = orders.map((order: any) => ({
        ...order,
        statusDisplay: this.mapStatus(order.status)
      }));

      return {
        data: mappedOrders,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Lỗi ở StaffOrderService - getOrdersForProcessing:", error);
      throw error;
    }
  };

  /**
   * 2. XEM CHI TIẾT ĐƠN HÀNG
   */
  public getOrderDetailsById = async (orderId: number) => {
    try {
      // Lấy thông tin đơn hàng và người dùng
      const [order]: any = await sequelize.query(
        `SELECT 
            dh.ma_don_hang as id,
            dh.tong_tien as "totalAmount",
            dh.trang_thai as status,
            dh.ngay_dat as "createdAt",
            nd.ho_ten as "customerName",
            nd.so_dien_thoai as "phone",
            gh.ten_nguoi_nhan,
            gh.dia_chi_giao_hang,
            gh.ghi_chu
        FROM don_hang dh
        JOIN nguoi_dung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
        LEFT JOIN thong_tin_giao_hang gh ON dh.ma_don_hang = gh.ma_don_hang
        WHERE dh.ma_don_hang = $1`,
        {
          bind: [orderId],
          type: QueryTypes.SELECT,
        }
      );

      if (!order) throw new Error("Không tìm thấy đơn hàng");

      // Lấy danh sách sản phẩm
      const items = await sequelize.query(
        `SELECT 
            ct.ma_san_pham as "productId",
            sp.ten_san_pham as "productName",
            ct.so_luong as "quantity",
            ct.don_gia as "price",
            (ct.so_luong * ct.don_gia) as "subTotal"
        FROM chi_tiet_don_hang ct
        JOIN san_pham sp ON ct.ma_san_pham = sp.ma_san_pham
        WHERE ct.ma_don_hang = $1`,
        {
          bind: [orderId],
          type: QueryTypes.SELECT,
        }
      );

      order.items = items;
      order.statusDisplay = this.mapStatus(order.status);

      return order;
    } catch (error) {
      console.error("Lỗi ở StaffOrderService - getOrderDetailsById:", error);
      throw error;
    }
  };

  /**
   * 3. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
   */
  public updateOrderStatus = async (orderId: number, updateData: UpdateOrderStatusDto) => {
    const { status } = updateData;
    try {
      await sequelize.query(
        `UPDATE don_hang SET trang_thai = $1 WHERE ma_don_hang = $2`,
        {
          bind: [status, orderId],
          type: QueryTypes.UPDATE,
        }
      );
      return { message: "Cập nhật trạng thái thành công" };
    } catch (error) {
      console.error("Lỗi ở StaffOrderService - updateOrderStatus:", error);
      throw error;
    }
  };

  /**
   * Hàm helper map trạng thái giống file ví dụ
   */
  private mapStatus(status: string) {
    switch (status) {
      case "cho_xac_nhan": return "pending";
      case "da_xac_nhan": return "processing";
      case "dang_giao": return "shipping";
      case "da_giao": return "delivered";
      case "da_huy": return "cancelled";
      default: return "pending";
    }
  }
}