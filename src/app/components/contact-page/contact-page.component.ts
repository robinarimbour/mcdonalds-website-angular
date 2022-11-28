
import { Component, OnInit } from '@angular/core';
import { ImageUrl } from '../../data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  githubImage: ImageUrl | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getImageUrl(4).subscribe({
      next: (response) => {
        this.githubImage = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });
  }

}
