import { ApiService } from '../../services/api.service';
import { FooterData } from '../../data';
import { Observable } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerData: FooterData[] = [];
  
  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  constructor(
    private breakpointService: BreakpointService,
    private apiService: ApiService) { }

  ngOnInit(): void { 
    this.apiService.getFooters().subscribe({
      next: (response) => {
        this.footerData = response;
      },
      error: (error) => {
        console.error(error.error.errorMessage);
      }
    })
   }

}
