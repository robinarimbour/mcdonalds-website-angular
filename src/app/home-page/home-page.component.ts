import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle(mainTitle);
   }

  ngOnInit(): void {
  }

}
