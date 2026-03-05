export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    color: string[]; // Nang cap sau
    rating: number; 
    specs?: string[]; //Postgresql
}