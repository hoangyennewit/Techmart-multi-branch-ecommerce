import { ProductCard } from "../../../components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fakeproducts = [
    {
        id: 1,
        name: "iPhone 14 Pro Max 256GB",
        price: 10990000,
        originalPrice: 12990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#1C1C1E", "#F5F5F0", "#A2845E"],
        rating: 4.5,
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra 256GB",
        price: 11990000,
        originalPrice: 13990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#1A1A1A", "#E8E8E8", "#23395D"],
        rating: 4.7,
    },
    {
        id: 3,
        name: "Xiaomi Mi 13 Pro",
        price: 8990000,
        originalPrice: 10990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#111111", "#F4F4F4", "#6C5CE7"],
        rating: 4.3,
    },
    {
        id: 4,
        name: "Oppo Find X5 Pro",
        price: 7990000,
        originalPrice: 9990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#0D1117", "#EAEAEA", "#00B894"],
        rating: 4.4,
    },
    {
        id: 5,
        name: "Vivo X80 Pro",
        price: 6990000,
        originalPrice: 8990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#1E1E2E", "#F8F8F8", "#E17055"],
        rating: 4.2,
    },
    {
        id: 6,
        name: "Realme GT 2 Pro",
        price: 5990000,
        originalPrice: 7990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#2D3436", "#DFE6E9", "#FDCB6E"],
        rating: 4.1,
    },
    {
        id: 7,
        name: "OnePlus 10 Pro 5G",
        price: 4990000,
        originalPrice: 6990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#74B9FF"],
        rating: 4.0,
    },
    {
        id: 8,
        name: "Asus ROG Phone 6",
        price: 3990000,
        originalPrice: 5990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#0A0A0A", "#D63031", "#6C5CE7"],
        rating: 4.6,
    },
];

export const FeaturedProducts = () => {
    const navigate = useNavigate();

    return (
        <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-7 bg-orange-500 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-tight">
                        Sản phẩm nổi bật
                    </h2>
                </div>
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-1 text-sm font-medium text-orange-500 
                               hover:text-orange-600 transition-colors duration-200 group"
                >
                    Xem tất cả
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {fakeproducts.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    );
};