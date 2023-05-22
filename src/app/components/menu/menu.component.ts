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
  ) {
    this.setColsBasedOnScreenSize();
  }
  currentUser = this._authService.getLoggedUser();
  cols: number = 4;

  setColsBasedOnScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      this.cols = 1;
    } else if (screenWidth < 900) {
      this.cols = 2;
    } else {
      this.cols = 4;
    }
  }
}
