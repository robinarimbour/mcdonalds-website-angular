
import itemsJson from '../assets/food-items.json';
import categoriesJson from '../assets/categories.json';

export interface Category {
    id: number;
    name: string;
    products: number[];
}

export interface Product {
    id: number;
    name: string;
    descriptions: string[];
    imageGridUrl: string;
    imageFullUrl: string;
    price: number;
}

export const products: Product[] = itemsJson;
export const categories: Category[] = categoriesJson;
