import { StaffOrderService } from "../services/staff/staffOrderService";
import { Request, Response } from "express";

export class StaffOrderController {
    private staffOrderService: StaffOrderService;

    constructor() {
        this.staffOrderService = new StaffOrderService();
    }

    // 1. LẤY DANH SÁCH ĐƠN HÀNG CHỜ XỬ LÝ (CÓ LỌC & PHÂN TRANG)
    public getOrders = async (req: Request, res: Response) => {
        try {
            const queryParams = req.query;
            const orders = await this.staffOrderService.getOrdersForProcessing(queryParams as any);
            res.status(200).json({
                success: true,
                data: orders.data,
                pagination: orders.pagination
            });
        }
        catch (error: any) {
            console.error("Lỗi ở StaffOrderController - getOrders:", error);
            res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
        }
    }

    //2. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (XỬ LÝ, HOÀN THÀNH, HỦY)
    public updateOrderStatus = async (req: Request, res: Response) => {
        try {
            const orderId = Number(req.params.id);
            const updateData = req.body;

            if (isNaN(orderId)) {
                res.status(400).json({ message: "ID đơn hàng không hợp lệ" });
                return;
            }
            const result = await this.staffOrderService.updateOrderStatus(orderId, updateData);
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error: any) {
            console.error("Lỗi ở StaffOrderController - updateOrderStatus:", error);
            res.status(500).json({ message: "Lỗi khi cập nhật trạng thái đơn hàng" });
        }
    }

    // 3. LẤY CHI TIẾT ĐƠN HÀNG THEO ID
    public getOrderDetailsById = async (req: Request, res: Response) => {
        try {
            const orderId = Number(req.params.id);
            if (isNaN(orderId)) {
                res.status(400).json({ message: "ID đơn hàng không hợp lệ" });
                return;
            }
            
            const orderDetails = await this.staffOrderService.getOrderDetailsById(orderId);
            res.status(200).json({
                success: true,
                data: orderDetails
            });
        }
        catch (error: any) {
            console.error("Lỗi ở StaffOrderController - getOrderDetailsById:", error);
            res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
        }
    }
}

export default new StaffOrderController();