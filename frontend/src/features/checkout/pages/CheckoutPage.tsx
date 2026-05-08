import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../auth/store/AuthContext";
// Import các Component con đã tách
import { CheckoutSuccess } from "../components/CheckoutSuccess";
import { ShippingForm, CheckoutFormData } from "../components/ShippingForm";
import { OrderSummary } from "../components/OrderSummary";
import { Header } from "../../../components/Header";
// Import Redux actions
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../cart/cartSlice";
// Import API function
import { createPayment } from "../../payments/api/paymentApi";
import { createOrder } from "../../orders/api/orderApi";
import { saveRedirectState } from "../../../utils/redirectStateManager";
export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Dữ liệu từ Redux
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const shippingFee = items.length > 0 ? 30000 : 0;
  const grandTotal = total + shippingFee;

  // Quản lý State
  const [isSuccess, setIsSuccess] = useState(false);

  // Check authentication - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Save current URL and cart items before redirecting to login
      saveRedirectState("/checkout", items);
      navigate("/login", { replace: true });
      return;
    }
  }, [isAuthenticated, navigate, items]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  // Xử lý chuyển hướng an toàn nếu giỏ hàng trống (Sử dụng useEffect thay vì gọi thẳng)
  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, isSuccess, navigate]);

  // Các hàm xử lý
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderPayload = {
        items: items,
        totalAmount: total,
        shippingFee: shippingFee,
        shippingInfo: formData,
        paymentMethod: paymentMethod,
        userId: user?.ma_nguoi_dung, // NÂNG CẤP CHẶN KHÁCH VÃNG LAI CHƯA ĐĂNG NHẬP, CÓ THỂ LÀM SAO ĐÓ KHÁC ĐỂ VẪN CHO PHÉP KHÁCH VÃNG LAI MUA HÀNG NHƯ TRƯỚC ĐÂY
      };
      const dbResponse = await createOrder(orderPayload);
      const realOrderId = dbResponse.orderId || `ORDER${Date.now()}`;

      if (paymentMethod === "transfer") {
        try {
          const data = await createPayment({
            amount: grandTotal,
            orderId: realOrderId.toString(),
          });
          if (data && data.url) {
            window.location.href = data.url; // Chuyển hướng người dùng đến trang thanh toán của VNPAY
          }
        } catch (error) {
          console.error("Error creating payment:", error);
          alert("Đã có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.");
        }
      } else {
        setIsSuccess(true);
        dispatch(clearCart());
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
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
