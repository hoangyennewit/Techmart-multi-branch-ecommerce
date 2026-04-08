import {Request, Response} from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderData = req.body;
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
            console.error("Lỗi khi tạo đơn hàng:", error);
            res.status(500).json({
                message: "Đã có lỗi Server xảy ra khi tạo đơn hàng. Vui lòng thử lại sau."
            })
        }
    }

    public getMyOrdersService = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.query.userId;
            const orders = await this.orderService.getMyOrdersService(Number(userId));
            res.status(200).json(orders);
        }
        catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error);
            res.status(500).json({
                message: "Đã có lỗi Server xảy ra khi lấy đơn hàng của người dùng. Vui lòng thử lại sau."
            })
        }
    }
}