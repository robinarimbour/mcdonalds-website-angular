import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';
import { ImageUrl } from '../../data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  backgroundImage: ImageUrl | undefined;
  breakfastImage: ImageUrl | undefined;

  constructor(
    private breakpointService :BreakpointService,
    private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getImageUrl(2).subscribe({
      next: (response) => {
        this.backgroundImage = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });

    this.apiService.getImageUrl(3).subscribe({
      next: (response) => {
        this.breakfastImage = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    });
  }

}
