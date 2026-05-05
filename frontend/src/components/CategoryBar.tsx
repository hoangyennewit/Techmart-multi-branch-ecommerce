import { Smartphone, Laptop, Headphones, Tablet, Monitor, Tv } from "lucide-react";
import { JSX, use, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: JSX.Element;
}

const categories: Category[] = [
    { id: 1, name: "Điện thoại", slug: "dien-thoai", icon: <Smartphone className="w-6 h-6" /> },
    { id: 2, name: "Laptop",     slug: "laptop",     icon: <Laptop     className="w-6 h-6" /> },
    { id: 3, name: "Âm thanh",  slug: "am-thanh",   icon: <Headphones className="w-6 h-6" /> },
    { id: 4, name: "Tablet",    slug: "tablet",     icon: <Tablet     className="w-6 h-6" /> },
    { id: 5, name: "Màn hình",  slug: "man-hinh",   icon: <Monitor    className="w-6 h-6" /> },
    { id: 6, name: "TV",        slug: "tv",         icon: <Tv         className="w-6 h-6" /> },
];

export const CategoryBar = () => {
    //const [active, setActive] = useState<number | null>(null);
    const location = useLocation();
    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-12">
                {/* Horizontal scroll on mobile, grid on sm+ */}
                <ul className="flex sm:grid sm:grid-cols-6 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = location.pathname.includes(`/category/${cat.slug}`);
                        return (
                            <li key={cat.id} className="flex-shrink-0 sm:flex-shrink">
                                <Link
                                    to={`/category/${cat.slug}`}
                                    className={`w-full min-w-[80px] sm:min-w-0 flex flex-col items-center justify-center gap-1.5
                                                px-3 sm:px-2 py-4 text-xs font-semibold transition-all duration-150
                                                border-b-2
                                                ${
                                                    isActive
                                                        ? "border-purple-600 text-purple-600"
                                                        : "border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300"
                                                }`}
                                >
                                    <span className={`transition-colors duration-150 ${isActive ? "text-purple-400" : "text-gray-500"}`}>
                                        {cat.icon}
                                    </span>
                                    <span className="leading-tight text-center whitespace-nowrap text-xs sm:text-sm">
                                        {cat.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
};

