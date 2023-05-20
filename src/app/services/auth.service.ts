import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: SnackBarService
    ) { }

  signup(user: any): void {
    this._userService.signup(user).subscribe({
      next: (res) => {
        this._snackBar.openSnackBar("Registro exitoso!");
        this._router.navigate(['/login']);
      },
      error: console.log
    });
  }

  login(credentials: any): void {
    this._userService.checkUserExists(credentials.email).subscribe({
      next: (userExists) => {
        if (userExists) {
          this._userService.login(credentials).subscribe({
            next: (res) => {
              this.isLoggedIn = true;
              this._snackBar.openSnackBar("Inicio de sesión exitoso!");
              this._router.navigate(['/menu']);
            },
            error: console.log
          });
        } else {
          this._snackBar.openSnackBar("Correo electrónico o contraseña incorrecta.");
        }
      },
      error: console.log
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
