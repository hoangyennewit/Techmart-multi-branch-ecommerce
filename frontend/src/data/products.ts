//src/data/products.ts
import { Product } from "../features/products/types";
export const products: Product[] = [
    {
        id: "p1",
        name: "iPhone 14 plus",
        description: "Điện thoại iPhone 14 Plus với màn hình lớn 6.7 inch, camera chất lượng cao và hiệu năng mạnh mẽ.",
        price: 2400000,
        originalPrice: 2800000,
        discount: 14,
        images: [
            {
                id: "img1",
                url: "https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-plus-thumb-xanh-600x600.jpg"
            },
            {
                id: "img2",
                url: "https://bachlongstore.vn/vnt_upload/product/07_2023/iphone_14_plus_den_11.jpg"
            },
            {
                id: "img3",
                url: "https://cdn.tgdd.vn/Products/Images/42/245545/Kit/iphone-14-plus-note-new.jpg"
            }
        ],
        colors: [
            {
                id: "color1",
                name: "Xanh dương",
                hex: "#0000FF"
            },
            {
                id: "color2",
                name: "Đen",
                hex: "#000000"
            },
            {
                id: "color3",
                name: "Trắng",
                hex: "#FFFFFF"
            },
            {
                id: "color4",
                name: "Đỏ",
                hex: "#FF0000"
            }
        ],
        variants: [
            {
                id: "variant1",
                name: "128GB",
                price: 2400000,
                stock: 50
            },
            {
                id: "variant2",
                name: "256GB",
                price: 2800000,
                stock: 30
            },
            {
                id: "variant3",
                name: "512GB",
                price: 3200000,
                stock: 20
            }
        ],
        specs: [
            {
                name: "Kích thước màn hình",
                value: "6.7 inch"
            },
            {
                name: "Công nghệ màn hình",
                value: "Super Retina XDR OLED"
            },
            {
                name: "Camera trước",
                value: "12MP"
            },
            {
                name: "Camera sau",
                value: "12MP + 12MP"
            },
            {
                name: "Chipset",
                value: "A15 Bionic"
            },
            {
                name: "Pin",
                value: "Li-Ion 4325 mAh"
            }
        ],
        stock: 100,
        rating: 4.5,
        sold: 200,
        createdAt: "2023-09-01T10:00:00Z",
        comments: [
            {
                id: "comment1",
                productId: "p1",
                userId: "u1",
                userName: "Nguyen Van A",
                content: "Sản phẩm rất tốt, tôi hài lòng với chất lượng.",
                stars: 5,
                createdAt: "2023-09-02T10:00:00Z"
            },
            {
                id: "comment2",
                productId: "p1",
                userId: "u2",
                userName: "Tran Thi B",
                content: "Mình thấy giá hơi cao so với các sản phẩm cùng loại.",
                stars: 4,
                createdAt: "2023-09-03T12:00:00Z"
            },
            {
                id: "comment3",
                productId: "p1",
                userId: "u3",
                userName: "Le Van C",
                content: "Giao hàng nhanh, sản phẩm đúng như mô tả.",
                stars: 5,
                createdAt: "2023-09-04T14:00:00Z"
            }
        ]
    },
    {
        id: "p2",
        name: "Samsung Galaxy S23 Ultra",
        description: "Điện thoại Samsung Galaxy S23 Ultra với màn hình lớn 6.8 inch, camera chất lượng cao và hiệu năng mạnh mẽ.",
        price: 2200000,
        originalPrice: 2600000,
        discount: 15,
        images: [
            {
                id: "img1",
                url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-tim_6_2.png"
            },
            {
                id: "img2",
                url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-trang_1_2.png"
            },
            {
                id: "img3",
                url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-xanh_1_2.png"
            }
        ],
        colors: [
            {
                id: "color1",
                name: "Đen",
                hex: "#000000"
            },
            {
                id: "color2",
                name: "Trắng",
                hex: "#FFFFFF"
            },
            {
                id: "color3",
                name: "Xanh lá",
                hex: "#00FF00"
            },
            {
                id: "color4",
                name: "Tím",
                hex: "#800080"
            }
        ],
        variants: [
            {
                id: "variant1",
                name: "128GB",
                price: 2200000,
                stock: 60
            },
            {
                id: "variant2",
                name: "256GB",
                price: 2600000,
                stock: 40
            },
            {
                id: "variant3",
                name: "512GB",
                price: 3000000,
                stock: 25
            }
        ],
        specs: [
            {
                name: "Kích thước màn hình",
                value: "6.8 inch"
            },
            {
                name: "Công nghệ màn hình",
                value: "Dynamic AMOLED 2X"
            },
            {
                name: "Camera trước",
                value: "40MP"
            },
            {
                name: "Camera sau",
                value: "108MP + 12MP + 10MP + 10MP"
            },
            {
                name: "Chipset",
                value: "Snapdragon 8 Gen 2"
            },
            {
                name: "Pin",
                value: "Li-Ion 5000 mAh"
            }
        ],
        stock: 120,
        rating: 4.7,
        sold: 150,
        createdAt: "2023-10-01T10:00:00Z",
        comments: [
            {
                id: "comment1",
                productId: "p2",
                userId: "u1",
                userName: "Pham Thi D",
                content: "Sản phẩm có thiết kế đẹp và hiệu năng tốt.",
                stars: 5,
                createdAt: "2023-10-02T10:00:00Z"
            },
            {
                id: "comment2",
                productId: "p2",
                userId: "u2",
                userName: "Hoang Van E",
                content: "Camera quá tuyệt vời, mình rất thích.",
                stars: 5,
                createdAt: "2023-10-03T12:00:00Z"
            },
            {
                id: "comment3",
                productId: "p2",
                userId: "u3",
                userName: "Le Thi F",
                content: "Giá hơi cao nhưng đáng đồng tiền.",
                stars: 4,
                createdAt: "2023-10-04T14:00:00Z"
            }
        ]
    }
];