import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import moment from 'moment';
import { zaloPayConfig } from '../../config/zalopay';
import { Payment, CreatePaymentEntity } from "../../models/Payment";

export class ZaloPayService {
    // 1. Tạo đơn hàng và lấy URL thanh toán
    public async createOrder(amount: number, orderId: number) {
        const payment = await Payment.create({
            ma_don_hang: orderId,
            phuong_thuc: 'ZALOPAY',
            so_tien: amount,
            trang_thai: 'cho_xu_ly'
        });

        const embed_data = {
            redirecturl: (process.env.BACKEND_URL || "http://localhost:5000") + "/api/payments/zalopay/return",
        };

        const items: any[] = [];
        const app_trans_id = `${moment().format('YYMMDD')}_${payment.ma_thanh_toan}`;

        const order: any = {
            app_id: Number(zaloPayConfig.app_id), // ✅ ép sang number
            app_trans_id,
            app_user: "TechStore_User",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: amount,
            description: `TechStore - Thanh toan don hang #${orderId}`,
            bank_code: "zalopayapp",
            callback_url: zaloPayConfig.callback_url
        };

        const data = [
            order.app_id, 
            order.app_trans_id, 
            order.app_user, 
            order.amount, 
            order.app_time, 
            order.embed_data, 
            order.item
        ].join('|');
        
        order.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

        const response = await axios.post(zaloPayConfig.endpoint, order);
        return response.data;
    }

    // 2. Xử lý Callback (Khi ZaloPay báo tin tiền đã về)
    public async processCallback(callbackData: any) {
        let result: any = {};

        try {
            const { data: dataStr, mac: reqMac } = callbackData;

            // Kiểm tra chữ ký từ ZaloPay gửi sang (Dùng Key 2 để verify)
            const mac = CryptoJS.HmacSHA256(dataStr, zaloPayConfig.key2).toString();

            const dataJson = JSON.parse(dataStr);
            const ma_thanh_toan = dataJson["app_trans_id"].split("_")[1];

            if (reqMac !== mac) {
                // Chữ ký không khớp (Có thể có kẻ gian can thiệp)
                await Payment.update(
                    { trang_thai: 'that_bai' },
                    { where: { ma_thanh_toan: Number(ma_thanh_toan) } }
                );
                
                result.return_code = -1;
                result.return_message = "mac not equal";
            } else {
                // Chữ ký hợp lệ -> Cập nhật Database
                const transaction_id = dataJson["zp_trans_id"]; // Mã giao dịch của ZaloPay

                await Payment.update(
                    {
                        trang_thai: 'thanh_cong',
                        ma_giao_dich: transaction_id,
                        ngay_thanh_toan: new Date()
                    },
                    { where: { ma_thanh_toan: Number(ma_thanh_toan) } }
                );

                result.return_code = 1;
                result.return_message = "success";
            }
        } catch (ex: any) {
            result.return_code = 0; // ZaloPay sẽ gọi lại sau nếu báo lỗi 0
            result.return_message = ex.message;
        }

        return result;
    }

    // 3. Các hàm hỗ trợ khác
    public async getPaymentHistory() {
        return await Payment.findAll({ order: [['ngay_tao', 'DESC']] });
    }

    public async getPaymentByOrderId(orderId: number) {
        return await Payment.findOne({ where: { ma_don_hang: orderId } });
    }

    // THÊM MỚI Ở ĐÂY: Xử lý Return từ Frontend (Khi người dùng Hủy hoặc Thanh toán lỗi)
    public async processReturn(queryParams: any) {
        try {
            const { apptransid, status } = queryParams;
            if (!apptransid) return { success: false, message: "Dữ liệu không hợp lệ" };

            const ma_thanh_toan = apptransid.split("_")[1];

            // Trạng thái '1' là thành công, các trạng thái khác là thất bại/hủy
            if (status === "1") {
                // Đề phòng trường hợp Webhook gọi chậm hơn Frontend
                await Payment.update(
                    { trang_thai: 'thanh_cong' },
                    { where: { ma_thanh_toan: Number(ma_thanh_toan), trang_thai: 'cho_xu_ly' } }
                );
                return { success: true, message: "Thanh toán thành công" };
            } else {
                // Cập nhật trạng thái THẤT BẠI nếu status khác 1
                await Payment.update(
                    { trang_thai: 'that_bai' },
                    { where: { ma_thanh_toan: Number(ma_thanh_toan), trang_thai: 'cho_xu_ly' } }
                );
                return { success: false, message: "Giao dịch đã bị hủy hoặc thất bại" };
            }
        } catch (error: any) {
            console.error("Error processing ZaloPay return:", error);
            throw error;
        }
    }
}

export default new ZaloPayService();