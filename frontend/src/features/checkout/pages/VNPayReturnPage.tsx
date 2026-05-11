import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight, Receipt, Loader2 } from "lucide-react";
import { Header } from "../../../components/Header";

export const VNPayReturnPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    // 1. Lấy các tham số từ URL do VNPay trả về
    const responseCode = searchParams.get("vnp_ResponseCode");
    const orderId = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");
    const transactionNo = searchParams.get("vnp_TransactionNo");

    useEffect(() => {
        // Kiểm tra mã phản hồi (00 là thành công theo chuẩn VNPay)
        // Đặt timeout nhỏ để tạo hiệu ứng loading cho mượt mắt
        const verifyPayment = setTimeout(() => {
            if (responseCode === "00") {
                setStatus("success");
            } else {
                setStatus("error");
            }
        }, 800);

        return () => clearTimeout(verifyPayment);
    }, [responseCode]);

    // Hàm format tiền (Lưu ý: VNPay luôn nhân 100 vào số tiền, nên ta phải chia lại cho 100)
    const formatPrice = (price: string | null) => {
        if (!price) return "0đ";
        const realAmount = parseInt(price) / 100;
        return realAmount.toLocaleString("vi-VN") + "đ";
    };

    /* ── GIAO DIỆN CHỜ XÁC MINH ───────────────────────────────────── */
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">Đang xác minh giao dịch...</h2>
                    <p className="text-gray-500 mt-2">Vui lòng không đóng trình duyệt lúc này</p>
                </div>
            </div>
        );
    }

    /* ── GIAO DIỆN THẤT BẠI ───────────────────────────────────────── */
    if (status === "error") {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
                        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-12 h-12" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán thất bại</h1>
                        <p className="text-gray-500 mb-8">
                            Giao dịch đã bị hủy hoặc có lỗi xảy ra trong quá trình thanh toán (Mã lỗi: {responseCode}).
                        </p>
                        <button
                            onClick={() => navigate("/checkout")}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-colors"
                        >
                            Thử thanh toán lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── GIAO DIỆN THÀNH CÔNG (BIÊN LAI) ──────────────────────────── */
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full">
                    
                    {/* Header Thành Công */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-8 border-green-50 animate-[bounce_0.5s_ease-out]">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Thanh toán thành công!</h1>
                        <p className="text-gray-500">Cảm ơn bạn đã mua sắm tại TechMart.</p>
                    </div>

                    {/* Chi tiết giao dịch (Đóng khung giống biên lai) */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-800 font-bold mb-4 pb-4 border-b border-gray-200">
                            <Receipt className="w-5 h-5" />
                            <h3>Thông tin giao dịch</h3>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Mã đơn hàng</span>
                                <span className="font-semibold text-gray-800">{orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Mã giao dịch VNPay</span>
                                <span className="font-semibold text-gray-800">{transactionNo}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phương thức</span>
                                <span className="font-semibold text-blue-600">Chuyển khoản (VNPAY)</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-gray-500">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-orange-600">{formatPrice(amount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Các nút điều hướng */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate("/orders")}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Xem đơn hàng của bạn
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 transition-all active:scale-95"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
