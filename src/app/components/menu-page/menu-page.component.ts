
import { Component, OnInit } from '@angular/core';

import { Category } from '../../data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  categories: Category[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });
  }
}
