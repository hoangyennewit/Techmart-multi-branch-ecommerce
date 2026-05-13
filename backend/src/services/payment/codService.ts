import { OrderModel } from "../../models/Order";
import { PaymentEntity } from "../../models/Payment";
export class CODService {
  public async processPayment(orderId: number) {
    try {
      await OrderModel.update(
        {
          paymentStatus: "pending",
          orderStatus: "processing",
        },
        {
          where: {
            id: orderId,
          },
        },
      );
      return {
        success: true,
        message: "Đơn hàng đã được tạo và đang chờ xác nhận.",
        orderId: orderId,
        redirectUrl: `/order-success/${orderId}`,
      };
    } catch (error) {
      console.error("Lỗi trong hàm processPayment của CODService", error);
      throw new Error(
        "Không thể xử lý thanh toán COD cho đơn hàng này. Vui lòng thử lại sau.",
      );
    }
  }
}
