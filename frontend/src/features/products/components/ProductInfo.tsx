import { useState } from "react";
import {Product} from "../types";
import {ShoppingCart, Plus} from "lucide-react"

type Props = {
    product: Product; 
}

export const ProductInfo = ({product}: Props) => {
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.id || '');
    const [selectedVariant, setSelectedVariant] = useState<string>(product.variants[0]?.id || '');

    const currentVariant = product.variants.find(variant => variant.id === selectedVariant)
    const displayPrice = currentVariant?.price || product.price;
    const displayStock = currentVariant?.stock || product.stock;
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 pb-4">{product.name}</h1>
            <div className="flex items-end gap-4 pb-4 boder-b">
                <span className="text-3xl text-orange-500 font-bold">{formatPrice(displayPrice)}</span>
                {product.originalPrice && product.originalPrice > displayPrice &&
                (
                    <span className="text-sm text-gray-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
                )}
            </div>
            <div className="mt-2">
                <p className="font-semibold text-gray-800 mb-2">Màu sắc</p>
                <div className="flex gap-2">
                    {product.colors.map((color)=>(
                        <button
                            key={color.id}
                            onClick={() =>setSelectedColor(color.id)}
                            className={`w-8 h-8 rounded-full border-2 transition-all 
                                ${selectedColor === color.id 
                                    ? "border-blue-500 ring-2 ring-blue-200" 
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <p className="font-semibold text-gray-800 mb-2">Phiên bản</p>
                <div className="flex gap-5">
                    {product.variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick ={() => setSelectedVariant(variant.id)}
                            className={`w-25 h-14 rounded-xl border-2 transition-all font-semibold ${
                                selectedVariant === variant.id
                                    ?'border-blue-500 text-blue-600 bg-blue-50'
                                    :'border-gray-300  bg-blue-50 text-gray-700 hover:border-gray-50'
                            }`}
                        >
                            {variant.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="text-sm mt-4">
                <span className="text-green-400 font-medium">Trạng thái: </span>
                {displayStock > 0 ? (
                    <span className="text-green-400 font-medium">Còn hàng ({displayStock} sản phẩm)</span>
                ) : (
                    <span className="text-red-500 font-medium">Hết hàng</span>
                )}
            </div>
            <div className="flex mt-4 gap-4 items-center">
                <ShoppingCart className="w-10 h-10"/>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-300 hover:bg-gray-200 text-gray-800 font-semibold rounded-md border border-gray-300 transition-colors">
                    THÊM VÀO GIỎ HÀNG
                </button>
            </div>
            <div className="mt-4">
                <button className="flex text-3xl items-center justify-center gap-2 px-4 py-3 bg-orange-400 hover:bg-gray-200 text-amber-50 font-bold rounded-2xl border border-gray-300 transition-color">
                    MUA NGAY
                </button>
            </div>
        </div>
    );
};