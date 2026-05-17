export interface ProductImage {
    id: string;
    url: string;
}
export interface ProductColor {
    id: string;
    name: string;
    hex: string;
}
export interface ProductVariant {
    id: string;
    name: string;
    price: number;
    stock: number;
}
export interface ProductSpec {
    name: string;
    value: string;
}
export interface ProductComment {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    stars: number;
    createdAt: string;
}
export interface Product {
    id: string;
    categoryId: number;
    brandId?: number;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    discount?: number;

    images: ProductImage[]; 
    colors: ProductColor[];
    variants: ProductVariant[];
    specs: ProductSpec[];

    stock: number;
    rating: number;
    sold?: number;
    createdAt?: string; 

    comments?: ProductComment[];
}