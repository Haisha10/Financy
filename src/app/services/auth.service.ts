import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private _userService: UserService, private _router: Router) {}

  signup(user: any): void {
    this._userService.signup(user).subscribe(
      (response) => {
        // Handle successful registration response
        this._router.navigate(['/login']);
      },
      (error) => {
        // Handle registration error
      }
    );
  }

  login(credentials: any): void {
    this._userService.checkUserExists(credentials.email).subscribe(
      (userExists) => {
        if (userExists) {
          this._userService.login(credentials).subscribe(
            (response) => {
              // Handle successful login response
              this.isLoggedIn = true;
              this._router.navigate(['/menu']);
            },
            (error) => {
              // Handle login error
            }
          );
        } else {
          // User does not exist, display error message or take appropriate action
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this._router.navigate(['/login']);
  }

  canActivate(): boolean {
    if (this.isLoggedIn) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
