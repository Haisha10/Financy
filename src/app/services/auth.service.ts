import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  loggedUser: any = null;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: SnackBarService
  ) {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.isLoggedIn = true;
      this.loggedUser = JSON.parse(storedUser);
    }
  }

  signup(user: any): void {
    this._userService.checkUserExists(user.email).subscribe({
      next: (userExists) => {
        if (userExists) {
          this._snackBar.openSnackBar(
            'Ya existe una cuenta registrada con este correo.'
          );
          return;
        } else if (!userExists) {
          this._userService.signup(user).subscribe({
            next: (res) => {
              this._snackBar.openSnackBar('Registro exitoso!');
              this._router.navigate(['/login']);
            },
            error: (error) => { this._snackBar.openSnackBar(error.errror.message); },
          });
        } else if (userExists == null) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
          return;
        }
      },
      error: (error) => { this._snackBar.openSnackBar(error.errror.message); },
    });
  }

  login(credentials: any): void {
    this._userService.checkUserExists(credentials.email).subscribe({
      next: (userExists) => {
        if (userExists) {
          this._userService.login(credentials).subscribe({
            next: (res) => {
              if (res.length < 1) {
                this._snackBar.openSnackBar(
                  'Correo electrónico o contraseña incorrecta.'
                );
                return;
              }
              this.isLoggedIn = true;
              this.loggedUser = {
                id: res[0].id,
                name: res[0].name,
                lastname: res[0].lastname,
                isBusiness: res[0].isBusiness,
              };
              localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
              this._snackBar.openSnackBar('Inicio de sesión exitoso!');
              this._router.navigate(['/menu']);
            },
            error: (error) => this._snackBar.openSnackBar(error.errror.message),
          });
        }
        else if (!userExists) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
        } else if (userExists == null) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
          return;
        }
      },
      error: (error) => this._snackBar.openSnackBar(error.errror.message),
      // Handle error
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedUser = null;
    localStorage.removeItem('loggedUser');
    this._router.navigate(['/login']);
  }

  canActivate(): boolean {
    if (this.isLoggedIn || this.loggedUser) {
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
