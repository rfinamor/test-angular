import { Component } from '@angular/core';
import { User } from './models/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-angular';
  user?: User | null;

  constructor(private loginService: LoginService) {
      this.loginService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.loginService.logout();
  }
}
