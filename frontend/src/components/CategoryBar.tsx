import { Smartphone, Laptop, Headphones, Tablet, Monitor, Tv } from "lucide-react";
import { JSX, useState } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: JSX.Element;
}

const categories: Category[] = [
    { id: 1, name: "Điện thoại", slug: "dien-thoai", icon: <Smartphone className="w-5 h-5" /> },
    { id: 2, name: "Laptop",     slug: "laptop",     icon: <Laptop     className="w-5 h-5" /> },
    { id: 3, name: "Âm thanh",  slug: "am-thanh",   icon: <Headphones className="w-5 h-5" /> },
    { id: 4, name: "Tablet",    slug: "tablet",     icon: <Tablet     className="w-5 h-5" /> },
    { id: 5, name: "Màn hình",  slug: "man-hinh",   icon: <Monitor    className="w-5 h-5" /> },
    { id: 6, name: "TV",        slug: "tv",         icon: <Tv         className="w-5 h-5" /> },
];

export const CategoryBar = () => {
    const [active, setActive] = useState<number | null>(null);

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
                {/* Grid 6 cột cố định — đồng đều trên mọi kích thước */}
                <ul className="grid grid-cols-6 py-1">
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => setActive(cat.id)}
                                className={`w-full flex flex-col items-center justify-center gap-1
                                            py-2.5 text-xs font-medium transition-all duration-150
                                            border-b-2 
                                            ${
                                                active === cat.id
                                                    ? "border-orange-500 text-orange-600"
                                                    : "border-transparent text-gray-500 hover:text-orange-500 hover:border-orange-300"
                                            }`}
                            >
                                <span className={`transition-colors duration-150 ${active === cat.id ? "text-orange-500" : "text-gray-400"}`}>
                                    {cat.icon}
                                </span>
                                <span className="leading-tight text-center whitespace-nowrap text-[11px] sm:text-xs">
                                    {cat.name}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};