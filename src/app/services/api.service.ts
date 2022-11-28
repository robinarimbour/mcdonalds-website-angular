
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, Product, FooterData, ImageUrl, Transaction, IpData } from './../data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
    ) { }

  getCategories() {
    return this.http.get<Category[]>('/api/categories');
  }

  getProduct(id: number) {
    return this.http.get<Product>('/api/products/' + id);
  }

  getFooters() {
    return this.http.get<FooterData[]>('/api/footers');
  }

  getImageUrl(id: number) {
    return this.http.get<ImageUrl>('/api/image-urls/' + id);
  }

  postTransaction(req: Transaction) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Transaction>('/api/transaction', req, {headers: headers})
      .subscribe({
        next: (res) => {
          this._snackBar.open("Transaction Complete.", "Ok", {
            duration: 5000,
            panelClass: ['green-snackbar']
          });
        },
        error: (error) => {
          this._snackBar.open("Transaction Failed!", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          console.error("Database Post Error");
        }
      });
  }

  getIpData() {
    return this.http.get<IpData>('https://geolocation-db.com/json/');
  }
}
