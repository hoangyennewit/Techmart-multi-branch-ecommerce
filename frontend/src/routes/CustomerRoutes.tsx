import { CartPage } from "@/features/cart/pages/CartPage";
import { CheckoutPage } from "@/features/checkout/pages/CheckoutPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { OrderTrackingPage } from "@/features/orders/pages/OrderTrackingPage";
import { CategoryPage } from "@/features/products/pages/CategoryPage";
import { ProductPage } from "@/features/products/pages/ProductPage";
import { ProfilePage } from "@/features/profile/page/ProfilePage";
import { SearchResultsPage } from "@/features/search/pages/SearchResultsPage";
import { RouteObject } from "react-router-dom";

export const CustomerRoutes : RouteObject[] = [
  {
    path: "/",
    // element: <CustomerLayout />, // Nếu bạn có Header/Footer riêng cho khách
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "orders", element: <OrderTrackingPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "category/:slug", element: <CategoryPage /> },
    ],
  },
];