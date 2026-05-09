import {
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  Phone,
  Laptop,
  Headphones,
  Tablet,
  Monitor,
  Tv,
  Home,
  User,
  Package,
} from "lucide-react";
import { Logo } from "./common/Logo";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/customer/cart/cartSlice";
import { useAuth } from "../features/auth/store/AuthContext";
import { ProductAPI } from "../features/customer/products/api/productApi";
import type { Product } from "../features/customer/products/types";

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
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = useSelector(selectCartCount);
  const { user, logout } = useAuth();

  // Debounced search function
  const handleSearchInput = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);

    // Delay search to avoid excessive API calls
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await ProductAPI.search(value);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Handle clicking outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSearchResults]);

  const handleSearchResultClick = (productId: string | number) => {
    navigate(`/products/${productId}`);
    setSearchInput("");
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Điều hướng tới trang search results thay vì chỉ vào sản phẩm đầu tiên
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
      setShowSearchResults(false);
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between py-4">
            {/* Left: Logo & Navigation Links */}
            <div className="flex items-center gap-8">
              <button
                className="flex-shrink-0 cursor-pointer bg-transparent border-0 p-0"
                onClick={() => navigate("/")}
                aria-label="Trang chủ"
              >
                <Logo />
              </button>
              
              {/* Navigation Links — hidden on mobile */}
              <nav className="hidden sm:flex items-center gap-6">
                <button
                  onClick={() => navigate("/")}
                  className="text-white font-medium text-sm hover:text-orange-400 transition-colors"
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => navigate("/category")}
                  className="text-white font-medium text-sm hover:text-orange-400 transition-colors"
                >
                  Sản phẩm
                </button>
                <button
                  onClick={() => navigate("/support")}
                  className="text-white font-medium text-sm hover:text-orange-400 transition-colors"
                >
                  Chăm sóc khách hàng
                </button>
              </nav>
            </div>

            {/* Center: Search Bar */}
            <div
              className="hidden md:flex flex-1 max-w-md mx-8 relative"
              ref={searchDropdownRef}
            >
              <form onSubmit={handleSearch} className="flex-1 w-full">
                <div
                  className="flex items-center w-full bg-white rounded-full px-4 py-2 gap-2
                                            focus-within:ring-2 focus-within:ring-orange-300 transition-all"
                >
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchInput}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onFocus={() =>
                      searchInput.trim() && setShowSearchResults(true)
                    }
                    className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                  />
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <span className="inline-block animate-spin">⚙️</span> Đang
                      tìm kiếm...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y">
                      {searchResults.slice(0, 8).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSearchResultClick(product.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                        >
                          <img
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.png";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-orange-600 font-bold">
                              {product.price?.toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                        </button>
                      ))}
                      {searchResults.length > 8 && (
                        <div className="px-4 py-3 text-center text-sm text-gray-500">
                          Còn {searchResults.length - 8} kết quả khác...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Không tìm thấy sản phẩm nào
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Search Icon — mobile and tablet */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5 text-white" />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-orange-500 text-white
                                                   text-[11px] font-bold rounded-full flex items-center justify-center px-1"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <button
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Tài khoản"
                onClick={() => user ? navigate("/profile") : navigate("/login")}
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="sm:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar dropdown */}
        {searchOpen && (
          <div className="md:hidden px-4 py-3 border-t border-white/10 bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] animate-[slideDown_0.15s_ease-out]">
            <div
              className="flex items-center w-full bg-white rounded-full px-4 py-2 gap-2
                                        focus-within:ring-2 focus-within:ring-orange-300 transition-all"
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
                autoFocus
                className="flex-1 outline-none text-sm text-gray-200 bg-transparent"
              />
            </div>
            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="mt-2 bg-[#1A122E] border border-white/10 rounded-lg shadow-lg divide-y max-h-80 overflow-y-auto">
                {searchResults.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      handleSearchResultClick(product.id);
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 transition-colors text-left"
                  >
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-cyan-400 font-bold">
                        {product.price?.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
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
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-72 bg-[#0B0515] z-50 shadow-2xl
                             transition-transform duration-300 ease-in-out
                             ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e]">
          <span className="text-white font-bold text-base">Danh mục</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-2 overflow-y-auto flex-1">
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                   text-gray-700 hover:bg-white/5 hover:text-cyan-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Trang chủ
          </button>
          <div className="mx-4 my-1 border-t border-white/10" />
          {navCategories.map(({ name, slug, Icon }) => (
            <button
              key={slug}
              onClick={() => {
                navigate(`/category/${slug}`);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                       text-gray-700 hover:bg-white/5 hover:text-cyan-400 transition-colors"
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              {name}
            </button>
          ))}
          <div className="mx-4 my-1 border-t border-white/10" />
          <button
            onClick={() => {
              navigate("/orders");
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                   text-gray-700 hover:bg-white/5 hover:text-cyan-400 transition-colors"
          >
            <Package className="w-4 h-4 text-cyan-400" />
            Đơn hàng của tôi
          </button>
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                       text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <User className="w-4 h-4 text-orange-400" />
              Đăng xuất
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium
                                       text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <User className="w-4 h-4 text-orange-400" />
              Đăng nhập / Đăng ký
            </button>
          )}
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-white/10 bg-[#1A122E]">
          <p className="text-xs text-gray-400 text-center">
            TechMart © 2024 – Hàng chính hãng
          </p>
        </div>
      </div>
    </>
  );
};

