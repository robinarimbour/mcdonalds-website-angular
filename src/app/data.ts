
// default title of webpage
export const mainTitle: string = "McDonald's";

// local storage keys
export const LOCAL_STORAGE_CART: string = "cart-items";


// category class
export interface Category {
    id: number,
    name: string,
    products: number[]
}


// product class
export interface Product {
    id: number,
    name: string,
    descriptions: string[],
    imageGridUrl: string,
    imageFullUrl: string,
    price: number
}


// cart item class
export interface CartItem {
    product: Product,
    quantity: number
}
// cart item cookie class
export interface CartItemCookie {
    itemId: number,
    quantity: number
}


// footer data class
export interface Content {
    heading: string,
    url: string
}
export interface FooterData {
    id: number,
    title: string,
    content: Content[]
}


// imageUrl data class
export interface ImageUrl {
    id: number,
    name: string,
    url: string
}


// transaction class
export interface CheckoutForm {
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    postalCode: string,
    phone: string,
    creditCard: string,
    code: string,
    expiry: string
}
export interface IpData {
    country_code: string,
    country_name: string,
    city: string,
    postal: string,
    latitude: number,
    longitude: number,
    IPv4: string,
    state: string
}
export interface Transaction {
    cartItems: CartItem[],
    tax: number,
    totalPrice: number,
    checkoutForm: CheckoutForm,
    ipData: IpData | null
}