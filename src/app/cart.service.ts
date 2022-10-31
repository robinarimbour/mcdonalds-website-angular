
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Product[] = [];
  private quantity = new Map<number, number>();
  private totalPrice: number = 0;

  constructor() { }

  addToCart(product: Product) {
    if (!this.quantity.has(product.id)) {
      this.items.push(product);
      this.quantity.set(product.id, 1);
    } else {
      let prevQuantity = this.quantity.get(product.id);
      this.quantity.set(product.id, prevQuantity! + 1);
    }
    this.totalPrice += product.price;
  }

  removeFromCart(product: Product) {
    if (this.quantity.has(product.id)) {
      if (this.quantity.get(product.id) === 1) {
        const index = this.items.indexOf(product);
        this.items.splice(index, 1);
        this.quantity.delete(product.id);
      } else {
        let prevQuantity = this.quantity.get(product.id);
        this.quantity.set(product.id, prevQuantity! - 1);
      }
      this.totalPrice -= product.price;
    }
  }

  checkEmptyCart() {
    return this.items.length === 0;
  }

  getItems() {
    return this.items;
  }

  getQuantity(id: number) {
    return this.quantity.get(id);
  }

  hasQuantity(id: number) {
    return this.quantity.has(id);
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  clearCart() {
    this.items = [];
    this.quantity.clear();
    this.totalPrice = 0;
    return this.items;
  }
}
