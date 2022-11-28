import { Router } from '@angular/router';
import { CartItem } from '../../data';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { CartService } from '../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

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

  get firstName() { return this.checkoutForm.get('firstName');}
  get lastName() { return this.checkoutForm.get('lastName');}
  get address() { return this.checkoutForm.get('address');}
  get country() { return this.checkoutForm.get('country');}
  get postalCode() { return this.checkoutForm.get('postalCode');}
  get phone() { return this.checkoutForm.get('phone');}
  get creditCard() { return this.checkoutForm.get('creditCard');}
  get code() { return this.checkoutForm.get('code');}
  get expiry() { return this.checkoutForm.get('expiry');}

  hideCode: boolean = true;

  countries: string[] = ["Australia", "Guyana", "USA"];

  subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    if (this.cartService.getCartSize() === 0) {
      this.router.navigate(['/cart']);
    }

    this.updateCreditCard();
    this.updateExpiry();
    this.updateField(this.code);
    this.updateField(this.phone);
    this.updateField(this.postalCode);
   }

  getErrorMessage(field: string) {
    let control = this.checkoutForm.get(field);
    if (control) {
      if (control.errors?.['required']) {
        return "Field cannot be empty.";
      } else if (control.errors?.['pattern']) {
        if (field === "firstName" || field === "lastName")  return "Must be alphabets.";
        if (field === "creditCard" || field === "expiry") return "Invalid format.";
      } else if (control.errors?.['minlength']) {
        if (field === "phone")  return "Must be a 10 digit number.";
      } else if (control.errors?.['maxlength']) {
        return "Max Length exceeded";
      }
    } 

    return "Invalid Input";
  }

  updateField(field: AbstractControl | null) {
    let sub = field?.valueChanges.subscribe({
      next: () => {
        let val: string = field?.value.toString();
        let len = val.length;
        let lastChar = val.charAt(len-1);

        if ((lastChar < '0' || lastChar > '9') && len > 0) {
          field?.setValue(val.substring(0, len-1));
        }
      },
      error: (err) => {
          console.log('Form Field Subscription error:', err);
      }
    })

    this.subscriptions.add(sub);
  }

  updateCreditCard() {
    let sub = this.creditCard?.valueChanges.subscribe({
      next: () => {
        let val: string = this.creditCard?.value.toString();
        let len = val.length;
        let lastChar = val.charAt(len-1);

        if ((lastChar < '0' || lastChar > '9') && len % 5 !== 0) {
          this.creditCard?.setValue(val.substring(0, len-1));
        }

        if (len % 5 == 0 && len > 0) {
          if (lastChar === '-') {
            this.creditCard?.setValue(val.substring(0, len-1));
          } else {
            this.creditCard?.setValue(val.substring(0, len-1) + '-' + lastChar);
          }
        } 
      },
      error: (err) => {
          console.log('Form Field Subscription error:', err);
      }
    })

    this.subscriptions.add(sub);
  }

  updateExpiry() {
    let sub = this.expiry?.valueChanges.subscribe({
      next: () => {
        let val: string = this.expiry?.value.toString();
        let len = val.length;
        let lastChar = val.charAt(len-1);

        if ((lastChar < '0' || lastChar > '9') && len % 3 !== 0) {
          this.expiry?.setValue(val.substring(0, len-1));
        }

        if (len % 3 == 0 && len > 0) {
          if (lastChar === '/') {
            this.expiry?.setValue(val.substring(0, len-1));
          } else {
            this.expiry?.setValue(val.substring(0, len-1) + '/' + lastChar);
          }
        }
      },
      error: (err) => {
          console.log('Form Field Subscription error:', err);
      }
    })

    this.subscriptions.add(sub);
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      disableClose: true,
      data: {
        cartItems: this.cartService.getItems(),
        tax: this.getTax(),
        totalPrice: this.getSumTotal(),
        checkoutForm: this.checkoutForm.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.posted) {
        this.cartService.clearCart();
        this.subscriptions.unsubscribe();
        this.checkoutForm.reset();
        this.router.navigate(['/cart']);
      }
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
