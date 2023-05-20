import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordHide: boolean;
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: SnackBarService
  ) {
    this.isPasswordHide = true
  }

  loginForm = this._builder.group({
    email: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)
  });

  login(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this._authService.login(credentials);
    }
    else {
      this._snackBar.openSnackBar("Rellene todos los campos correctamente.")
    }
  }

}
