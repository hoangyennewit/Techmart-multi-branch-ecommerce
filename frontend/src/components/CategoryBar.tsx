import { Smartphone, Laptop, Headphones, Tablet, Monitor, Tv } from "lucide-react";
import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: JSX.Element;
}

const categories: Category[] = [
    { id: 1, name: "Điện thoại", slug: "dien-thoai",    icon: <Smartphone className="w-6 h-6" /> },
    { id: 2, name: "Laptop",     slug: "laptop",        icon: <Laptop     className="w-6 h-6" /> },
    { id: 3, name: "Phụ kiện",   slug: "phu-kien",      icon: <Headphones className="w-6 h-6" /> },
    { id: 4, name: "Tablet",     slug: "may-tinh-bang", icon: <Tablet     className="w-6 h-6" /> },
    { id: 5, name: "Âm thanh",   slug: "am-thanh",      icon: <Monitor    className="w-6 h-6" /> },
    { id: 6, name: "TV",         slug: "tv",            icon: <Tv         className="w-6 h-6" /> },
];

export const CategoryBar = () => {
    const location = useLocation();

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm py-4">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dùng flex với gap để kiểm soát khoảng cách giữa Label và Menu */}
                <div className="flex items-center gap-6 sm:gap-10 w-full">
                    
                    {/* LABEL GỢI Ý - Tăng kích thước chữ gấp đôi (text-2xl hoặc text-3xl) */}
                    <div className="flex-shrink-0 text-gray-800 font-black uppercase tracking-wide cursor-pointer hover:text-orange-500 transition-colors text-xl sm:text-3xl">
                        Gợi ý cho bạn
                    </div>

                    {/* VÙNG MENU DANH MỤC - Chiếm phần diện tích còn lại (flex-1) và kéo dài */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        {/* Khung bo tròn kéo dài toàn bộ chiều rộng có sẵn (w-full), căn giữa các item (justify-around) */}
                        <ul className="flex items-center justify-around bg-gray-50 border border-gray-100 rounded-full px-6 py-2.5 w-full min-w-max">
                            {categories.map((cat) => {
                                const isActive = location.pathname.includes(`/category/${cat.slug}`);
                                return (
                                    <li key={cat.id} className="flex-shrink-0 px-2">
                                        <Link
                                            to={`/category/${cat.slug}`}
                                            className={`flex flex-col items-center justify-center gap-1.5
                                                px-3 py-1.5 text-xs font-semibold transition-all duration-150
                                                border-b-2
                                                ${isActive
                                                    ? "border-orange-500 text-orange-600"
                                                    : "border-transparent text-gray-500 hover:text-orange-500 hover:border-orange-300"
                                                }`}
                                        >
                                            <span className={`transition-colors duration-150 ${isActive ? "text-orange-500" : "text-gray-400"}`}>
                                                {cat.icon}
                                            </span>
                                            <span className="leading-tight text-center whitespace-nowrap text-[10px] sm:text-xs">
                                                {cat.name}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    );
};