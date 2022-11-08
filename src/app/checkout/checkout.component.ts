import { Router } from '@angular/router';
import { CartItem } from '../data';
import { CheckoutDialogComponent } from './../checkout-dialog/checkout-dialog.component';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup = this.formBuilder.group({
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
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    if (this.cartService.getCartSize() === 0) {
      this.router.navigate(['/cart']);
    }
   }

  onSubmit(): void {
    let cartItems: CartItem[] = this.cartService.getItems();
    
    let tax: string = this.getTax().toString();
    let totalPrice: string = this.getSumTotal().toString();

    let firstName: string = this.checkoutForm.get('firstName')!.value!;
    let lastName: string = this.checkoutForm.get('lastName')!.value!;
    let phone: string = this.checkoutForm.get('phone')?.value!;
    let creditCard: string = this.checkoutForm.get('creditCard')?.value!;

    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      disableClose: true,
      data: {
        cartItems: cartItems,
        totalPrice: totalPrice,
        tax: tax,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        creditCard: creditCard
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cartService.clearCart();
      this.checkoutForm.reset();
      this.router.navigate(['/cart']);
    });
  }

  getItems(): CartItem[] {
    return this.cartService.getItems();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTax(): number {
    return this.getTotalPrice() * 0.1;
  }

  getSumTotal(): number {
    return this.getTotalPrice() + this.getTax();
  }
}
