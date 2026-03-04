import {Star, Heart} from "lucide-react"

interface ProductProps {
    product:{
        id: number;
        name: string;
        price: number;
        originalPrice: number;
        imageUrl: string;
        color: string[];
        rating: number;
    }
}
export const ProductCard = ({product}: ProductProps) => {
    const discount = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    return (    
        <div className="border rounded-lg p-3 w-full">
            {discount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discount} %
                </span>
            )}
            <div className="mt-2">
                <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover mb-1 rounded-md" />
            </div>
            <div>
                <h4 className="text-lg font-semibold">{product.name}</h4>
            </div>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-orange-600 font-bold">{product.price.toLocaleString()} VND</span>
                {discount > 0 && (
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice.toLocaleString()} VND</span>
                )}
            </div>
            {/* Chọn thông số máy */}
            <div className="flex gap-2 mt-2">
                {product.color.map((color: string, index: number) => (
                    <button key={index} className="border rounded-full w-6 h-6" style={{ backgroundColor: color }}></button>
                ))}
            </div>
            <div className="flex justify-between gap-4 mt-2">
                <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
                <div className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500" />
                    <p className="text-sm text-black ml-1">Yêu thích</p>
                </div>
            </div>
        </div>
    );
};