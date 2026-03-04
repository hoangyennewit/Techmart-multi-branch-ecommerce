import { ProductCard } from "../../../components/product/ProductCard";
const fakeproducts = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        price: 10990000,
        originalPrice: 12990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.5
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 11990000,
        originalPrice: 13990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.7
    },
    {
        id: 3,
        name: "Xiaomi Mi 13 Pro",
        price: 8990000,
        originalPrice: 10990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.3

    },
    {
        id: 4,
        name: "Oppo Find X5 Pro",
        price: 7990000,
        originalPrice: 9990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.4
    },
    {
        id: 5,
        name: "Vivo X80 Pro",
        price: 6990000,
        originalPrice: 8990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.2
    },
    {
        id: 6,
        name: "Realme GT 2 Pro",
        price: 5990000,
        originalPrice: 7990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.1
    },
    {id: 7,
        name: "OnePlus 10 Pro",
        price: 4990000,
        originalPrice: 6990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Asus ROG Phone 6",
        price: 3990000,
        originalPrice: 5990000,
        imageUrl: "https://product.hstatic.net/1000329106/product/xam_6bc2fe85d1f04cd7be89491eea2f9afd_master.jpg",
        color: ["#000000", "#FFFFFF", "#FF0000"],
        rating: 4.6
    }
];
export const FeaturedProducts = () => {
    return (
        <section>
            <div>
                <h2 className="text-xl font-bold text-center text-amber-50 bg-orange-600 p-3 px-20 max-w-xl 
                transition-all whitespace-nowrap shadow-sm uppercase rounded-r-full">Sản phẩm nổi bật</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-5 px-40">
                {fakeproducts.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    )
};