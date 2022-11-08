import { mainTitle } from './../data';
import { Title } from '@angular/platform-browser';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, products } from '../data';

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
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.product = products.find(product => product.id == productIdFromRoute);

    if (this.product) {
      this.title.setTitle(this.product.name + ': ' + mainTitle);
    } else {
      this.router.navigate(['/404']);
    }
  }

  updateQuantity(increament: number): void {
    this.cartService.updateQuantity(this.product!, increament);
  }

  getQuantity(): number {
    return this.cartService.getQuantity(this.product!.id);
  }
}
