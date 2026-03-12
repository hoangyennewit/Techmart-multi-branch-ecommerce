import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, CheckCircle, Package } from "lucide-react";
import { Header } from "../../../components/Header";
import {
    selectCartItems,
    selectCartTotal,
    clearCart,
} from "../../cart/cartSlice";

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const shippingFee = items.length > 0 ? 30000 : 0;
    const grandTotal = total + shippingFee;

    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("cod");

    // Redirect if cart is empty and not in success state
    if (items.length === 0 && !isSuccess) {
        navigate("/cart");
        return null; // Will redirect
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Giả lập đặt hàng thành công
        setIsSuccess(true);
        dispatch(clearCart());
        window.scrollTo(0, 0);
    };

    /* ── Success State ───────────────────────────────────── */
    if (isSuccess) {
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
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-200 transition-all active:scale-95"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Main Checkout Form ──────────────────────────────── */
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <Header />

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => navigate("/cart")}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Quay lại giỏ hàng"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Thanh toán</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Shipping & Payment Info */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Thông tin giao hàng</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                                <div className="space-y-1.5">
                                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                                    <input 
                                        id="fullName" type="text" name="fullName" required 
                                        value={formData.fullName} onChange={handleChange}
                                        placeholder="Nhập họ và tên" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        id="phone" type="tel" name="phone" required 
                                        value={formData.phone} onChange={handleChange}
                                        placeholder="Nhập số điện thoại" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email (Tùy chọn)</label>
                                    <input 
                                        id="email" type="email" name="email" 
                                        value={formData.email} onChange={handleChange}
                                        placeholder="Nhập email để nhận thông báo đơn hàng" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label htmlFor="address" className="text-sm font-semibold text-gray-700">Địa chỉ giao hàng <span className="text-red-500">*</span></label>
                                    <input 
                                        id="address" type="text" name="address" required 
                                        value={formData.address} onChange={handleChange}
                                        placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label htmlFor="note" className="text-sm font-semibold text-gray-700">Ghi chú (Tùy chọn)</label>
                                    <textarea 
                                        id="note" name="note" rows={3}
                                        value={formData.note} onChange={handleChange}
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Phương thức thanh toán</h2>
                            </div>

                            <div className="space-y-4">
                                {/* COD */}
                                <div 
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        paymentMethod === "cod" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-gray-200 hover:border-orange-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === "cod" ? "border-orange-500" : "border-gray-300"
                                        }`}>
                                            {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                                            <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi giao hàng</p>
                                        </div>
                                    </div>
                                    <Package className={`w-6 h-6 ${paymentMethod === "cod" ? "text-orange-500" : "text-gray-400"}`} />
                                </div>

                                {/* Transfer */}
                                <div 
                                    onClick={() => setPaymentMethod("transfer")}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        paymentMethod === "transfer" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-gray-200 hover:border-orange-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === "transfer" ? "border-orange-500" : "border-gray-300"
                                        }`}>
                                            {paymentMethod === "transfer" && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Chuyển khoản ngân hàng</p>
                                            <p className="text-sm text-gray-500">Thực hiện thanh toán vào tài khoản ngân hàng của chúng tôi</p>
                                        </div>
                                    </div>
                                    <CreditCard className={`w-6 h-6 ${paymentMethod === "transfer" ? "text-orange-500" : "text-gray-400"}`} />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-800 mb-5 pb-4 border-b border-gray-100">
                                Tóm tắt đơn hàng
                            </h2>

                            {/* Item List (Simplified) */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.color}`} className="flex gap-3">
                                        <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mb-1">Màu: {item.color}</p>
                                            <p className="text-sm font-bold text-gray-800">{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 text-sm pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-gray-500">
                                    <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} sp)</span>
                                    <span className="text-gray-800 font-medium">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Phí vận chuyển</span>
                                    <span className="text-gray-800 font-medium">{formatPrice(shippingFee)}</span>
                                </div>
                            </div>

                            <div className="py-5 flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-base">Tổng cộng</span>
                                <span className="text-2xl font-black text-orange-500">
                                    {formatPrice(grandTotal)}
                                </span>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form" // Triggers form submission above
                                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95
                                           text-white font-bold py-4 rounded-2xl text-lg uppercase tracking-wide
                                           shadow-lg shadow-orange-200 transition-all duration-150 flex justify-center items-center gap-2"
                            >
                                Đặt hàng
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
