import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loggedUser: any = null;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: SnackBarService
  ) { }

  signup(user: any): void {
    this._userService.checkUserExists(user.email).subscribe({
      next: (userExists) => {
        if (userExists) {
          this._snackBar.openSnackBar("Ya existe una cuenta registrada con este correo.");
          return;
        } else {
          this._userService.signup(user).subscribe({
            next: (res) => {
              this._snackBar.openSnackBar("Registro exitoso!");
              this._router.navigate(['/login']);
            },
            error: console.log
          });
        }
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
              if (res.length < 1) {
                this._snackBar.openSnackBar("Correo electrónico o contraseña incorrecta.");
                return;
              }
              this.isLoggedIn = true;
              this.loggedUser = {
                id: res[0].id,
                name: res[0].name,
                lastname: res[0].lastname
              }
              this._snackBar.openSnackBar("Inicio de sesión exitoso!");
              this._router.navigate(['/menu',res[0].id]);
            },
            error: console.log
          });
        } else {
          this._snackBar.openSnackBar("Correo electrónico o contraseña incorrecta.");
          return;
        }
      },
      error: console.log
      // Handle error
    }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedUser = null;
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

  getLoggedUser() {
    return this.loggedUser;
  }
}
