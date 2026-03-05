import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react";
import { Logo } from "./common/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* Search Bar — ẩn trên mobile, hiển thị sm+ */}
                <div className="hidden sm:flex flex-1 max-w-xl">
                    <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 gap-2
                                    focus-within:ring-2 focus-within:ring-orange-300 transition-all">
                        <Search className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm điện thoại, laptop..."
                            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

                    {/* Search Icon — chỉ trên mobile */}
                    <button
                        className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Tìm kiếm"
                    >
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Cart */}
                    <button
                        className="relative p-2 rounded-full hover:bg-orange-50 transition-colors"
                        aria-label="Giỏ hàng"
                    >
                        <ShoppingCart className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white 
                                         text-[10px] font-bold rounded-full flex items-center justify-center">
                            2
                        </span>
                    </button>

                    {/* Bell — ẩn trên xs, hiển thị sm+ */}
                    <button
                        className="hidden sm:flex p-2 rounded-full hover:bg-orange-50 transition-colors"
                        aria-label="Thông báo"
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Login Button */}
                    <button
                        className="bg-[#ee3124] text-white font-bold px-4 sm:px-5 py-2 rounded-full 
                                   text-xs hover:bg-orange-600 active:scale-95 transition-all 
                                   whitespace-nowrap shadow-sm uppercase tracking-wider"
                        onClick={() => navigate("/login")}
                    >
                        <span className="hidden sm:inline">Đăng nhập</span>
                        <span className="sm:hidden">Login</span>
                    </button>

                    {/* Hamburger — chỉ trên mobile (cho sau này) */}
                    <button
                        className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        {menuOpen ? (
                            <X className="w-5 h-5 text-gray-600" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar — drop-down khi bấm search icon */}
            {searchOpen && (
                <div className="sm:hidden px-4 pb-3">
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
    );
};