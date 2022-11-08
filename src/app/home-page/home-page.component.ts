import { Observable } from 'rxjs';
import { BreakpointService } from './../breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  constructor(private breakpointService :BreakpointService) { }

  ngOnInit(): void { }

}
