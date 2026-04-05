import { Request, Response } from "express";
import { VNPayService } from "../services/vnpayService";
import moment from "moment"; // Thư viện để xử lý thời gian, giúp tạo timestamp và định dạng ngày tháng

const vnpayService = new VNPayService();

export const createPaymentIntent = async (req: Request, res: Response) => {
    
}