import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('About Us: ' + mainTitle);
   }

  ngOnInit(): void {
  }

}
