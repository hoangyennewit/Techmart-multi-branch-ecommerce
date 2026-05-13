import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { CODService } from "./payment/codService";
import { VNPayService } from "./payment/vnpayService";

export class OrderService {
  private codService: CODService;
  private vnpayService: VNPayService;

  constructor() {
    this.codService = new CODService();
    this.vnpayService = new VNPayService();
  }

  public createOrder = async (orderData: any) => {
    const {
      items,
      totalAmount,
      shippingFee,
      shippingInfo,
      userId,
    } = orderData;
    const tongTien = totalAmount + shippingFee;

    const t = await sequelize.transaction();
    try {
      const [orderResult]: any = await sequelize.query(
        `INSERT INTO don_hang(ma_nguoi_dung, tong_tien, trang_thai)
                VALUES ($1, $2, 'cho_xac_nhan')
                RETURNING ma_don_hang`,
        {
          bind: [userId, tongTien],
          type: QueryTypes.INSERT,
          transaction: t,
        },
      );

      const newOrderId = orderResult[0].ma_don_hang;
      await sequelize.query(
        `INSERT INTO thong_tin_giao_hang(ma_don_hang, ten_nguoi_nhan, so_dien_thoai, dia_chi_giao_hang ,ghi_chu)
                VALUES ($1, $2, $3, $4, $5)`,
        {
          bind: [
            newOrderId,
            shippingInfo.fullName,
            shippingInfo.phone,
            shippingInfo.address,
            shippingInfo.note || "",
          ],
          type: QueryTypes.INSERT,
          transaction: t,
        },
      );

      const values = items
        .map(
          (_: any, i: number) =>
            `($1, $${i * 3 + 2}, $${i * 3 + 3}, $${i * 3 + 4})`,
        )
        .join(",");
      const flatItems = items.reduce(
        (acc: any, item: any) => [
          ...acc,
          item.id || item.productId, // Support both frontend (id) and backend (productId)
          item.quantity,
          item.price,
        ],
        [newOrderId],
      );
      await sequelize.query(
        `INSERT INTO chi_tiet_don_hang(ma_don_hang, ma_san_pham, so_luong, don_gia) VALUES ${values}`,
        { bind: flatItems, type: QueryTypes.INSERT, transaction: t },
      );
      await t.commit();

      return newOrderId;
    } catch (error) {
      await t.rollback();
      console.error("Lỗi ở OrderService - createOrder:", error);
      throw error;
    }
  };

  // Lấy danh sách đơn hàng của người dùng
  public getMyOrdersService = async (userId: number) => {
    try {
      const orders: any = await sequelize.query(
        `SELECT
                    dh.ma_don_hang as id,
                    dh.tong_tien as "totalAmount",
                    dh.trang_thai as status,
                    dh.ngay_dat as "createdAt",
                    gh.ten_nguoi_nhan,
                    gh.dia_chi_giao_hang,
                    30000 as "shippingFee"
                FROM don_hang dh
                LEFT JOIN thong_tin_giao_hang gh ON dh.ma_don_hang = gh.ma_don_hang
                WHERE dh.ma_nguoi_dung = $1
                ORDER BY dh.ngay_dat DESC`,
        {
          bind: [userId],
          type: QueryTypes.SELECT,
        },
      );

      for (let order of orders) {
        const itemsResult: any = await sequelize.query(
          `SELECT
                        ctdh.ma_san_pham as ProductId,
                        sp.ten_san_pham as productName,
                        ctdh.don_gia as price,
                        ctdh.so_luong as quantity
                    FROM chi_tiet_don_hang ctdh
                    JOIN san_pham sp ON ctdh.ma_san_pham = sp.ma_san_pham
                    WHERE ctdh.ma_don_hang = $1`,
          {
            bind: [order.id],
            type: QueryTypes.SELECT,
          },
        );
        order.items = itemsResult;

        switch (order.status) {
          case "cho_xac_nhan":
            order.status = "pending";
            break;
          case "dang_xu_ly":
          case "da_xac_nhan":
            order.status = "processing";
            break;
          case "dang_giao":
            order.status = "shipping";
            break;
          case "da_giao":
            order.status = "delivered";
            break;
          case "da_huy":
            order.status = "cancelled"; 
            break;
          default:
            order.status = "pending";
        }
      }
      return orders;
    } catch (error) {
      console.error("Lỗi ở OrderService - getMyOrdersService:", error);
      throw error;
    }
  };
}
