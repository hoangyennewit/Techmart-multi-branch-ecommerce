import { Search, ShoppingCart, Bell, Mail} from "lucide-react";
import { Logo } from "./common/Logo";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="w-full bg-white border-b border-orange-200 shadow-sm">
            <div className="container px-10 py-2 flex items-center justify-between gap-5">
                {/* Logo Section */}
                <div className="flex-shrink-0 ">
                    <Logo />
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl">
                    <div className="flex items-center bg-gray-100 rounded px-3 py-1">
                        <Search className="w-8 h-8 text-black" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm điện thoại, laptop..."
                            className="flex-1 ml-2 outline-none text-sm text-gray-700 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <div className="relative cursor-pointer">
                        <Mail className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="relative cursor-pointer">
                        <Bell className="w-7 h-7 text-gray-600 hover:text-gray-800" />
                    </div>
                    <div className="relative cursor-pointer">
                        <ShoppingCart className="w-7 h-7 text-gray-600 hover:text-gray-800" />
                    </div>
                    <div>                        
                        <button 
                            className="bg-[#ee3124] text-white font-bold px-6 py-2 rounded-full 
                            text-xs hover:bg-green-600 transition-all whitespace-nowrap shadow-sm 
                            uppercase tracking-wider"
                            onClick={() => navigate("/login")}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};