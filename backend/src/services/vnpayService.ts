import crypto from "crypto"; // Xây dựng mã băm để bảo mật dữ liệu
import moment from "moment"; // Thư viện để xử lý thời gian, giúp tạo timestamp và định dạng ngày tháng
import qs from "qs"; // Thư viện để chuyển đổi đối tượng thành chuỗi truy vấn, giúp tạo URL cho VNPAY
import { VNPayParams } from "../types/paymentInterface";
import { vnpayConfig } from "../config/vnpay";

export class VNPayService {   
    public createdPaymentUrl(amount: number, ip: string): string {
        const date = new Date();
        const createDate = moment(date).format("YYYYMMDDHHmmss");
        const orderId = moment(date).format("HHmmss"); // Tạo orderId duy nhất dựa trên thời gian hiện tại

        let vnp_Params: VNPayParams = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: vnpayConfig.tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
            vnp_OrderType: "other",
            vnp_Amount: amount * 100, // VNPAY yêu cầu số tiền phải nhân với 100
            vnp_ReturnUrl: vnpayConfig.returnUrl,
            vnp_IpAddr: ip,
            vnp_CreateDate: createDate
        };

        const sortedParams = this.sortObject(vnp_Params);
        const signData = qs.stringify(sortedParams, { encode: false }); // Chuyển đổi đối tượng thành chuỗi truy vấn mà không mã hóa
        const hmac = crypto.createHmac("sha512", vnpayConfig.hashSecret); // Tạo mã băm HMAC-SHA512 với khóa bí mật
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        return `${vnpayConfig.vnpUrl}?${qs.stringify(sortedParams)}&vnp_SecureHash=${signed}`; // Tạo URL thanh toán bằng cách kết hợp URL cơ sở, tham số đã sắp xếp và mã băm bảo mật
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const sortedKeys = Object.keys(obj).sort();
        sortedKeys.forEach((key) => {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+"); // Thay thế khoảng trắng bằng dấu cộng
        })
        return sorted;
    }
}

export default new VNPayService(); // singleton