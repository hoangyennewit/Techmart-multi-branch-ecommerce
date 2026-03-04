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
        title: "Sắc Màu Rực Rỡ - Pin Khủng Cả Ngày",
        description: "Sở hữu Iphone 14 và Iphone 14 Plus với màn hình lớn hơn, hệ thống camera kép ấn tượng và thời gian pin bền bỉ nhất",
        imageUrl: "https://cdn.tgdd.vn/2023/09/banner/800-200-800x200-1.png",
        link: "https://www.thegioididong.com/dtdd/iphone-14"
    }];

export const PromoBanner = () => { //tham số sau này khi có backend (props: PromoBannerProps)
    if(promoBanners.length === 0) {
        return null;
    }
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{clickable: true}}
            autoplay={{delay: 3000}}
            loop= {promoBanners.length > 1}
        >
            {promoBanners.map((banner) => (
                <SwiperSlide key={banner.id}>
                    <section className="">
                        <div>
                            <h2>{banner.title}</h2>
                            <p>{banner.description}</p>
                        </div>
                        <button
                            onClick={() => banner.link && (window.location.href = banner.link)}
                            className="btn btn-primary">
                                Mua ngay</button>
                        <img src={banner.imageUrl} alt={`Promo Banner ${banner.id}`}/>
                    </section>     
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
