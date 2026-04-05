import dotenv from "dotenv";
dotenv.config();

export const vnpayConfig = {
    tmnCode: process.env.vnp_TmnCode || '2QX1S61I', // Mã website do VNPAY cấp, dùng để xác định người gửi yêu cầu thanh toán
    hashSecret: process.env.vnp_HashSecret || 'GGLTCOFNYREUZZUFCYOVYVREZYBJHZUX', // Chuỗi bí mật để tạo mã băm
    vnpUrl: process.env.vnp_Url || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', // URL của VNPAY để gửi yêu cầu thanh toán
    returnUrl: process.env.vnp_ReturnUrl || 'http://localhost:5000/api/payment/vnpay_return', // URL trả về sau khi thanh toán
};