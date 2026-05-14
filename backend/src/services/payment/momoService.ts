import crypto from "crypto";
import axios from "axios";
import { momoConfig } from "../../config/momo";
import Payment from "../../models/Payment";
import { CreatePaymentRequestDTO, PaymentResponseDTO } from "../../dtos/paymentDto";

// ============================================================
// TYPES
// ============================================================

interface MomoCreateResponse {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  shortLink: string;
}

interface MomoIpnBody {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  orderInfo: string;
  orderType: string;
  transId: number;
  resultCode: number;
  message: string;
  payType: string;
  responseTime: number;
  extraData: string;
  signature: string;
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Tạo chữ ký HMAC-SHA256
 * Thứ tự các field bắt buộc theo đúng tài liệu MoMo
 */
function createSignature(rawData: string): string {
  return crypto
    .createHmac("sha256", momoConfig.secretKey)
    .update(rawData)
    .digest("hex");
}

/**
 * Xác minh signature từ MoMo callback/IPN
 */
function verifySignature(body: MomoIpnBody): boolean {
  const rawSignature =
    `accessKey=${momoConfig.accessKey}` +
    `&amount=${body.amount}` +
    `&extraData=${body.extraData}` +
    `&message=${body.message}` +
    `&orderId=${body.orderId}` +
    `&orderInfo=${body.orderInfo}` +
    `&orderType=${body.orderType}` +
    `&partnerCode=${body.partnerCode}` +
    `&payType=${body.payType}` +
    `&requestId=${body.requestId}` +
    `&responseTime=${body.responseTime}` +
    `&resultCode=${body.resultCode}` +
    `&transId=${body.transId}`;

  const expected = createSignature(rawSignature);
  return expected === body.signature;
}

// ============================================================
// SERVICE
// ============================================================

export const momoService = {

  /**
   * Tạo link thanh toán MoMo và lưu bản ghi thanh_toan vào DB
   */
  async createPayment(dto: CreatePaymentRequestDTO): Promise<PaymentResponseDTO> {
    const { ma_don_hang, tong_tien, ghi_chu } = dto;

    const requestId = `${momoConfig.partnerCode}-${Date.now()}`;
    const orderId   = `ORDER-${ma_don_hang}-${Date.now()}`;
    const orderInfo = ghi_chu || `Thanh toán đơn hàng #${ma_don_hang}`;
    const extraData = "";

    const rawSignature =
      `accessKey=${momoConfig.accessKey}` +
      `&amount=${tong_tien}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${momoConfig.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${momoConfig.partnerCode}` +
      `&redirectUrl=${momoConfig.redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=payWithMethod`;

    const signature = createSignature(rawSignature);

    const requestBody = {
      partnerCode: momoConfig.partnerCode,
      accessKey:   momoConfig.accessKey,
      requestId,
      amount:      tong_tien,
      orderId,
      orderInfo,
      redirectUrl: momoConfig.redirectUrl,
      ipnUrl:      momoConfig.ipnUrl,
      extraData,
      requestType: "payWithMethod",
      signature,
      lang:        "vi",
    };

    // ✅ LOG để debug
    console.log("===== MOMO CONFIG =====");
    console.log("partnerCode:", momoConfig.partnerCode);
    console.log("accessKey:", momoConfig.accessKey);
    console.log("secretKey:", momoConfig.secretKey ? "OK" : "MISSING");
    console.log("endpoint:", momoConfig.endpoint);
    console.log("ipnUrl:", momoConfig.ipnUrl);
    console.log("redirectUrl:", momoConfig.redirectUrl);
    console.log("===== MOMO REQUEST BODY =====");
    console.log(JSON.stringify(requestBody, null, 2));

    try {
      const { data } = await axios.post<MomoCreateResponse>(
        momoConfig.endpoint,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("===== MOMO RESPONSE =====");
      console.log(JSON.stringify(data, null, 2));

      if (data.resultCode !== 0) {
        throw new Error(`MoMo lỗi [${data.resultCode}]: ${data.message}`);
      }

      const payment = await Payment.create({
        ma_don_hang: Number(ma_don_hang),
        phuong_thuc: "MOMO",
        trang_thai:  "cho_xu_ly",
        ma_giao_dich: orderId,
        so_tien:     tong_tien,
      });

      return {
        paymentId:       String(payment.ma_thanh_toan),
        oderId:          orderId,
        transactionCode: requestId,
        amount:          tong_tien,
        status:          "cho_xu_ly",
        method:          "MOMO",
        paymentUrl:      data.payUrl,
        message:         data.message,
        createdAt:       payment.ngay_tao.toISOString(),
      };

    } catch (error: any) {
      // ✅ Log chi tiết lỗi axios
      if (error.response) {
        console.error("===== MOMO API ERROR =====");
        console.error("Status:", error.response.status);
        console.error("Data:", JSON.stringify(error.response.data, null, 2));
      } else {
        console.error("===== MOMO UNKNOWN ERROR =====");
        console.error(error.message);
      }
      throw error;
    }
  },

  /**
   * Xử lý IPN (callback server-to-server từ MoMo)
   * MoMo POST vào ipnUrl sau khi user thanh toán
   */
  async handleIpn(body: MomoIpnBody): Promise<{ message: string }> {
    // 1. Xác minh chữ ký
    if (!verifySignature(body)) {
      throw new Error("Chữ ký IPN không hợp lệ");
    }

    // 2. Tìm bản ghi thanh toán theo orderId
    const payment = await Payment.findOne({
      where: { ma_giao_dich: body.orderId },
    });

    if (!payment) {
      throw new Error(`Không tìm thấy thanh toán với orderId: ${body.orderId}`);
    }

    // 3. Cập nhật trạng thái
    const isSuccess = body.resultCode === 0;

    await payment.update({
      trang_thai:       isSuccess ? "thanh_cong" : "that_bai",
      ngay_thanh_toan:  isSuccess ? new Date() : null,
    });

    return { message: isSuccess ? "Thanh toán thành công" : "Thanh toán thất bại" };
  },

  /**
   * Xử lý redirect (MoMo redirect user về redirectUrl)
   * Chỉ dùng để đọc kết quả, KHÔNG cập nhật DB (đã có IPN làm rồi)
   */
  async handleReturn(query: Record<string, string>): Promise<PaymentResponseDTO> {
    const { orderId, resultCode, message, amount, requestId, responseTime } = query;

    const payment = await Payment.findOne({
      where: { ma_giao_dich: orderId },
    });

    if (!payment) {
      throw new Error(`Không tìm thấy thanh toán: ${orderId}`);
    }

    return {
      paymentId:       String(payment.ma_thanh_toan),
      oderId:          orderId,
      transactionCode: requestId || "",
      amount:          Number(amount),
      status:          resultCode === "0" ? "thanh_cong" : "that_bai",
      method:          "MOMO",
      message:         message || "",
      createdAt:       payment.ngay_tao.toISOString(),
    };
  },
};