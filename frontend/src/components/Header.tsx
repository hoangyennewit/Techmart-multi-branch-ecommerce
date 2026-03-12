import { Search, ShoppingCart, Bell, Menu, X, Phone, Laptop, Headphones, Tablet, Monitor, Tv, Home, User, Package } from "lucide-react";
import { Logo } from "./common/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";

const navCategories = [
    { name: "Điện thoại", slug: "dien-thoai", Icon: Phone },
    { name: "Laptop", slug: "laptop", Icon: Laptop },
    { name: "Âm thanh", slug: "am-thanh", Icon: Headphones },
    { name: "Tablet", slug: "tablet", Icon: Tablet },
    { name: "Màn hình", slug: "man-hinh", Icon: Monitor },
    { name: "TV", slug: "tv", Icon: Tv },
];

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const cartCount = useSelector(selectCartCount);

    return (
        <>
            <header className="w-full bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">

                    {/* Logo */}
                    <button
                        className="flex-shrink-0 cursor-pointer bg-transparent border-0 p-0"
                        onClick={() => navigate("/")}
                        aria-label="Trang chủ"
                    >
                        <Logo />
                    </button>

                    {/* Search Bar — hidden on mobile, visible sm+ */}
                    <div className="hidden sm:flex flex-1 max-w-xl">
                        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2.5 gap-2
                                        focus-within:ring-2 focus-within:ring-orange-300 transition-all">
                            <Search className="w-5 h-5 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm điện thoại, laptop..."
                                className="flex-1 outline-none text-base text-gray-700 bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

                        {/* Search Icon — mobile only */}
                        <button
                            className="sm:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Tìm kiếm"
                        >
                            <Search className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Cart */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="relative p-2.5 rounded-full hover:bg-orange-50 transition-colors"
                            aria-label="Giỏ hàng"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] bg-orange-500 text-white
                                                 text-[11px] font-bold rounded-full flex items-center justify-center px-1">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </button>

                        {/* Bell — hidden on xs */}
                        <button
                            className="hidden sm:flex p-2.5 rounded-full hover:bg-orange-50 transition-colors"
                            aria-label="Thông báo"
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Orders - Package */}
                        <button
                            onClick={() => navigate("/orders")}
                            className="hidden sm:flex p-2.5 rounded-full hover:bg-orange-50 transition-colors"
                            aria-label="Đơn hàng của tôi"
                        >
                            <Package className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Login Button */}
                        <button
                            className="bg-[#ee3124] text-white font-bold px-4 sm:px-6 py-2.5 rounded-full
                                       text-sm hover:bg-orange-600 active:scale-95 transition-all
                                       whitespace-nowrap shadow-md shadow-red-200 uppercase tracking-wider"
                            onClick={() => navigate("/login")}
                        >
                            Đăng nhập
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            className="sm:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar dropdown */}
                {searchOpen && (
                    <div className="sm:hidden px-4 pb-3 animate-[slideDown_0.15s_ease-out]">
                        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 gap-2
                                        focus-within:ring-2 focus-within:ring-orange-300 transition-all">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                autoFocus
                                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <button
                    type="button"
                    className="sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm w-full h-full"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Đóng menu"
                />
            )}

            {/* Mobile Drawer */}
            <div className={`sm:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl
                             transition-transform duration-300 ease-in-out
                             ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-500 to-orange-600">
                    <span className="text-white font-bold text-base">Danh mục</span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-1.5 rounded-full hover:bg-orange-400/50 transition-colors"
                        aria-label="Đóng menu"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="py-2 overflow-y-auto flex-1">
                    <button
                        onClick={() => { navigate("/"); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                   text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Trang chủ
                    </button>
                    <div className="mx-4 my-1 border-t border-gray-100" />
                    {navCategories.map(({ name, slug, Icon }) => (
                        <button
                            key={slug}
                            onClick={() => { navigate(`/category/${slug}`); setMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                       text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                            <Icon className="w-4 h-4 text-orange-400" />
                            {name}
                        </button>
                    ))}
                    <div className="mx-4 my-1 border-t border-gray-100" />
                    <button
                        onClick={() => { navigate("/orders"); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                   text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                        <Package className="w-4 h-4 text-orange-400" />
                        Đơn hàng của tôi
                    </button>
                    <button
                        onClick={() => { navigate("/login"); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                   text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                        <User className="w-4 h-4 text-orange-400" />
                        Đăng nhập / Đăng ký
                    </button>
                </nav>

                {/* Drawer Footer */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-400 text-center">TechMart © 2024 – Hàng chính hãng</p>
                </div>
            </div>
        </>
    );
};