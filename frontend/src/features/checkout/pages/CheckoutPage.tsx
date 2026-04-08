import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Import các Component con đã tách
import { CheckoutSuccess } from "../components/CheckoutSuccess";
import { ShippingForm, CheckoutFormData } from "../components/ShippingForm";
import { OrderSummary } from "../components/OrderSummary";
import { Header } from "../../../components/Header";

// Import Redux actions
import { selectCartItems, selectCartTotal, clearCart } from "../../cart/cartSlice";
import { placeOrder } from "../../orders/orderSlice";

import { createPayment } from "../../payments/api/paymentApi";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Dữ liệu từ Redux
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const shippingFee = items.length > 0 ? 30000 : 0;
    const grandTotal = total + shippingFee;

    // Quản lý State
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });

    // Xử lý chuyển hướng an toàn nếu giỏ hàng trống (Sử dụng useEffect thay vì gọi thẳng)
    useEffect(() => {
        if (items.length === 0 && !isSuccess) {
            navigate("/cart");
        }
    }, [items.length, isSuccess, navigate]);

    // Các hàm xử lý
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const orderId = `ORD${Date.now()}`;
        dispatch(placeOrder({
            id: orderId,
            items: items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
                color: i.color,
                quantity: i.quantity,
                imageUrl: i.imageUrl
            })),
            totalAmount: total,
            shippingFee: shippingFee,
            shippingInfo: formData,
            paymentMethod,
            status: "pending",
            createdAt: new Date().toISOString()
        }));

        if(paymentMethod === "transfer") {
            try {
                const data = await createPayment({
                    amount: grandTotal,
                    orderId: orderId
                });
                if(data && data.url) {
                    window.location.href = data.url; // Chuyển hướng người dùng đến trang thanh toán của VNPAY
                }
            }
            catch (error) {
                console.error("Error creating payment:", error);
                alert("Đã có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.");
            }
        }
        else {
            setIsSuccess(true);
            dispatch(clearCart());
            window.scrollTo(0, 0);
        }
    };

    // Render giao diện thành công nếu isSuccess = true
    if (isSuccess) return <CheckoutSuccess />;

    // Render giao diện chính nếu giỏ hàng trống (trong lúc chờ useEffect chuyển hướng)
    if (items.length === 0) return null;

    const FORM_ID = "main-checkout-form"; // ID dùng chung cho Form và Nút Submit

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <Header />

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Nút Quay lại */}
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
                    {/* Cột trái: Form nhập liệu */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <ShippingForm 
                            formData={formData}
                            paymentMethod={paymentMethod}
                            onChangeForm={handleChange}
                            onChangePayment={setPaymentMethod}
                            onSubmit={handleSubmit}
                            formId={FORM_ID}
                        />
                    </div>

                    {/* Cột phải: Tóm tắt đơn hàng */}
                    <div className="lg:col-span-4">
                        <OrderSummary 
                            items={items}
                            total={total}
                            shippingFee={shippingFee}
                            grandTotal={grandTotal}
                            formId={FORM_ID}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
