import { Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ProductProps {
    product: {
        id: number;
        name: string;
        price: number;
        originalPrice: number;
        imageUrl: string;
        color: string[];
        rating: number;
    };
}

export const ProductCard = ({ product }: ProductProps) => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(product.color[0]);
    const [isFavorite, setIsFavorite] = useState(false);

    const discount =
        product.originalPrice > product.price
            ? Math.round(
                  ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
              )
            : 0;

    const formatVND = (price: number) =>
        price.toLocaleString("vi-VN") + "đ";

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 
                       shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                       cursor-pointer flex flex-col"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold 
                                 px-2 py-1 rounded-full shadow-sm">
                    -{discount}%
                </span>
            )}

            {/* Wishlist Button */}
            <button
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm 
                           flex items-center justify-center shadow-sm border border-gray-100 
                           hover:scale-110 transition-all duration-200"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                }}
                aria-label="Yêu thích"
            >
                <Heart
                    className={`w-4 h-4 transition-colors duration-200 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                />
            </button>

            {/* Image — mix-blend-multiply hòa nền trắng của ảnh vào nền card */}
            <div className="relative overflow-hidden bg-white aspect-square">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 mix-blend-multiply
                               group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                {/* Product Name */}
                <h4 className="text-sm font-semibold text-gray-800 leading-tight 
                               line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                    {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                                star <= Math.round(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200 fill-gray-200"
                            }`}
                        />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                        ({product.rating})
                    </span>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-0.5 mt-auto">
                    <span className="text-orange-600 font-bold text-base leading-tight">
                        {formatVND(product.price)}
                    </span>
                    {discount > 0 && (
                        <span className="text-gray-400 line-through text-xs">
                            {formatVND(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Color Swatches */}
                <div className="flex gap-2 items-center mt-1">
                    {product.color.map((color, index) => (
                        <button
                            key={index}
                            title={color}
                            aria-label={`Màu ${color}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedColor(color);
                            }}
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-150 hover:scale-110
                                ${
                                    selectedColor === color
                                        ? "border-orange-500 scale-110"
                                        : "border-gray-200"
                                }`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        /* TODO: dispatch add to cart */
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-3 
                               bg-orange-50 text-orange-600 font-semibold text-xs rounded-xl
                               border border-orange-200 hover:bg-orange-500 hover:text-white 
                               hover:border-orange-500 transition-all duration-200 group/btn"
                    aria-label="Thêm vào giỏ hàng"
                >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};