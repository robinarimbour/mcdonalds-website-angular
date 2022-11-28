
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Transaction, IpData } from './../../data';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {

  ipData: IpData = {} as IpData;

  name: string = "";
  phone: string = "";
  card: string = "";

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private apiService: ApiService
  ) { }

  close(): void {
    this.dialogRef.close({
      posted: false
    });
  }

  post(): void {
    let transaction: Transaction = {
      cartItems: this.data.cartItems,
      tax: this.data.tax,
      totalPrice: this.data.totalPrice,
      checkoutForm: this.data.checkoutForm,
      ipData: this.ipData
    };

    this.apiService.postTransaction(transaction);
    this.dialogRef.close({
      posted: true
    });
  }

  ngOnInit(): void { 
    this.apiService.getIpData().subscribe({
      next: (res) => {
        this.ipData = res;
      },
      error: (error) => {
        console.error("Cannot access user IP");
      }
    })

    this.name = this.data.checkoutForm.firstName + " " + this.data.checkoutForm.lastName;
    this.phone = this.data.checkoutForm.phone;
    this.card = "XXXX-XXXX-XXXX-" + this.data.checkoutForm.creditCard.toString().substring(15,19);
  }

}
