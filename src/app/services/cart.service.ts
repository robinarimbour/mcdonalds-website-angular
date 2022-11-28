
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product, CartItem, CartItemCookie, LOCAL_STORAGE_CART } from '../data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cookies: CartItemCookie[] = localStorage.getItem(LOCAL_STORAGE_CART) ?
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART)!) : [];

  private items: CartItem[] = [];
  private totalPrice: number = 0;

  constructor(private apiService: ApiService) { 
    this.initItems();
  }

  private initItems(): void {
    for (let cookie of this.cookies) {
      this.apiService.getProduct(cookie.itemId).subscribe({
        next: (response) => {
          this.items.push({product: response, quantity: cookie.quantity});
          this.totalPrice += response.price * cookie.quantity;
        },
        error: (error) => {
          console.error(error.error.errorMessage);
        }
      })
    }
  }

  private updateCookies(id: number): void {
    let quantity = this.getQuantity(id);
    let index = this.cookies.findIndex(cookie => cookie.itemId === id);
    if (index === -1) {
      if (quantity > 0) {
        this.cookies.push({itemId: id, quantity: quantity});
      }
    } else {
      if (quantity > 0) {
        this.cookies[index].quantity = quantity;
      } else {
        this.cookies.splice(index, 1);
      }
    }

    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(this.cookies));
  }

  private getIndex(id: number): number {
    return this.items.findIndex(item => item.product.id === id);
  }

  updateQuantity(product: Product, increament: number): void {
    if (increament === 1) {
      this.addToCart(product);
    } else if (increament === -1) {
      this.removeFromCart(product);
    }

    this.updateCookies(product.id);
  }

  private addToCart(product: Product): void {
    let index = this.getIndex(product.id);
    if (index === -1) {
      this.items.push({product: product, quantity: 1});
    } else {
      this.items[index].quantity++;
    }

    this.totalPrice += product.price;
  }

  private removeFromCart(product: Product): void {
    let index = this.getIndex(product.id);
    if (index === -1) {
      return;
    }

    if (this.items[index].quantity === 1) {
      this.items.splice(index, 1);
    } else if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
    }

    this.totalPrice -= product.price;
  }

  // Used in product-details
  getQuantity(id : number): number {
    let index = this.getIndex(id);
    if (index === -1) {
      return 0;
    } else {
      return this.items[index].quantity;
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  getCartSize(): number {
    return this.items.length;
  }

  clearCart(): void {
    this.items = [];
    this.totalPrice = 0;
    this.cookies = [];

    localStorage.removeItem(LOCAL_STORAGE_CART);
  }
}
