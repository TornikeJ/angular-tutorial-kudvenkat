import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoadingIndicator = true;
  title = 'first-practice';
  
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }

    })
  }
}
