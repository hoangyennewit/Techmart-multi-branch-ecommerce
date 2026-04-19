import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { Product } from "../../products/types";

type Props = {
    products: Product[];
}

const bgGradients = [
    { bgFrom: "#0f0c29", bgTo: "#302b63" },
    { bgFrom: "#1a1a2e", bgTo: "#16213e" },
    { bgFrom: "#0f2027", bgTo: "#203a43" },
];

export const PromoBanner = ({ products }: Props) => {
    const navigate = useNavigate();
    const bannerProducts = [...products]
        .sort((a, b) => (b.discount || 0) - (a.discount || 0))
        .slice(0, 3);
    
    if(bannerProducts.length === 0) return null;

    return (
        <div className="w-full px-3 sm:px-6 lg:px-12 max-w-screen-xl mx-auto py-3 sm:py-4">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop={bannerProducts.length > 1}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden"
                style={{ ["--swiper-pagination-color" as string]: "#f97316" }}
            >
                {bannerProducts.map((product, index) => {
                    const style = bgGradients[index % bgGradients.length];

                    return (
                        <SwiperSlide key={product.id}>
                            <div
                                className="relative flex items-center justify-between overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${style.bgFrom} 0%, ${style.bgTo} 100%)`,
                                    minHeight: "clamp(160px, 30vw, 260px)",
                                }}
                            >
                                {/* Glow */}
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: "radial-gradient(circle at 70% 50%, #f97316 0%, transparent 60%)",
                                    }}
                                />

                                {/* Text Content */}
                                <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2 text-white px-5 sm:px-10 py-6 sm:py-8 max-w-[55%] sm:max-w-md">
                                    {(product.discount ?? 0) > 0 && (
                                        <span className="inline-block w-fit px-2.5 py-0.5 bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-widest">
                                            GIẢM SỐC {product.discount}%
                                        </span>
                                    )}
                                    <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold leading-tight line-clamp-2">
                                        {product.name}
                                    </h2>
                                    <p className="text-orange-300 font-semibold text-xs sm:text-base line-clamp-1">
                                        Chỉ còn: {product.price.toLocaleString('vi-VN')}đ
                                    </p>
                                    {product.description && (
                                        <p className="text-gray-300 text-xs leading-relaxed hidden md:block line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        className="mt-3 w-fit inline-flex items-center gap-1.5
                                                bg-orange-500 hover:bg-orange-400 active:scale-95 text-white
                                                font-bold px-5 py-2 sm:px-7 sm:py-3 rounded-full
                                                text-xs sm:text-sm uppercase tracking-wider
                                                transition-all shadow-lg shadow-orange-500/30"
                                    >
                                        Mua ngay →
                                    </button>
                                </div>

                                {/* Product Image */}
                                <div className="relative z-10 flex-shrink-0 self-end pr-4 sm:pr-10">
                                    <img
                                        style={{ height: "clamp(120px, 24vw, 220px)" }}
                                        className="w-auto object-contain drop-shadow-2xl"
                                        src={product.images?.[0]?.url || ""}
                                        alt={product.name}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    );   
                })}
            </Swiper>
        </div>
    );
};
