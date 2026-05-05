import { Phone, Laptop, Headphones, Tablet, Monitor, Tv, Mail, MapPin, ChevronRight, Facebook, Youtube, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./common/Logo";

const footerLinks = {
    "Về TechMart": [
        "Giới thiệu",
        "Tuyển dụng",
        "Tin tức",
        "Liên hệ",
    ],
    "Hỗ trợ khách hàng": [
        "Hướng dẫn mua hàng",
        "Chính sách đổi trả",
        "Chính sách bảo hành",
        "Thanh toán & Giao hàng",
    ],
    "Danh mục sản phẩm": [
        "Điện thoại",
        "Laptop",
        "Âm thanh",
        "Tablet",
        "Màn hình",
        "TV",
    ],
};

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-[#05020A] text-gray-400 mt-12">
            {/* Top Band */}
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-4">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">Đăng ký nhận ưu đãi qua email</span>
                    </div>
                    <div className="flex w-full sm:w-auto max-w-sm">
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="flex-1 px-4 py-2 rounded-l-full text-gray-800 text-sm outline-none"
                        />
                        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-r-full text-sm font-bold transition-colors whitespace-nowrap">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <div
                            className="cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <Logo />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            TechMart – Chuỗi bán lẻ điện tử hàng đầu Việt Nam.
                            Cam kết hàng chính hãng, bảo hành toàn diện.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
                        </div>
                        {/* Social Icons */}
                        <div className="flex gap-3 mt-2">
                            {[
                                { Icon: Facebook, color: "hover:text-blue-400", label: "Facebook" },
                                { Icon: Youtube, color: "hover:text-red-400", label: "Youtube" },
                                { Icon: Instagram, color: "hover:text-pink-400", label: "Instagram" },
                            ].map(({ Icon, color, label }) => (
                                <button
                                    key={label}
                                    aria-label={label}
                                    className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center ${color} transition-colors hover:bg-white/10`}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                                {heading}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <button
                                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors group"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                    <span>© 2024 TechMart. Tất cả quyền được bảo lưu.</span>
                    <div className="flex gap-4">
                        <button className="hover:text-gray-300 transition-colors">Điều khoản sử dụng</button>
                        <button className="hover:text-gray-300 transition-colors">Chính sách bảo mật</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

