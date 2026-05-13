import { CartPage } from "@/features/customer/cart/pages/CartPage";
import { CheckoutPage } from "@/features/customer/checkout/pages/CheckoutPage";
import { HomePage } from "@/features/customer/home/pages/HomePage";
import { OrderTrackingPage } from "@/features/customer/orders/pages/OrderTrackingPage";
import { CategoryPage } from "@/features/customer/products/pages/CategoryPage";
import { ProductPage } from "@/features/customer/products/pages/ProductPage";
import { ProfilePage } from "@/features/profile/page/ProfilePage";
import { SearchResultsPage } from "@/features/customer/search/pages/SearchResultsPage";
import { RouteObject } from "react-router-dom";

export const CustomerRoutes : RouteObject[] = [
  {
    path: "/",
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