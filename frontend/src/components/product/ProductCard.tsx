import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { Product, ProductColor } from "../../features/customer/products/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/customer/cart/cartSlice";
import { useAuth } from "../../features/auth/store/AuthContext";
import { savePendingCartItem } from "../../utils/redirectStateManager";
interface ProductProps {
  product: Product;
}
const formatVND = (price: number) => price.toLocaleString("vi-VN") + "đ";
export const ProductCard = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        imageUrl: product.images?.[0]?.url || "",
        color: selectedColor?.name || "",
        quantity: 1,
      };
      console.log(
        "User not authenticated, saving pending cart item and redirecting to login",
      );
      savePendingCartItem(cartItem);
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        imageUrl: product.images?.[0]?.url || "",
        color: selectedColor?.name || "",
        quantity: 1,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100
                       shadow-sm hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1
                       cursor-pointer flex flex-col"
      onClick={() => navigate(`/products/${product.id}`)}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/products/${product.id}`)
      }
      aria-label={product.name}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <span
          className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold
                                 px-2 py-1 rounded-full shadow-sm"
        >
          -{discount}%
        </span>
      )}
      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border-gray-100
                           flex items-center justify-center shadow-sm border border-gray-100
                           hover:scale-110 transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        aria-label="Yêu thích"
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative overflow-hidden bg-white aspect-square">
        <img
          src={product.images?.[0]?.url || ""}
          alt={product.name}
          className="w-full h-full object-contain p-4 mix-blend-multiply
                               group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.png';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Product Name */}
        <h4
          className="text-sm font-semibold text-gray-800 leading-tight
                               line-clamp-2 group-hover:text-purple-400 transition-colors duration-200"
        >
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(product.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-200 fill-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-0.5 mt-auto">
          <span className="text-purple-400 font-bold text-lg leading-tight">
            {formatVND(product.price)}
          </span>
          {/* Kiểm tra originalPrice tồn tại mới hiển thị */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-500 line-through text-sm">
              {formatVND(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2.5 items-center mt-1">
          {product.colors?.map((color) => (
            <button
              key={color.id}
              title={color.name}
              aria-label={`Màu ${color.name}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-150 hover:scale-110
                                ${
                                  selectedColor?.id === color.id
                                    ? "border-purple-500 scale-110 shadow-lg shadow-purple-500/50"
                                    : "border-gray-200"
                                }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-3
                               font-semibold text-sm rounded-xl transition-all duration-200
                               ${
                                 added
                                   ? "bg-green-500 text-white border-green-500 border"
                                   : "bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                               }`}
          aria-label="Thêm vào giỏ hàng"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Đã thêm!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ
            </>
          )}
        </button>
      </div>
    </article>
  );
};




