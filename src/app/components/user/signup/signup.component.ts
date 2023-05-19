import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService
  ) { }
  signupForm = this._builder.group({
    name: this._builder.control('', Validators.required),
    lastname: this._builder.control('', Validators.required),
    email: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)
  });

  signup() {
    const user = {
      name: this.signupForm.value.name,
      lastname: this.signupForm.value.lastname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };
    this._authService.signup(user);
  }
}
