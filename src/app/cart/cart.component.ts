
import { Product, CartItem } from '../data';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  getItems(): CartItem[] {
    return this.cartService.getItems();
  }

  isCartEmpty(): boolean {
    return this.cartService.getCartSize() === 0;
  }

  updateQuantity(product: Product, increament: number): void {
    this.cartService.updateQuantity(product, increament);
  }
  
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
