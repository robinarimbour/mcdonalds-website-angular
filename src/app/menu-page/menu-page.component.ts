
import { Component, OnInit } from '@angular/core';
import { Category, categories } from '../data';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  categories: Category[] = categories;

  constructor() { }

  ngOnInit(): void { }
}
