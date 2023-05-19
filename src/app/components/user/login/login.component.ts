import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _router: Router,
    private _builder: FormBuilder,
    private _authService: AuthService) {}

  loginForm = this._builder.group({
    email: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)
  });

  login(): void {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this._authService.login(credentials);
    this._router.navigate(['/menu']);
  }

}
