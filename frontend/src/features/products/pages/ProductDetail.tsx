import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import {
    ShoppingCart, Heart, Star, ChevronLeft,
    Shield, Truck, RotateCcw, Zap, Check
} from "lucide-react";

// Local mock product data (keyed by id)
const productsData: Record<number, {
    id: number; name: string; price: number; originalPrice: number;
    images: string[]; colors: { name: string; hex: string }[];
    storage: string[]; rating: number; reviewCount: number;
    specs: { label: string; value: string }[];
    description: string;
}> = {
    1: {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 28990000,
        originalPrice: 33990000,
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png",
        ],
        colors: [
            { name: "Titan Đen", hex: "#4A4A4A" },
            { name: "Titan Trắng", hex: "#F5F5DC" },
            { name: "Titan Xanh", hex: "#3d5a80" },
            { name: "Tự nhiên", hex: "#C2B280" },
        ],
        storage: ["256GB", "512GB", "1TB"],
        rating: 4.9,
        reviewCount: 2341,
        description: "iPhone 15 Pro Max – Chip A17 Pro mạnh mẽ nhất, camera 48MP Tetraprism, khung Titan siêu nhẹ, màn hình Super Retina XDR 6.7\" ProMotion 120Hz.",
        specs: [
            { label: "Màn hình", value: "6.7\" Super Retina XDR OLED 120Hz" },
            { label: "Chip", value: "Apple A17 Pro (3nm)" },
            { label: "Camera sau", value: "48MP + 12MP + 12MP" },
            { label: "Camera trước", value: "12MP TrueDepth" },
            { label: "Pin", value: "4.422 mAh, sạc MagSafe" },
            { label: "Hệ điều hành", value: "iOS 17" },
            { label: "Khung máy", value: "Titan cấp độ 5" },
            { label: "Kháng nước", value: "IP68" },
        ],
    },
    2: {
        id: 2,
        name: "Samsung Galaxy S24 Ultra 256GB",
        price: 25990000,
        originalPrice: 30990000,
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s24-ultra_1.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s24-ultra_2.png",
        ],
        colors: [
            { name: "Titanium Black", hex: "#1A1A1A" },
            { name: "Titanium Gray", hex: "#E8E8E8" },
            { name: "Titanium Blue", hex: "#23395D" },
            { name: "Titanium Orange", hex: "#8B3A3A" },
        ],
        storage: ["256GB", "512GB", "1TB"],
        rating: 4.8,
        reviewCount: 1876,
        description: "Galaxy S24 Ultra – Bút S Pen tích hợp, màn hình Dynamic AMOLED 6.8\" 120Hz, camera 200MP, chip Snapdragon 8 Gen 3.",
        specs: [
            { label: "Màn hình", value: "6.8\" Dynamic AMOLED 2X 120Hz" },
            { label: "Chip", value: "Snapdragon 8 Gen 3" },
            { label: "Camera sau", value: "200MP + 12MP + 50MP + 10MP" },
            { label: "Camera trước", value: "12MP" },
            { label: "Pin", value: "5.000 mAh, sạc 45W" },
            { label: "Hệ điều hành", value: "Android 14, One UI 6.1" },
            { label: "Bộ nhớ RAM", value: "12GB" },
            { label: "Kháng nước", value: "IP68" },
        ],
    },
    5: {
        id: 5,
        name: "MacBook Air M3 13\"",
        price: 28490000,
        originalPrice: 32990000,
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-2024_1.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-2024_2.png",
        ],
        colors: [
            { name: "Space Gray", hex: "#C0C0C0" },
            { name: "Starlight", hex: "#F5E6D3" },
            { name: "Midnight", hex: "#2D2D2D" },
            { name: "Sky Blue", hex: "#B5C7D3" },
        ],
        storage: ["256GB SSD", "512GB SSD", "1TB SSD"],
        rating: 4.9,
        reviewCount: 987,
        description: "MacBook Air M3 – Chip M3 cực mạnh, màn hình Liquid Retina 13.6\", pin bền 18 giờ, thiết kế siêu mỏng 11.3mm.",
        specs: [
            { label: "Màn hình", value: "13.6\" Liquid Retina 2560×1664" },
            { label: "Chip", value: "Apple M3 (8-core CPU, 10-core GPU)" },
            { label: "RAM", value: "8GB LPDDR5 (tuỳ chọn lên 24GB)" },
            { label: "Ổ cứng", value: "256GB SSD" },
            { label: "Pin", value: "52.6 Wh – 18 giờ" },
            { label: "Cổng kết nối", value: "2x USB-C Thunderbolt 3, MagSafe 3" },
            { label: "Camera", value: "1080p FaceTime HD" },
            { label: "Hệ điều hành", value: "macOS Sonoma" },
        ],
    },
};

