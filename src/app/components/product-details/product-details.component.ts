import { ApiService } from '../../services/api.service';
import { mainTitle } from '../../data';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../data';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.apiService.getProduct(productIdFromRoute).subscribe({
      next: (response) => { 
        if (response) {
          this.product = response;
          this.title.setTitle(this.product.name + ': ' + mainTitle);
        } else {
          console.error('Product ID ' + productIdFromRoute + ' data is null');
        }
      },
      error: (error) => {
        console.error(error.error.errorMessage);
        this.router.navigate(['/404']);
      }
    });
  }

  updateQuantity(increament: number): void {
    this.cartService.updateQuantity(this.product!, increament);
  }

  getQuantity(): number {
    return this.cartService.getQuantity(this.product!.id);
  }
}
