import { Request, Response } from "express";
import { VNPayService } from "../services/payment/vnpayService";
import { ZaloPayService } from "../services/payment/zalopayService";
import { CreatePaymentEntity } from "../models/Payment";
import moment from "moment";

export class PaymentController {
  private vnpayService: VNPayService;
  private zalopayService: ZaloPayService;

  constructor() {
    this.vnpayService = new VNPayService();
    this.zalopayService = new ZaloPayService();
  }
  // ==========================================
  // VNPAY METHODS
  // ==========================================
  public createPaymentIntent = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { amount, orderId } = req.body;

      let ip = req.headers["x-forwarded-for"] as string;

      if (ip) ip = ip.split(",")[0];
      else ip = req.socket.remoteAddress || "127.0.0.1";

      // ❌ BẮT BUỘC FIX IP PRIVATE / DOCKER
      if (
          ip.startsWith("172.") ||
          ip.startsWith("10.") ||
          ip.startsWith("192.168.") ||
          ip.includes("::ffff:")
      ) {
          ip = "127.0.0.1";
      }

      // let ip = (req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "127.0.0.1").split(",")[0].trim();
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

  public vnpayReturn = async (req: Request, res: Response): Promise<void> => {
    try {

        console.log("===== RAW QUERY =====");
        console.log(JSON.stringify(req.query, null, 2));
        console.log("QUERY KEYS COUNT:", Object.keys(req.query).length);
        // ✅ FIX 1: ép toàn bộ query về string (QUAN TRỌNG)
        const vnpayParams: any = {};
        for (const key in req.query) {
            vnpayParams[key] = String(req.query[key]);
        }

        // ✅ FIX 2: verify NGAY TẠI ĐÂY (trước khi xử lý)
        const isValid = this.vnpayService.verifyReturn({ ...vnpayParams });

        if (!isValid) {
            res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
            return;
        }

        // ✅ xử lý tiếp nếu hợp lệ
        const result = await this.vnpayService.processIpn(vnpayParams);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error handling VNPAY return:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi xử lý VNPAY return"
        });
    }
};

  // ==========================================
  // ZALOPAY METHODS
  // ==========================================

  /**
   * Tạo lượt thanh toán ZaloPay
   */
  public createZaloPayPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount, orderId } = req.body;
      console.log("===== ZALOPAY CREATE =====");
      console.log("AMOUNT:", amount);
      console.log("ORDER ID:", orderId);

      if (!amount || !orderId) {
        res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng" });
        return;
      }

      const result = await this.zalopayService.createOrder(Number(amount), Number(orderId));
      console.log("ZALOPAY RESULT:", JSON.stringify(result, null, 2));

      if (result.return_code === 1) {
        res.status(200).json({
          success: true,
          message: "Tạo đơn hàng ZaloPay thành công",
          url: result.order_url,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.return_message || "ZaloPay từ chối tạo đơn hàng"
        });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Lỗi hệ thống khi tạo đơn hàng ZaloPay" });
    }
  };

  /**
   * Hứng Callback từ ZaloPay (Xử lý IPN cho ZaloPay)
   */
  public handleZaloPayCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      // ZaloPay đẩy dữ liệu qua POST Body
      const result = await this.zalopayService.processCallback(req.body);
      
      // ZaloPay yêu cầu trả về Object return_code đúng chuẩn để xác nhận
      res.status(200).json(result);
    } catch (error) {
      console.error("Error handling ZaloPay callback:", error);
      res.status(200).json({ return_code: 0, return_message: "Internal Server Error" });
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

  public zaloPayReturn = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("===== ZALOPAY RETURN =====");
      
      const result = await this.zalopayService.processReturn(req.query);
      
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

      if (result.success) {
        // Cập nhật thành công -> Chuyển hướng về trang Orders
        res.redirect(`${frontendUrl}/orders`);
      } else {
        // Thất bại -> Chuyển hướng về trang Cart hoặc báo lỗi
        res.redirect(`${frontendUrl}/cart?error=payment_failed`);
      }
    } catch (error) {
      console.error("Error handling ZaloPay return:", error);
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      res.redirect(`${frontendUrl}/cart?error=server_error`);
    }
  };
}

export default new PaymentController();
