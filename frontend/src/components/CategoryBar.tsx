import { Smartphone, Laptop, Headphones, Tablet, Monitor } from "lucide-react";
import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  { id: 1, name: "Điện thoại", slug: "dien-thoai", icon: <Smartphone className="w-6 h-6" /> },
  { id: 2, name: "Laptop", slug: "laptop", icon: <Laptop className="w-6 h-6" /> },
  { id: 4, name: "Tablet", slug: "may-tinh-bang", icon: <Tablet className="w-6 h-6" /> },
  { id: 5, name: "Màn hình", slug: "man-hinh", icon: <Monitor className="w-6 h-6" /> },
  { id: 3, name: "Phụ kiện", slug: "phu-kien", icon: <Headphones className="w-6 h-6" /> },
];

export const CategoryBar = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-[#1a0b2e] py-8 px-4 sm:px-10">
      {/* Khung Capsule chính bao trọn cả 2 phần */}
      <div className="max-w-screen-2xl mx-auto flex items-center bg-[#25163d]/80 rounded-full p-1.5 border border-white/10 shadow-2xl">
        
        {/* NÚT GỢI Ý: Nằm cố định bên trái */}
        <div className="px-10 py-3.5 bg-orange-900 rounded-full shadow-lg flex-shrink-0">
          <span className="text-white font-extrabold uppercase tracking-widest text-sm sm:text-lg whitespace-nowrap">
            Gợi ý cho bạn
          </span>
        </div>

        {/* VÙNG CHỨA ICON: Dùng flex-1 để giãn rộng ra sát nút gợi ý */}
        <div className="flex-1 flex items-center justify-around px-6 sm:px-12">
          {categories.map((cat) => {
            const isActive = location.pathname.includes(`/category/${cat.slug}`);
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`relative flex items-center justify-center p-3 transition-all duration-300 group`}
                title={cat.name}
              >
                {/* Icon với hiệu ứng sáng nhẹ khi active hoặc hover */}
                <div className={`transition-all duration-300 transform group-hover:scale-120 ${
                  isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-orange-300"
                }`}>
                  {cat.icon}
                </div>

                {/* Đường gạch chân nhỏ nếu muốn giống các giao diện hiện đại (tùy chọn) */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_8px_#a855f7]"></div>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
};

