import { Request, Response } from "express";
import { VNPayService } from "../services/payment/vnpayService";
import { CreatePaymentEntity } from "../models/Payment";

export class PaymentController {
  private vnpayService: VNPayService;

  constructor() {
    this.vnpayService = new VNPayService();
  }

  public createPaymentIntent = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { amount, orderId } = req.body;
      let ip = req.headers["x-forwarded-for"]?.toString() || "127.0.0.1";
      const txnRef = orderId
        ? orderId.toString()
        : new Date().getTime().toString();

      const paymentUrl = this.vnpayService.createdPaymentUrl(
        Number(amount),
        ip,
        txnRef,
      );
      res.status(200).json({
        success: true,
        message: "URL thanh toán đã được tạo thành công",
        url: paymentUrl,
      });
      return;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo URL thanh toán",
      });
      return;
    }
  };
  public async savePayment(req: Request, res: Response): Promise<void> {
    try {
      const { ma_don_hang, phuong_thuc, so_tien } = req.body;
      if (!ma_don_hang || !phuong_thuc || !so_tien) {
        res.status(400).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc: ma_don_hang, phuong_thuc, so_tien",
        });
        return;
      }
      const paymentData: CreatePaymentEntity = {
        ma_don_hang,
        phuong_thuc,
        so_tien,
        trang_thai: "cho_xu_ly",
      };

      const payment = await this.vnpayService.savePayment(paymentData);
      res.status(201).json({
        success: true,
        message: "Thanh toán đã được lưu thành công",
        data: payment,
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lưu thanh toán",
      });
    }
  }

  public getPaymentHistory = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const payments = await this.vnpayService.getPaymentHistory();
      res.status(200).json({
        success: true,
        message: "Lịch sử thanh toán đã được lấy thành công",
        data: payments,
      });
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy lịch sử thanh toán",
      });
    }
  };

  // Lấy trạng thái thanh toán dựa trên mã đơn hàng để hiển thị cho người dùng biết đơn hàng đã được thanh toán thành công hay chưa
  public getPaymentStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { oderId } = req.params;
      if (!oderId) {
        res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc: oderId",
        });
        return;
      }
      const payment = await this.vnpayService.getPaymentByOderId(
        Number(oderId),
      );
      if (!payment) {
        res.status(404).json({
          success: false,
          message: "Không tìm thấy thanh toán cho mã đơn hàng đã cho",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error) {
      console.error("Error fetching payment status:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy trạng thái thanh toán",
      });
    }
  };
}

export default new PaymentController();
