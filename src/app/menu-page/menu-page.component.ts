
import { Component, OnInit } from '@angular/core';
import { Category, categories } from '../product';
import { Title } from '@angular/platform-browser';
import { mainTitle } from '../my-config';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  categories: Category[] = categories;

  constructor(private title: Title) {
    this.title.setTitle('Our Menu: ' + mainTitle);
   }

  ngOnInit(): void {
  }
}
