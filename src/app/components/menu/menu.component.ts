import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private location: Location
  ) { }
  currentUrl:any = this.location.path();
  id:Number = parseInt(this.currentUrl.split('/').pop());
  empress:boolean=false;
  currentUser = this._authService.getLoggedUser();
  cols: number = 4;
  ngOnInit() {
    this._userService.checkEmpress(this.id)
      .subscribe(value => {
        this.empress = value;
      },);
  }
}
