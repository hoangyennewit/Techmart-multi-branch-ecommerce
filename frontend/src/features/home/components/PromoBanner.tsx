import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

interface PromoBannerItem {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl: string;
    bgFrom: string;
    bgTo: string;
    link?: string;
    tag?: string;
}

const promoBanners: PromoBannerItem[] = [
    {
        id: 1,
        tag: "MỚI 2024",
        title: "iPhone 15 Pro Max",
        subtitle: "Chip A17 Pro. Khung Titan.",
        description: "Camera 48MP Tetraprism, màn hình ProMotion 120Hz và thời lượng pin bền bỉ nhất từ trước đến nay.",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1.png",
        bgFrom: "#0f0c29",
        bgTo: "#302b63",
        link: "/products/1",
    },
    {
        id: 2,
        tag: "BEST SELLER",
        title: "Samsung S24 Ultra",
        subtitle: "Camera 200MP. S Pen tích hợp.",
        description: "Màn hình Dynamic AMOLED 6.8\" 120Hz và hiệu năng Snapdragon 8 Gen 3 mạnh mẽ.",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s24-ultra_1.png",
        bgFrom: "#1a1a2e",
        bgTo: "#16213e",
        link: "/products/2",
    },
    {
        id: 3,
        tag: "HOT DEAL",
        title: "MacBook Air M3",
        subtitle: "Chip M3. Pin 18 giờ.",
        description: "Màn hình Liquid Retina 13.6\", thiết kế siêu mỏng 11.3mm, hiệu năng vượt trội.",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-2024_1.png",
        bgFrom: "#0f2027",
        bgTo: "#203a43",
        link: "/products/5",
    },
];

export const PromoBanner = () => {
    const navigate = useNavigate();
    if (promoBanners.length === 0) return null;

    return (
        <div className="w-full px-3 sm:px-6 lg:px-12 max-w-screen-xl mx-auto py-3 sm:py-4">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop={promoBanners.length > 1}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden"
                style={{ ["--swiper-pagination-color" as string]: "#f97316" }}
            >
                {promoBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div
                            className="relative flex items-center justify-between overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${banner.bgFrom} 0%, ${banner.bgTo} 100%)`,
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
                                {banner.tag && (
                                    <span className="inline-block w-fit px-2.5 py-0.5 bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-widest">
                                        {banner.tag}
                                    </span>
                                )}
                                <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold leading-tight line-clamp-2">
                                    {banner.title}
                                </h2>
                                {banner.subtitle && (
                                    <p className="text-orange-300 font-semibold text-xs sm:text-base line-clamp-1">
                                        {banner.subtitle}
                                    </p>
                                )}
                                {banner.description && (
                                    <p className="text-gray-300 text-xs leading-relaxed hidden md:block line-clamp-2">
                                        {banner.description}
                                    </p>
                                )}
                                <button
                                    onClick={() => banner.link && navigate(banner.link)}
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
                                    src={banner.imageUrl}
                                    alt={banner.title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
