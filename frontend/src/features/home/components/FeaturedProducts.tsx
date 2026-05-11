import {useNavigate} from "react-router-dom";
import { ProductCard } from "../../../components/product/ProductCard";
import {Product} from "../../products/types";
import { ArrowRight, Flame, Smartphone, Laptop } from "lucide-react";
import { useState } from "react";

type Props = {
    products: Product[];
};
type TabId = "all" | number;

const tabs: { id: TabId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "Bán chạy", Icon: Flame },
    { id: 1, label: "Điện thoại", Icon: Smartphone },
    { id: 2, label: "Laptop", Icon: Laptop },
];
export const FeaturedProducts = ({ products }: Props) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabId>("all");

    const filtered = products.filter((item) => {
        if (activeTab === "all") return true;
        return item.categoryId === activeTab;
    });

    // 4. Render giao diện
    return (
        <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-7 bg-orange-500 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-tight">
                        Sản phẩm nổi bật
                    </h2>
                </div>
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-1.5 text-base font-semibold text-orange-600
                               hover:text-orange-400 transition-colors duration-200 group"
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
                                ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/40"
                                : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-600"
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

