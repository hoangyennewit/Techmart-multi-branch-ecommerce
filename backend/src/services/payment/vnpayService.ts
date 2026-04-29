import crypto from "crypto";
import moment from "moment";
import { vnpayConfig } from "../../config/vnpay";
import { Payment } from "../../models/Payment";
import { CreatePaymentEntity } from "../../models/Payment";

export class VNPayService {

    // =========================
    // BUILD QUERY (CHUẨN VNPAY)
    // =========================
    private buildQuery(obj: Record<string, any>): string {
        return Object.keys(obj)
            .sort()
            .map(key => `${key}=${obj[key]}`)  // KHÔNG encode gì cả
            .join("&");
    }

    // =========================
    // CREATE PAYMENT URL
    // =========================
    public createdPaymentUrl(amount: number, ip: string, txnRef: string): string {
    const createDate = moment().format("YYYYMMDDHHmmss");

    const vnp_Params: Record<string, any> = {
        vnp_Version:    "2.1.0",
        vnp_Command:    "pay",
        vnp_TmnCode:    vnpayConfig.tmnCode,
        vnp_Locale:     "vn",
        vnp_CurrCode:   "VND",
        vnp_TxnRef:     txnRef,
        vnp_OrderInfo:  "Thanh toan don hang",
        vnp_OrderType:  "other",
        vnp_Amount:     amount * 100,
        vnp_ReturnUrl:  vnpayConfig.returnUrl,
        vnp_IpAddr:     ip,
        vnp_CreateDate: createDate,
    };

    // ✅ Hash dùng chuỗi KHÔNG encode
    const signData = this.buildQuery(vnp_Params);
    const secureHash = crypto
        .createHmac("sha512", vnpayConfig.hashSecret.trim())
        .update(signData, "utf-8")
        .digest("hex");

    console.log("===== VNPAY CREATE =====");
    console.log("SIGN DATA:", signData);
    console.log("HASH:", secureHash);

    // ✅ URL thực tế dùng qs để encode đúng cho browser
    const queryString = require("qs").stringify(
        { ...vnp_Params, vnp_SecureHash: secureHash },
        { encode: true }
    );

    return `${vnpayConfig.vnpUrl}?${queryString}`;
}

    // =========================
    // VERIFY RETURN / IPN
    // =========================
    public verifyReturn(vnpayParams: Record<string, any>): boolean {
        const params = { ...vnpayParams };
        const secureHash = params.vnp_SecureHash;
        delete params.vnp_SecureHash;
        delete params.vnp_SecureHashType;

        // ✅ Hash dùng chuỗi KHÔNG encode (giống lúc tạo)
        const signData = this.buildQuery(params);
        const signed = crypto
            .createHmac("sha512", vnpayConfig.hashSecret.trim())
            .update(signData, "utf-8")
            .digest("hex");

        console.log("===== VNPAY VERIFY =====");
        console.log("SIGN DATA:", signData);
        console.log("VNPAY HASH:", secureHash);
        console.log("LOCAL HASH:", signed);
        console.log("MATCH:", secureHash === signed);

        return secureHash === signed;
    }

    // =========================
    // IPN PROCESS
    // =========================
    public async processIpn(vnpayParams: any): Promise<any> {
        // verifyReturn đã clone nội bộ, không cần spread ở đây nữa
        const isValid = this.verifyReturn(vnpayParams);

        if (!isValid) {
            return { success: false, message: "Invalid signature" };
        }

        const responseCode    = vnpayParams.vnp_ResponseCode;
        const txnRef          = vnpayParams.vnp_TxnRef;
        const transactionCode = vnpayParams.vnp_TransactionNo;
        const orderId         = Number(txnRef);
        const status          = responseCode === "00" ? "thanh_cong" : "that_bai";

        await this.updatePaymentStatus(orderId, transactionCode, status);

        return {
            success: status === "thanh_cong",
            message: status === "thanh_cong"
                ? "Thanh toán thành công"
                : "Thanh toán thất bại",
        };
    }

    // =========================
    // DB FUNCTIONS
    // =========================
    public async savePayment(paymentData: CreatePaymentEntity) {
        return await Payment.create({
            ma_don_hang: paymentData.ma_don_hang,
            phuong_thuc: paymentData.phuong_thuc,
            trang_thai: "cho_xu_ly",
            ma_giao_dich: paymentData.ma_giao_dich,
            so_tien: paymentData.so_tien,
        });
    }

    public async getPaymentHistory() {
        return await Payment.findAll({
            order: [["ngay_tao", "DESC"]],
        });
    }

    public async getPaymentByOderId(orderId: number) {
        return await Payment.findOne({
            where: { ma_don_hang: orderId },
        });
    }

    public async updatePaymentStatus(
        orderId: number,
        transactionCode: string,
        status: "thanh_cong" | "that_bai"
    ) {
        return await Payment.update(
            {
                trang_thai: status,
                ma_giao_dich: transactionCode,
                ngay_thanh_toan:
                    status === "thanh_cong" ? new Date() : null,
            },
            {
                where: { ma_don_hang: orderId },
            }
        );
    }
}

export default new VNPayService();