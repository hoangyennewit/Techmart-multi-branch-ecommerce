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
    userName: string;
    content: string;
    stars: Number;
    createAt: String;
}
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    discount?: number;

    images: ProductImage[]; 
    colors: ProductColor[];
    variants: ProductVariant[];
    specs: ProductSpec[]

    stock: number;
    rating: number;
    sold?: number;
    createdAt?: string; 

    comments?: ProductComment[];
}