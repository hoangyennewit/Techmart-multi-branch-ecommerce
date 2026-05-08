import { access } from "node:fs";

export const momoConfig = {
    partnerCode: process.env.MOMO_PARTNER_CODE || '',
    accessKey: process.env.MOMO_ACCESS_KEY || '',
    secrectKey: process.env.MOMO_SECRET_KEY || '',
    endpoint: process.env.MOMO_ENDPOINT || '',
    redirectUrl: "http://localhost:5173/payment/momo", // Trang redirect sau khi thanh toán thành công
    ipnUrl: "https://your-ngrook-url.ngrok-free.app/api/payment/momo/ipn", // URL nhận thông báo từ MoMo
}