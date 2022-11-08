
import itemsJson from '../assets/food-items.json';
import categoriesJson from '../assets/categories.json';
import footerJson from '../assets/footer-data.json';


// default title of webpage
export let mainTitle: string = "McDonald's";


// category class
export interface Category {
    id: number;
    name: string;
    products: number[];
}
export const categories: Category[] = categoriesJson;


// product class
export interface Product {
    id: number;
    name: string;
    descriptions: string[];
    imageGridUrl: string;
    imageFullUrl: string;
    price: number;
}
export const products: Product[] = itemsJson;


// cart item class
export interface CartItem {
    product: Product;
    quantity: number;
}


// footer data class
export interface Content {
    heading: string;
    url: string
}
export interface FooterData {
    title: string;
    content: Content[]
}
export const footerData: FooterData[] = footerJson;
