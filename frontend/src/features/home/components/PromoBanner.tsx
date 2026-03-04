import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface PromoBannerProps {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    link?: string;
}

const promoBanners: PromoBannerProps[] = [
    {
        id: 1,
        title: "Sắc Màu Rực Rỡ Pin Khủng Cả Ngày",
        description: "Sở hữu Iphone 14 và Iphone 14 Plus với màn hình lớn hơn, hệ thống camera kép ấn tượng và thời gian pin bền bỉ nhất",
        imageUrl: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.xlarge_2x.jpg",
        link: "https://www.thegioididong.com/dtdd/iphone-14"
    }];

export const PromoBanner = () => { //tham số sau này khi có backend (props: PromoBannerProps)
    if(promoBanners.length === 0) {
        return null;
    }
    return (
        <div className="w-full max-w-20xl mx-auto px-50 py-5">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{clickable: true}}
                autoplay={{delay: 3000}}
                loop= {promoBanners.length > 1}
                className="mySwiper w-full h-60 mt-4"
            >
                {promoBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <section className="bg-indigo-950 text-white p-7 rounded-lg flex items-center justify-between gap-6">
                            <div className="">
                                <h2 className="text-5xl font-bold">{banner.title}</h2>
                                <p className="mt-2 text-zinc-500">{banner.description}</p>
                            </div>
                            <button
                                onClick={() => banner.link && (window.location.href = banner.link)}
                                className="btn btn-primary bg-orange-600 text-white font-bold px-6 py-2 rounded-full text-xs hover:bg-green-700 transition-all whitespace-nowrap shadow-sm uppercase tracking-wider">
                                    Mua ngay</button>
                            <img className="w-70 h-45 object-cover rounded-md" src={banner.imageUrl} alt={`Promo Banner ${banner.id}`}/>
                        </section>     
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
