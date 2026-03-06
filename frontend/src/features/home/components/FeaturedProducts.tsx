import { ProductCard } from "../../../components/product/ProductCard";
import { ArrowRight, Flame, Smartphone, Laptop } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    color: string[];
    rating: number;
    category: "phone" | "laptop";
}

const fakeproducts: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 28990000,
        originalPrice: 33990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1.png",
        color: ["#4A4A4A", "#F5F5DC", "#3d5a80", "#ffffff"],
        rating: 4.9,
        category: "phone",
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra 256GB",
        price: 25990000,
        originalPrice: 30990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s24-ultra_1.png",
        color: ["#1A1A1A", "#E8E8E8", "#23395D", "#8B3A3A"],
        rating: 4.8,
        category: "phone",
    },
    {
        id: 3,
        name: "Xiaomi 14 Ultra",
        price: 19990000,
        originalPrice: 23990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_1.jpg",
        color: ["#1C1C1E", "#E0D8C8"],
        rating: 4.6,
        category: "phone",
    },
    {
        id: 4,
        name: "OPPO Find X7 Pro",
        price: 17990000,
        originalPrice: 20990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-x7-pro_2.jpg",
        color: ["#0D1117", "#EAEAEA", "#00B894"],
        rating: 4.5,
        category: "phone",
    },
    {
        id: 5,
        name: "MacBook Air M3 13\" 8GB 256GB",
        price: 28490000,
        originalPrice: 32990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-2024_1.png",
        color: ["#C0C0C0", "#F5E6D3", "#2D2D2D", "#B5C7D3"],
        rating: 4.9,
        category: "laptop",
    },
    {
        id: 6,
        name: "Dell XPS 15 9530 Core i7",
        price: 35990000,
        originalPrice: 41990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/e/dell-xps-15-9530_1.jpg",
        color: ["#2D3436", "#F0F0F0"],
        rating: 4.7,
        category: "laptop",
    },
    {
        id: 7,
        name: "ASUS ROG Zephyrus G14 RTX 4060",
        price: 30990000,
        originalPrice: 35990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-zephyrus-g14-2024_1.jpg",
        color: ["#1A1A2E", "#E8E8E8"],
        rating: 4.6,
        category: "laptop",
    },
    {
        id: 8,
        name: "Lenovo Legion 5i Gen 8 RTX 4060",
        price: 27990000,
        originalPrice: 32990000,
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/e/lenovo-legion-5i-gen-8_1.jpg",
        color: ["#0A0A0A", "#EDEDED"],
        rating: 4.5,
        category: "laptop",
    },
];

type TabId = "all" | "phone" | "laptop";

const tabs: { id: TabId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "Bán chạy", Icon: Flame },
    { id: "phone", label: "Điện thoại", Icon: Smartphone },
    { id: "laptop", label: "Laptop", Icon: Laptop },
];

export const FeaturedProducts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabId>("all");

    const filtered =
        activeTab === "all" ? fakeproducts : fakeproducts.filter((p) => p.category === activeTab);

    return (
        <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-7 bg-orange-500 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-tight">
                        Sản phẩm nổi bật
                    </h2>
                </div>
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-1.5 text-base font-semibold text-orange-500
                               hover:text-orange-600 transition-colors duration-200 group"
                >
                    Xem tất cả
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
            </div>

            {/* Tab Filters */}
            <div className="flex gap-2.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                {tabs.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                                    whitespace-nowrap border transition-all duration-200
                                    ${activeTab === id
                                ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200"
                                : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                            }`}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    );
};