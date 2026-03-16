import { useState, useEffect } from "react";
import { Product } from "../types";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";

type Props = {
    product: Product;
};

export const ProductInfo = ({ product }: Props) => {
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.id || "");
    const [selectedVariant, setSelectedVariant] = useState<string>(product.variants[0]?.id || "");
    const [showToast, setShowToast] = useState(false);

    const currentVariant = product.variants.find((v) => v.id === selectedVariant);
    const currentColor = product.colors.find((c) => c.id === selectedColor);
    
    const displayPrice = currentVariant?.price || product.price;
    const displayStock = currentVariant?.stock || product.stock;
    
    const formatPrice = (price: number) => {
        return price.toLocaleString("vi-VN") + "đ";
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: `${product.name} - ${currentVariant?.name || ""}`,
                price: displayPrice,
                originalPrice: product.originalPrice || displayPrice,
                imageUrl: product.images[0]?.url || "",
                color: currentColor?.name || selectedColor,
                quantity: 1,
            })
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
                        <span className="font-medium text-sm">Đã thêm vào giỏ hàng thành công!</span>
                    </div>
                </div>
            )}

            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 pb-4 leading-tight">{product.name}</h1>
            
            <div className="flex flex-wrap items-end gap-4 pb-6 border-b border-gray-100">
                <span className="text-3xl text-orange-500 font-black">{formatPrice(displayPrice)}</span>
                {!!product.originalPrice && product.originalPrice > displayPrice && (
                    <span className="text-base text-gray-400 line-through mb-1 font-medium">{formatPrice(product.originalPrice)}</span>
                )}
            </div>
            
            <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-gray-800 text-sm uppercase tracking-wider">Màu sắc</p>
                    <span className="text-sm text-gray-500">{currentColor?.name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all 
                                ${
                                    selectedColor === color.id
                                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500 text-orange-700 font-semibold"
                                        : "border-gray-200 hover:border-orange-200 text-gray-600 bg-white"
                                }`}
                        >
                            <span 
                                className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                                style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-sm">{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="mt-8">
                <p className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Phiên bản</p>
                <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant.id)}
                            className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl border-2 transition-all min-w-[120px] ${
                                selectedVariant === variant.id
                                    ? "border-orange-500 text-orange-700 bg-orange-50 ring-1 ring-orange-500"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                            }`}
                        >
                            <span className="font-bold text-sm">{variant.name}</span>
                            <span className="text-xs mt-1 font-medium opacity-80">{formatPrice(variant.price)}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-xl inline-flex w-full sm:w-auto">
                    <span className="font-semibold text-gray-700">Trạng thái:</span>
                    {displayStock > 0 ? (
                        <div className="flex items-center gap-1.5 text-green-600">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="font-bold">Còn hàng ({displayStock})</span>
                        </div>
                    ) : (
                        <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded text-xs uppercase">Hết hàng</span>
                    )}
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                    className="flex flex-col items-center justify-center py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 border-none"
                >
                    <span className="font-bold text-lg uppercase">Mua ngay</span>
                    <span className="text-xs font-medium opacity-90">Giao hàng tận nơi</span>
                </button>
                
                <button 
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 border-none uppercase text-sm"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};