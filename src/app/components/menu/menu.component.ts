import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private _authService: AuthService,
  ) { }
  currentUser: any;
  ngOnInit() {
    this.currentUser = this._authService.getLoggedUser();
  }
}
