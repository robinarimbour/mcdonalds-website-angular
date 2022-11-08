
import { Product, products } from '../data';
import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  @Input() productIds: number[] | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.productIds) {
      for (let id of this.productIds) {
        if (id > 0 && id <= products.length) {
          this.products.push(products[id-1]);
        }
      }
    }
  }

}
