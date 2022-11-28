
import { ApiService } from '../../services/api.service';
import { Product } from '../../data';
import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  @Input() productIds: number[] | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.productIds) {
      for (let id of this.productIds) {
        this.apiService.getProduct(id).subscribe({
          next: (response) => {
            if (response) {
              this.products.push(response);
            } else {
              console.error('Product ID ' + id + ' data is null');
            }
          },
          error: (error) => {
            console.error(error.error.errorMessage);
          }
        });
      }
    }
  }

}
