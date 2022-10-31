import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { CartService } from './../cart.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private title: Title
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.product = products.find(product => product.id == productIdFromRoute);

    if (this.product) {
      this.title.setTitle(this.product.name + ': ' + mainTitle);
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  checkQuantity(id: number) {
    // return true if product is not in cart
    return !this.cartService.hasQuantity(id);
  }

  getQuantity(id: number) {
    return this.cartService.getQuantity(id);
  }

}
