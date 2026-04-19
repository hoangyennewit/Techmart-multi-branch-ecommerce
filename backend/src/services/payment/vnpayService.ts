import crypto from "crypto"; // Xây dựng mã băm để bảo mật dữ liệu
import moment from "moment"; // Thư viện để xử lý thời gian, giúp tạo timestamp và định dạng ngày tháng
import qs from "qs"; // Thư viện để chuyển đổi đối tượng thành chuỗi truy vấn, giúp tạo URL cho VNPAY
import { VNPayParams } from "../../interfaces/vnpayInterface";
import { vnpayConfig } from "../../config/vnpay";
import { Payment } from "../../models/Payment";
import { CreatePaymentEntity } from "../../models/Payment";

export class VNPayService {   

    public createdPaymentUrl(amount: number, ip: string, txnRef: string): string {
        const date = new Date();
        const createDate = moment(date).format("YYYYMMDDHHmmss");

        const vnp_Params: VNPayParams = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: vnpayConfig.tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: txnRef,
            vnp_OrderInfo: `Thanh toán đơn hàng ${txnRef}`,
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
        const queryParams = qs.stringify(sortedParams, { encode: false }); // Tạo chuỗi truy vấn từ đối tượng đã sắp xếp mà không mã hóa
        return `${vnpayConfig.vnpUrl}?${queryParams}&vnp_SecureHash=${signed}`; // Tạo URL thanh toán bằng cách kết hợp URL cơ sở, tham số đã sắp xếp và mã băm bảo mật
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const sortedKeys = Object.keys(obj).sort();
        sortedKeys.forEach((key) => {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+"); // Thay thế khoảng trắng bằng dấu cộng
        })
        return sorted as VNPayParams; // Trả về đối tượng đã sắp xếp và mã hóa giá trị, đảm bảo tuân thủ định dạng yêu cầu của VNPAY
    }

    public async savePayment (paymentData: CreatePaymentEntity): Promise<any> {
        try {
            const payment = await Payment.create({
                ma_don_hang: paymentData.ma_don_hang,
                phuong_thuc: paymentData.phuong_thuc,
                trang_thai: 'cho_xu_ly',
                ma_giao_dich: paymentData.ma_giao_dich,
                so_tien: paymentData.so_tien
            })
            return payment;   
        } catch (error) {
            console.error("Error saving payment:", error);
            throw error;
        }
    }

    public async getPaymentHistory(userId?: number): Promise<any> {
        try {
            const payments = await Payment.findAll({
                order: [['ngay_tao', 'DESC']],
            });
            return payments;
        }
        catch( error ) {
            console.error("Error fetching payment history:", error);
            throw error;
        }
    }

    public async getPaymentByOderId(orderId: number): Promise<any> {
        try {
            const payment = await Payment.findOne({ // Tìm kiếm thanh toán dựa trên mã đơn hàng
                where: { ma_don_hang: orderId }
            });
            return payment;
        }
        catch (error){
            console.error("Error fetching payment by order ID:", error);
            throw error;
        }
    }

    public async updatePaymentStatus(oderId: number,transactionCode: string, status: 'thanh_cong' | 'that_bai'): Promise<any> {
        try {
            const updated = await Payment.update(
                {
                    trang_thai: status,
                    ma_giao_dich: transactionCode,
                    ngay_thanh_toan: status === 'thanh_cong' ? new Date(): null,
                },
                {
                    where: { ma_don_hang: oderId }
                }
            );
            return updated;
        }
        catch (error) {
            console.error("Error updating payment status:", error);
            throw error;
        }
    }

    public async processIpn(vnpayParams: any): Promise<{ success: boolean, message: string }> {
        try {
            const responseCode = vnpayParams.vnp_ResponseCode;
            const transactionCode = vnpayParams.vnp_TransactionNo;
            const txnRef = vnpayParams.vnp_TxnRef;

            const oderId = Number(txnRef);
            const status = responseCode === "00" ? 'thanh_cong' : 'that_bai';
            await this.updatePaymentStatus(oderId, transactionCode, status);

            return {
                success: status === 'thanh_cong',
                message: status === 'thanh_cong' ? "Thanh toán thành công" : "Thanh toán thất bại"
            };
        }
        catch (error) {
            console.error("Error processing IPN:", error);
            throw error;
        }
    }
}

export default new VNPayService();