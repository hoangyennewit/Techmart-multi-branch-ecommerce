import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { Header } from "../../../components/Header";
import { useAuth } from "../../auth/store/AuthContext";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../cartSlice";
import { saveRedirectState } from "../../../utils/redirectStateManager";

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Save current URL and cart items before redirecting to login
      console.log("🔴 User not authenticated, saving redirect state");
      console.log("📦 Cart items:", items);
      saveRedirectState("/cart", items);
      alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const shippingFee = items.length > 0 ? 30000 : 0;
  const grandTotal = total + shippingFee;

  /* ── Empty state ─────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center px-4">
          <div className="w-28 h-28 rounded-full bg-orange-50 flex items-center justify-center">
            <ShoppingCart className="w-14 h-14 text-orange-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700">Giỏ hàng trống</h2>
          <p className="text-gray-400 max-w-xs">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và mua sắm
            ngay!
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95
                                   text-white font-semibold px-7 py-3 rounded-full shadow-lg
                                   shadow-orange-200 transition-all duration-150"
          >
            <ShoppingBag className="w-5 h-5" />
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  /* ── Main cart ───────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Page heading */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Giỏ hàng
            <span className="ml-2 text-base font-normal text-gray-400">
              ({items.length} sản phẩm)
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: item list ───────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Clear all */}
            <div className="flex justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tất cả
              </button>
            </div>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 shadow-sm border border-gray-100
                                           hover:shadow-md transition-shadow duration-200"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Màu: <span className="text-gray-600">{item.color}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* Price */}
                    <div>
                      <span className="text-orange-500 font-bold text-base sm:text-lg">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls + delete */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              color: item.color,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                           bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                                                           transition-colors"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              color: item.color,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                           bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-3.5 h-3.5 text-gray-600" />
                      </button>

                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({ id: item.id, color: item.color }),
                          )
                        }
                        className="ml-1 w-8 h-8 rounded-full flex items-center justify-center
                                                           bg-red-50 hover:bg-red-100 transition-colors"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: order summary ───────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-5 pb-4 border-b border-gray-100">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>
                    Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} sp)
                  </span>
                  <span className="text-gray-800 font-medium">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span className="text-gray-800 font-medium">
                    {formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Giảm giá</span>
                  <span className="text-green-500 font-medium">-0đ</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-800">Tổng cộng</span>
                <span className="text-xl font-extrabold text-orange-500">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 active:scale-95
                                           text-white font-bold py-4 rounded-2xl text-base
                                           shadow-lg shadow-orange-200 transition-all duration-150"
              >
                Tiến hành thanh toán
              </button>

              <button
                onClick={() => navigate("/")}
                className="mt-3 w-full text-sm text-gray-400 hover:text-orange-500
                                           py-2 transition-colors"
              >
                ← Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
