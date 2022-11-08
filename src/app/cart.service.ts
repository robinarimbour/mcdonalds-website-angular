
import { Injectable } from '@angular/core';
import { Product, products, CartItem } from './data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];
  private totalPrice: number = 0;

  constructor() { }

  private getIndex(id: number): number {
    return this.items.findIndex(item => item.product.id === id);
  }

  updateQuantity(product: Product, increament: number): void {
    if (increament === 1) {
      this.addToCart(product);
    } else if (increament === -1) {
      this.removeFromCart(product);
    }
  }

  addToCart(product: Product): void {
    let index = this.getIndex(product.id);
    if (index === -1) {
      this.items.push({product: product, quantity: 1});
    } else {
      this.items[index].quantity++;
    }

    this.totalPrice += product.price;
  }

  removeFromCart(product: Product): void {
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
  }
}
