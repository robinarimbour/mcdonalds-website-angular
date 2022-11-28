import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { ImageUrl } from '../../data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  logoImage: ImageUrl | undefined;

  constructor(
    private breakpointService: BreakpointService,
    private cartService: CartService,
    private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getImageUrl(1).subscribe({
      next: (response) => {
        this.logoImage = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });
  }

  hideBadge(): boolean {
    return this.cartService.getCartSize() === 0;
  }

  getCartSize(): number {
    return this.cartService.getCartSize();
  }

}
