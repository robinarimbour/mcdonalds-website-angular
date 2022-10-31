import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { Product } from './../product';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    postalCode: '',
    phone: '',
    creditCard: '',
    code: '',
    expiry: ''
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private title: Title
    ) { 
      this.title.setTitle('Checkout: ' + mainTitle);
    }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
    console.log("Total: " + this.currencyPipe.transform(this.getSumTotal()));
    window.alert("Order submitted.\nCheck console for transaction details.");
    this.cartService.clearCart();
    this.checkoutForm.reset();
    this.router.navigate(['/cart']);
  }

  getQuantity(id: number) {
    return this.cartService.getQuantity(id);
  }

  getSubtotal(product: Product) {
    return this.cartService.getQuantity(product.id)! * product.price;
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  getTax() {
    return this.getTotalPrice() * 0.1;
  }

  getSumTotal() {
    return this.getTotalPrice() + this.getTax();
  }
}
