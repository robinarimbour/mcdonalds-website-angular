import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  // observe(Breakpoints.Handset)
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 959.98px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private breakpointObserver: BreakpointObserver) { }
}
