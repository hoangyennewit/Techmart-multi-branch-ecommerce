import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { CheckCircle2, ShoppingCart, Gift, ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";
import { useAuth } from "../../auth/store/AuthContext";
import { savePendingCartItem } from "../../../utils/redirectStateManager";

type Props = {
  product: Product;
};

export const ProductInfo = ({ product }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.id || "",
  );
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0]?.id || "",
  );
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setSelectedColor(product.colors?.[0]?.id || "");
    setSelectedVariant(product.variants?.[0]?.id || "");
  }, [product.id, product.colors, product.variants]);

  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  const currentColor = product.colors.find((c) => c.id === selectedColor);

  const displayPrice = currentVariant?.price || product.price;
  const displayStock = currentVariant?.stock || product.stock;
  const isOutOfStock = displayStock <= 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const calculateDiscount = (originalPrice?: number, currentPrice?: number) => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const discountPercent = calculateDiscount(product.originalPrice, displayPrice);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    if (!isAuthenticated) {
      const cartItem = {
        id: product.id,
        name: `${product.name} - ${currentVariant?.name || ""}`,
        price: displayPrice,
        originalPrice: product.originalPrice || displayPrice,
        imageUrl: product.images[0]?.url || "",
        color: currentColor?.name || selectedColor,
        quantity: 1,
      };
      savePendingCartItem(cartItem);
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: `${product.name} - ${currentVariant?.name || ""}`,
        price: displayPrice,
        originalPrice: product.originalPrice || displayPrice,
        imageUrl: product.images[0]?.url || "",
        color: currentColor?.name || selectedColor,
        quantity: 1,
      }),
    );
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Custom Toast */}
      {showToast && (
        <div className="absolute top-0 right-0 left-0 flex justify-center -translate-y-12 animate-[slideDown_0.3s_ease-out] z-50">
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl shadow-lg border border-green-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-medium text-sm">
              Đã thêm vào giỏ hàng thành công!
            </span>
          </div>
        </div>
      )}

      {/* Price Block */}
      <div className="flex flex-wrap items-end gap-3 pb-5">
        <span className="text-3xl lg:text-4xl text-purple-600 font-extrabold tracking-tight">
          {formatPrice(displayPrice)}
        </span>
        {!!product.originalPrice && product.originalPrice > displayPrice && (
          <span className="text-lg text-gray-500 line-through mb-1 font-medium">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-sm font-bold mb-1 border border-red-200">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Variants Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border-2 transition-all min-w-[100px] ${
                  selectedVariant === variant.id
                    ? "border-purple-600 text-purple-800 bg-purple-50 relative overflow-hidden"
                    : "border-gray-200 bg-white text-gray-600 hover:border-purple-200"
                }`}
              >
                {selectedVariant === variant.id && (
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-600"></div>
                )}
                <span className="font-bold text-sm">{variant.name}</span>
                <span className="text-[11px] mt-0.5 font-medium opacity-80">
                  {formatPrice(variant.price)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-5">
          <p className="font-semibold text-gray-800 text-sm mb-2">
            Chọn màu để xem giá: <span className="font-bold text-purple-600">{currentColor?.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all 
                                    ${
                                      selectedColor === color.id
                                        ? "border-purple-600 bg-purple-50 text-purple-800 font-semibold relative overflow-hidden"
                                        : "border-gray-200 hover:border-purple-200 text-gray-600 bg-white"
                                    }`}
              >
                {selectedColor === color.id && (
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-600"></div>
                )}
                <span
                  className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Promotions Box */}
      <div className="mt-6 border border-red-200 rounded-xl bg-white overflow-hidden relative shadow-sm">
          <div className="bg-red-50 text-red-600 px-4 py-2 border-b border-red-200 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase">Khuyến mãi & Ưu đãi</h3>
          </div>
          <div className="p-4 bg-white text-sm text-gray-700 space-y-2">
              <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">1</div>
                  <p>Giảm ngay <span className="font-bold text-red-500">200.000đ</span> khi thanh toán qua ZaloPay.</p>
              </div>
              <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">2</div>
                  <p>Tặng gói bảo hành VIP 1 đổi 1 trong 12 tháng.</p>
              </div>
              <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">3</div>
                  <p>Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng.</p>
              </div>
          </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          disabled={isOutOfStock}
          className={`w-full flex flex-col items-center justify-center py-4 rounded-xl shadow-lg transition-all border-none
                         ${
                           isOutOfStock
                             ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                             : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 active:scale-95"
                         }`}
        >
          <span className="font-black text-xl uppercase">Mua ngay</span>
          <span className="text-sm font-medium opacity-90">
            {isOutOfStock ? "Vui lòng quay lại sau" : "(Giao hàng tận nơi hoặc lấy tại cửa hàng)"}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-3">
            <button
              disabled={isOutOfStock}
              className={`flex flex-col items-center justify-center py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-200 transition-all active:scale-95 border-none
                            ${
                              isOutOfStock
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200 active:scale-95"
                            }`}
            >
              <span className="uppercase text-sm">Trả góp 0%</span>
              <span className="text-[11px] opacity-90 font-normal">Qua thẻ tín dụng</span>
            </button>
            
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex flex-col items-center justify-center py-2 bg-white border border-purple-500 text-purple-600 hover:bg-purple-50 hover:text-purple-700 font-bold rounded-xl shadow-sm transition-all active:scale-95
                            ${
                              isOutOfStock
                                ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50 hover:bg-gray-50"
                                : ""
                            }`}
            >
              <span className="flex items-center gap-1 uppercase text-sm"><ShoppingCart className="w-4 h-4" /> Thêm vào giỏ</span>
              <span className="text-[11px] opacity-90 font-normal">Mua tiếp sản phẩm khác</span>
            </button>
        </div>
      </div>
    </div>
  );
};
