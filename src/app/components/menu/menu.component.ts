import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(
    private _authService: AuthService
  ) { }
  currentUser = this._authService.getLoggedUser();
  cols: number = 4;
}
