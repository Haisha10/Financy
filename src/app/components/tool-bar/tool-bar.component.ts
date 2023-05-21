import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  isSidenavOpen = false;

  constructor(
    private _authService: AuthService
  ) { }
  currentUser = this._authService.getLoggedUser();

  toggleSidenav() {
    this.drawer.toggle();
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(){
    this._authService.logout();
  }
}
