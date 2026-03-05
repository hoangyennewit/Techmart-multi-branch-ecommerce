import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
        title: "iPhone 14 & 14 Plus",
        subtitle: "Sắc màu rực rỡ. Pin khủng cả ngày.",
        description: "Màn hình lớn hơn, camera kép ấn tượng và thời lượng pin bền bỉ nhất từ trước đến nay.",
        imageUrl: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.xlarge_2x.jpg",
        bgFrom: "#0f0c29",
        bgTo: "#302b63",
        link: "/products/1",
    },
    {
        id: 2,
        tag: "BEST SELLER",
        title: "Samsung Galaxy S23 Ultra",
        subtitle: "Sức mạnh vượt trội. Camera 200MP.",
        description: "Bút S Pen tích hợp, màn hình siêu sáng 6.8\" và hiệu năng Snapdragon 8 Gen 2.",
        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/vn/2302/gallery/vn-galaxy-s23-ultra-s918-sm-s918bzaavnh-thumb-534876657",
        bgFrom: "#1a1a2e",
        bgTo: "#16213e",
        link: "/products/2",
    },
    {
        id: 3,
        tag: "HOT DEAL",
        title: "Xiaomi Mi 13 Pro",
        subtitle: "Camera Leica. Sạc siêu nhanh 120W.",
        description: "Chipset Snapdragon 8 Gen 2, camera Leica co-engineered, sạc không dây 50W.",
        imageUrl: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-13/M/50a2b50e75bc87b15bfc4bba089ee7b3.png",
        bgFrom: "#0f2027",
        bgTo: "#203a43",
        link: "/products/3",
    },
];

export const PromoBanner = () => {
    if (promoBanners.length === 0) return null;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto py-4">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={promoBanners.length > 1}
                className="w-full rounded-2xl overflow-hidden"
                style={{ ["--swiper-pagination-color" as string]: "#f97316" }}
            >
                {promoBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div
                            className="relative flex flex-col sm:flex-row items-center justify-between 
                                       gap-4 px-6 sm:px-10 pt-6 sm:pt-0 pb-10 sm:pb-0 min-h-[220px] sm:min-h-[240px]
                                       overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${banner.bgFrom} 0%, ${banner.bgTo} 100%)`,
                            }}
                        >
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 70% 50%, #f97316 0%, transparent 60%)",
                                }}
                            />

                            {/* Text Content */}
                            <div className="relative z-10 flex flex-col gap-2 text-white max-w-xs sm:max-w-sm text-center sm:text-left">
                                {banner.tag && (
                                    <span className="inline-block self-center sm:self-start px-3 py-0.5 
                                                     bg-orange-500 text-white text-[10px] font-bold 
                                                     rounded-full uppercase tracking-widest w-fit">
                                        {banner.tag}
                                    </span>
                                )}
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                                    {banner.title}
                                </h2>
                                {banner.subtitle && (
                                    <p className="text-orange-300 font-semibold text-sm sm:text-base">
                                        {banner.subtitle}
                                    </p>
                                )}
                                {banner.description && (
                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed hidden sm:block">
                                        {banner.description}
                                    </p>
                                )}
                                <button
                                    onClick={() => banner.link && (window.location.href = banner.link)}
                                    className="mt-2 self-center sm:self-start inline-flex items-center gap-2 
                                               bg-orange-500 hover:bg-orange-400 active:scale-95 text-white 
                                               font-bold px-6 py-2.5 rounded-full text-xs uppercase 
                                               tracking-wider transition-all shadow-lg shadow-orange-500/30"
                                >
                                    Mua ngay →
                                </button>
                            </div>

                            {/* Product Image */}
                            <div className="relative z-10 flex-shrink-0">
                                <img
                                    className="h-36 sm:h-48 lg:h-56 w-auto object-contain 
                                               drop-shadow-2xl"
                                    src={banner.imageUrl}
                                    alt={banner.title}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
