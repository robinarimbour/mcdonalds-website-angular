import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();
  
  constructor(
    private cartService: CartService,
    private title: Title
  ) { 
    this.title.setTitle('My Cart: ' + mainTitle);
  }

  ngOnInit(): void {
  }

  checkEmptyCart() {
    return this.cartService.checkEmptyCart();
  }

  getQuantity(id: number){
    return this.cartService.getQuantity(id);
  }

  getSubtotalPrice(id: number, price: number) {
    return price * this.cartService.getQuantity(id)!;
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
