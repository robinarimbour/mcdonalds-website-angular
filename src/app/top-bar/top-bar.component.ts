import { CartService } from './../cart.service';
import { Observable } from 'rxjs';
import { BreakpointService } from './../breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  constructor(
    private breakpointService: BreakpointService,
    private cartService: CartService) { }

  ngOnInit(): void { }

  hideBadge(): boolean {
    return this.cartService.getCartSize() === 0;
  }

  getCartSize(): number {
    return this.cartService.getCartSize();
  }

}
