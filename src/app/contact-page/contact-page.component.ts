import { mainTitle } from './../my-config';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Contact Us: ' + mainTitle);
   }

  ngOnInit(): void {
  }

}
