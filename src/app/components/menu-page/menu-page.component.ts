
import { Component, OnInit } from '@angular/core';
import { MenuCategory } from '../../data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  menuCategories: MenuCategory[] = [];

  showAll: boolean = true;
  showCartId: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getCategories().subscribe({
      next: (response) => {
        for (let category of response) {
          this.menuCategories.push({category: category, selected: false});
        }
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });
  }

  changeSelection(category: MenuCategory) {
    if (category.selected) {
      category.selected = false;
      this.showAll = true;
    } else {
      for (let menuCategory of this.menuCategories) {
        menuCategory.selected = menuCategory.category.id === category.category.id;
      }
      this.showAll = false;
      this.showCartId = category.category.id;
    }
  }

}