// Fallback product if id not found
const defaultProduct = productsData[1];

const formatVND = (price: number) => price.toLocaleString("vi-VN") + "đ";

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = productsData[Number(id)] ?? defaultProduct;
    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
    const [quantity, setQuantity] = useState(1);
    const [isFav, setIsFav] = useState(false);
    const [added, setAdded] = useState(false);

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: `${product.name} – ${selectedStorage}`,
                price: product.price,
                originalPrice: product.originalPrice,
                imageUrl: product.images[0],
                color: selectedColor.hex,
                quantity,
            })
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-6">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Quay lại trang chủ
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* ====== LEFT: Images ====== */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden aspect-square flex items-center justify-center p-8">
                            <img
                                src={product.images[selectedImg]}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-200"
                                onError={(e) => { (e.target as HTMLImageElement).src = product.images[0]; }}
                            />
                        </div>
                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImg(i)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden bg-white p-1 transition-all
                                                    ${selectedImg === i ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ====== RIGHT: Info ====== */}
                    <div className="flex flex-col gap-5">
                        {/* Badges */}
                        <div className="flex gap-2 flex-wrap">
                            <span className="bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                -{discount}%
                            </span>
                            <span className="bg-orange-100 text-orange-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Chính hãng
                            </span>
                            <span className="bg-green-100 text-green-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Còn hàng
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviewCount.toLocaleString()} đánh giá)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-4 flex-wrap">
                            <span className="text-3xl font-extrabold text-orange-600">{formatVND(product.price)}</span>
                            <span className="text-lg text-gray-400 line-through">{formatVND(product.originalPrice)}</span>
                            <span className="text-sm font-semibold text-green-600">
                                Tiết kiệm {formatVND(product.originalPrice - product.price)}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                        {/* Storage */}
                        <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Bộ nhớ</p>
                            <div className="flex gap-2 flex-wrap">
                                {product.storage.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedStorage(s)}
                                        className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all
                                                    ${selectedStorage === s
                                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                                : "border-gray-200 text-gray-600 hover:border-orange-300"}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                                Màu: <span className="text-orange-500 normal-case font-bold">{selectedColor.name}</span>
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                {product.colors.map((c) => (
                                    <button
                                        key={c.hex}
                                        title={c.name}
                                        onClick={() => setSelectedColor(c)}
                                        className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110
                                                    ${selectedColor.hex === c.hex ? "border-orange-500 scale-110 shadow-md" : "border-gray-200"}`}
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Số lượng</p>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center text-sm font-semibold text-gray-800">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm
                                           uppercase tracking-wider transition-all duration-200 active:scale-95
                                           ${added
                                        ? "bg-green-500 text-white shadow-lg shadow-green-200"
                                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-200"}`}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Đã thêm vào giỏ!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4" />
                                        Thêm vào giỏ hàng
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setIsFav(!isFav)}
                                className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all
                                           ${isFav ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"}`}
                                aria-label="Yêu thích"
                            >
                                <Heart className={`w-5 h-5 ${isFav ? "fill-red-500" : ""}`} />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2">
                            {[
                                { Icon: Shield, text: "BH 12 tháng" },
                                { Icon: Truck, text: "Giao nhanh 2h" },
                                { Icon: RotateCcw, text: "Đổi trả 7 ngày" },
                                { Icon: Zap, text: "Sạc nhanh" },
                            ].map(({ Icon, text }) => (
                                <div key={text} className="flex flex-col items-center gap-1 sm:gap-1.5 bg-gray-50 rounded-xl py-2.5 sm:py-3 border border-gray-100">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                    <span className="text-[11px] sm:text-xs font-medium text-gray-600 text-center leading-tight">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ====== Specs Table ====== */}
                <div className="mt-12">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-1 h-7 bg-orange-500 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Thông số kỹ thuật</h2>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm min-w-[320px]">
                                <tbody>
                                    {product.specs.map(({ label, value }, i) => (
                                        <tr key={label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-3 sm:px-5 py-3 sm:py-3.5 font-semibold text-gray-500 w-28 sm:w-52 whitespace-nowrap text-xs sm:text-sm">{label}</td>
                                            <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-gray-800 text-xs sm:text-sm">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};