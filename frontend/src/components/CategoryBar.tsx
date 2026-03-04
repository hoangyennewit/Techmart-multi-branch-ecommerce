import {Smartphone, Laptop, Headphones, Tablet, Monitor } from "lucide-react";
import { JSX } from "react";

interface Category {
    id: number;
    name: string;
    icon: JSX.Element;
}
const categories: Category[] = [
    { id: 1, name: "Điện thoại", icon: <Smartphone className="w-5 h-5" /> },
    { id: 2, name: "Laptop", icon: <Laptop className="w-5 h-5" /> },
    { id: 3, name: "Âm thanh", icon: <Headphones className="w-5 h-5" /> },
    { id: 4, name: "Tablet", icon: <Tablet className="w-5 h-5" /> },
    { id: 5, name: "Màn hình, máy in", icon: <Monitor className="w-5 h-5" /> },
];
export const CategoryBar = () => {
    return (
        <nav className="w-full bg-white shadow-sm">
            <div className="max-w-15xl">
                <ul className="flex items-center 
                justify-between space-x-6 py-3 px-4">
                    {categories.map((category) => (
                        <li key={category.id} className="flex items-center space-x-2">
                            {category.icon}
                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};