import { footerData, FooterData } from './../data';
import { Observable } from 'rxjs';
import { BreakpointService } from './../breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerData: FooterData[] = footerData;
  
  isSmall$: Observable<boolean> = this.breakpointService.isSmall$;

  constructor(private breakpointService: BreakpointService) { }

  ngOnInit(): void { }

}
