import { Request, Response } from "express";
import { VNPayService } from "../services/vnpayService";

export class PaymentController {
    private vnpayService: VNPayService;

    constructor() {
        this.vnpayService = new VNPayService();
    }

    public createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
        try{
            const { amount, orderId } = req.body; 
            let ip = req.headers["x-forwarded-for"]?.toString() || "127.0.0.1";
            const txnRef = orderId ? orderId.toString() : new Date().getTime().toString();
            
            const paymentUrl = this.vnpayService.createdPaymentUrl(
                Number(amount),
                ip,
                txnRef
            ) 
            res.status(200).json({
                success: true,
                message: "URL thanh toán đã được tạo thành công",
                paymentUrl
            });
        }   
        catch (error) {
            console.error("Error creating payment intent:", error);
            res.status(500)
                .json({
                    success: false,
                    message: "Lỗi khi tạo URL thanh toán",
                });
        }
    }
}