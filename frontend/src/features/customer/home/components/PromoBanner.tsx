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
    { bgFrom: "#1a1a3e", bgTo: "#2d1b4e" },
    { bgFrom: "#2d1b4e", bgTo: "#1a1a3e" },
    { bgFrom: "#1a1a3e", bgTo: "#3d1f5c" },
];

export const PromoBanner = ({ products }: Props) => {
    const navigate = useNavigate();
    const bannerProducts = [...products]
        .sort((a, b) => (b.discount || 0) - (a.discount || 0))
        .slice(0, 3);
    
    if(bannerProducts.length === 0) return null;

    return (
        <div className="w-screen py-0">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop={bannerProducts.length > 1}
                className="w-full overflow-hidden"
                style={{ ["--swiper-pagination-color" as string]: "#a855f7" }}
            >
                {bannerProducts.map((product, index) => {
                    const style = bgGradients[index % bgGradients.length];

                    return (
                        <SwiperSlide key={product.id}>
                            <div
                                className="relative w-full overflow-hidden grid grid-cols-2"
                                style={{
                                    background: `linear-gradient(135deg, ${style.bgFrom} 0%, ${style.bgTo} 100%)`,
                                    minHeight: "clamp(220px, 35vw, 320px)",
                                }}
                            >
                                {/* Glow */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: "radial-gradient(circle at 30% 50%, #a855f7 0%, transparent 60%)",
                                    }}
                                />

                                {/* Product Image - Left col, fill toàn bộ */}
                                <div className="relative z-10 flex items-center justify-center h-full overflow-hidden">
                                    <img
                                        style={{
                                            height: "clamp(180px, 32vw, 310px)",
                                            width: "100%",
                                            objectFit: "contain",
                                            // Hòa màu ảnh với nền tối, loại bỏ nền trắng
                                            mixBlendMode: "screen",
                                            filter: "brightness(1.05) contrast(1.05)",
                                        }}
                                        src={product.images?.[0]?.url || ""}
                                        alt={product.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = '/vite.svg';
                                        }}
                                    />
                                </div>

                                {/* Text Content - Right col, fill toàn bộ */}
                                <div className="relative z-10 flex flex-col justify-center gap-2 sm:gap-4 text-white px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
                                    {(product.discount ?? 0) > 0 && (
                                        <span className="inline-block w-fit px-3 py-1 bg-purple-600 text-white text-[9px] sm:text-[11px] font-bold rounded-full uppercase tracking-wider">
                                            GIẢM {product.discount}%
                                        </span>
                                    )}
                                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                                        {product.name}
                                    </h2>
                                    <p className="text-purple-300 font-semibold text-sm sm:text-lg">
                                        Nâng tầm cuộc sống số
                                    </p>
                                    <p className="text-white font-bold text-base sm:text-xl">
                                        {product.price.toLocaleString('vi-VN')}đ
                                    </p>
                                    <button
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        className="mt-2 w-fit inline-flex items-center gap-1.5
                                                bg-purple-600 hover:bg-purple-500 active:scale-95 text-white
                                                font-bold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full
                                                text-xs sm:text-sm uppercase tracking-wider
                                                transition-all shadow-lg shadow-purple-600/40"
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    );   
                })}
            </Swiper>
        </div>
    );
};
