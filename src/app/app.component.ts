import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ecommerce-app';

  constructor(public authService: AuthenticationService,
              private renderer: Renderer2) {
  }

  // preloader
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
