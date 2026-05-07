import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Header } from "../../../components/Header";

export const CheckoutSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border-8 border-green-50 animate-[bounce_0.5s_ease-out]">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-3">Đặt hàng thành công!</h1>
                <p className="text-gray-500 max-w-md mb-8 text-lg">
                    Cảm ơn bạn đã mua sắm tại TechMart. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate("/orders")}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-200 transition-all active:scale-95"
                    >
                        Theo dõi đơn hàng
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-8 rounded-full shadow-sm border border-gray-200 transition-all active:scale-95"
                    >
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    );
};
