import {Request, Response} from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const user = (req as any).user;
            const userId = user ?.id || user?.ma_nguoi_dung;
            if(!userId) {
                res.status(401).json({
                    message: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập để tiếp tục."
                })
            }
            const orderData = {
                ...req.body,
                userId: userId
            }
            if (!orderData.items || orderData.items.length === 0) {
                res.status(400).json({ message: "Giỏ hàng trống!" });
                return;
            }
            const newOrderId = await this.orderService.createOrder(orderData);
            res.status(201).json({
                success: true,
                message: "Đơn hàng đã được tạo thành công",
                orderId: newOrderId
            });
        }
        catch (error) {
            console.error("Lỗi ở OrderController - createOrder:", error);
            res.status(500).json({
                message: "Đã có lỗi Server xảy ra khi tạo đơn hàng. Vui lòng thử lại sau."
            })
        }
    }

    public getMyOrdersService = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            const userId = user ?.id || user?.ma_nguoi_dung;
            if (!userId) {
                res.status(401).json({
                    message: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập để tiếp tục."
                });
                return;
            }
            const orders = await this.orderService.getMyOrdersService(Number(userId));
            res.status(200).json(orders);
        }
        catch (error) {
            console.error("Lỗi ở OrderController - getMyOrdersService:", error);
            res.status(500).json({
                message: "Đã có lỗi Server xảy ra khi lấy đơn hàng của người dùng. Vui lòng thử lại sau."
            })
        }
    }
}